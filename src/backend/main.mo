import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Blob "mo:core/Blob";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  type UserProfile = {
    name : Text;
    village : Text;
    taluka : Text;
    district : Text;
    mobile : Text;
    subscriptionType : SubscriptionType;
    subscriptionExpiry : Time.Time;
  };

  public type SubscriptionType = {
    #monthly;
    #quarterly;
    #annual;
  };

  type FormField = {
    fieldName : Text;
    fieldType : FieldType;
    required : Bool;
  };

  public type FieldType = {
    #text;
    #number;
    #date;
    #dropdown : [Text];
    #checkbox;
    #document : Storage.ExternalBlob;
  };

  type FormCategory = {
    #bpl;
    #rationCard;
    #birthDeath;
    #revenue;
    #nrega;
    #panchayat;
    #construction;
    #marriage;
    #income;
  };

  type Form = {
    id : Nat;
    title : Text;
    category : FormCategory;
    description : Text;
    feeAmount : Nat;
    fields : [FormField];
    instructions : Text;
  };

  type FormSubmission = {
    id : Nat;
    formId : Nat;
    user : Principal;
    fieldValues : [(Text, Blob)];
    timestamp : Time.Time;
    status : SubmissionStatus;
  };

  public type SubmissionStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type Post = {
    id : Nat;
    title : Text;
    content : Text;
    language : Text;
    author : Principal;
    date : Time.Time;
    published : Bool;
  };

  func compareByDate(post1 : Post, post2 : Post) : Order.Order {
    if (post1.date < post2.date) { #less } else if (post1.date > post2.date) {
      #greater;
    } else { #equal };
  };

  type GalleryItem = {
    id : Nat;
    type_ : Text;
    blob : Storage.ExternalBlob;
    caption : Text;
    date : Time.Time;
  };

  type Scheme = {
    id : Nat;
    title : Text;
    description : Text;
    category : Text;
    documentsRequired : [Text];
    applicationLink : Text;
    active : Bool;
  };

  type ServiceLink = {
    id : Nat;
    name : Text;
    url : Text;
    category : Text;
    description : Text;
  };

  type SiteInfo = {
    phone : Text;
    whatsapp : Text;
    email : Text;
    address : Text;
    socialLinks : [Text];
  };

  var nextFormId = 1;
  var nextSubmissionId = 1;
  var nextPostId = 1;
  var nextGalleryItemId = 1;
  var nextSchemeId = 1;
  var nextLinkId = 1;

  let userProfiles = Map.empty<Principal, UserProfile>();
  let forms = Map.empty<Nat, Form>();
  let formSubmissions = Map.empty<Nat, FormSubmission>();
  let posts = Map.empty<Nat, Post>();
  let galleryItems = Map.empty<Nat, GalleryItem>();
  let schemes = Map.empty<Nat, Scheme>();
  let serviceLinks = Map.empty<Nat, ServiceLink>();
  var siteInfo : ?SiteInfo = null;

  // User Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Forms Catalog - Public read access
  public query ({ caller }) func getAllForms() : async [Form] {
    forms.values().toArray();
  };

  public query ({ caller }) func getForm(formId : Nat) : async ?Form {
    forms.get(formId);
  };

  // Admin-only: Add form
  public shared ({ caller }) func addForm(
    title : Text,
    category : FormCategory,
    description : Text,
    feeAmount : Nat,
    fields : [FormField],
    instructions : Text
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add forms");
    };
    let formId = nextFormId;
    nextFormId += 1;
    let form : Form = {
      id = formId;
      title;
      category;
      description;
      feeAmount;
      fields;
      instructions;
    };
    forms.add(formId, form);
    formId;
  };

  // Admin-only: Edit form
  public shared ({ caller }) func editForm(
    formId : Nat,
    title : Text,
    category : FormCategory,
    description : Text,
    feeAmount : Nat,
    fields : [FormField],
    instructions : Text
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can edit forms");
    };
    let form : Form = {
      id = formId;
      title;
      category;
      description;
      feeAmount;
      fields;
      instructions;
    };
    forms.add(formId, form);
  };

  // Admin-only: Delete form
  public shared ({ caller }) func deleteForm(formId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete forms");
    };
    forms.remove(formId);
  };

  // User-only: Submit form
  public shared ({ caller }) func submitFormSubmission(formId : Nat, fieldValues : [(Text, Blob)]) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit forms");
    };
    let submissionId = nextSubmissionId;
    nextSubmissionId += 1;
    let submission : FormSubmission = {
      id = submissionId;
      formId;
      user = caller;
      fieldValues;
      timestamp = Time.now();
      status = #pending;
    };
    formSubmissions.add(submissionId, submission);
    submissionId;
  };

  // User can view their own submissions
  public query ({ caller }) func getMySubmissions() : async [FormSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view submissions");
    };
    formSubmissions.values().toArray().filter(func(sub) { sub.user == caller });
  };

  // Admin can view all submissions
  public query ({ caller }) func getAllSubmissions() : async [FormSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all submissions");
    };
    formSubmissions.values().toArray();
  };

  // Admin-only: Update submission status
  public shared ({ caller }) func updateSubmissionStatus(submissionId : Nat, status : SubmissionStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update submission status");
    };
    switch (formSubmissions.get(submissionId)) {
      case (?submission) {
        let updated : FormSubmission = {
          id = submission.id;
          formId = submission.formId;
          user = submission.user;
          fieldValues = submission.fieldValues;
          timestamp = submission.timestamp;
          status;
        };
        formSubmissions.add(submissionId, updated);
      };
      case null {
        Runtime.trap("Submission not found");
      };
    };
  };

  // Blog Posts - Public can read published posts
  public query ({ caller }) func getAllPublishedPosts() : async [Post] {
    posts.values().toArray().filter(func(post) { post.published }).sort(compareByDate);
  };

  public query ({ caller }) func getPublishedPostsByLanguage(language : Text) : async [Post] {
    posts.values().toArray().filter(func(post) { post.published and post.language == language }).sort(compareByDate);
  };

  // Admin can view all posts
  public query ({ caller }) func getAllPosts() : async [Post] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all posts");
    };
    posts.values().toArray().sort(compareByDate);
  };

  // Admin-only: Create post
  public shared ({ caller }) func createPost(
    title : Text,
    content : Text,
    language : Text,
    published : Bool
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create posts");
    };
    let postId = nextPostId;
    nextPostId += 1;
    let post : Post = {
      id = postId;
      title;
      content;
      language;
      author = caller;
      date = Time.now();
      published;
    };
    posts.add(postId, post);
    postId;
  };

  // Admin-only: Edit post
  public shared ({ caller }) func editPost(
    postId : Nat,
    title : Text,
    content : Text,
    language : Text,
    published : Bool
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can edit posts");
    };
    switch (posts.get(postId)) {
      case (?existingPost) {
        let post : Post = {
          id = postId;
          title;
          content;
          language;
          author = existingPost.author;
          date = existingPost.date;
          published;
        };
        posts.add(postId, post);
      };
      case null {
        Runtime.trap("Post not found");
      };
    };
  };

  // Admin-only: Delete post
  public shared ({ caller }) func deletePost(postId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete posts");
    };
    posts.remove(postId);
  };

  // Gallery - Public read access
  public query ({ caller }) func getAllGalleryItems() : async [GalleryItem] {
    galleryItems.values().toArray();
  };

  // Admin-only: Add gallery item
  public shared ({ caller }) func addGalleryItem(
    type_ : Text,
    blob : Storage.ExternalBlob,
    caption : Text
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add gallery items");
    };
    let itemId = nextGalleryItemId;
    nextGalleryItemId += 1;
    let item : GalleryItem = {
      id = itemId;
      type_;
      blob;
      caption;
      date = Time.now();
    };
    galleryItems.add(itemId, item);
    itemId;
  };

  // Admin-only: Delete gallery item
  public shared ({ caller }) func deleteGalleryItem(itemId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete gallery items");
    };
    galleryItems.remove(itemId);
  };

  // Government Schemes - Public read access
  public query ({ caller }) func getAllActiveSchemes() : async [Scheme] {
    schemes.values().toArray().filter(func(scheme) { scheme.active });
  };

  // Admin can view all schemes
  public query ({ caller }) func getAllSchemes() : async [Scheme] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all schemes");
    };
    schemes.values().toArray();
  };

  // Admin-only: Add scheme
  public shared ({ caller }) func addScheme(
    title : Text,
    description : Text,
    category : Text,
    documentsRequired : [Text],
    applicationLink : Text,
    active : Bool
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add schemes");
    };
    let schemeId = nextSchemeId;
    nextSchemeId += 1;
    let scheme : Scheme = {
      id = schemeId;
      title;
      description;
      category;
      documentsRequired;
      applicationLink;
      active;
    };
    schemes.add(schemeId, scheme);
    schemeId;
  };

  // Admin-only: Edit scheme
  public shared ({ caller }) func editScheme(
    schemeId : Nat,
    title : Text,
    description : Text,
    category : Text,
    documentsRequired : [Text],
    applicationLink : Text,
    active : Bool
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can edit schemes");
    };
    let scheme : Scheme = {
      id = schemeId;
      title;
      description;
      category;
      documentsRequired;
      applicationLink;
      active;
    };
    schemes.add(schemeId, scheme);
  };

  // Admin-only: Delete scheme
  public shared ({ caller }) func deleteScheme(schemeId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete schemes");
    };
    schemes.remove(schemeId);
  };

  // Service Links - Public read access
  public query ({ caller }) func getAllServiceLinks() : async [ServiceLink] {
    serviceLinks.values().toArray();
  };

  // Admin-only: Add service link
  public shared ({ caller }) func addServiceLink(
    name : Text,
    url : Text,
    category : Text,
    description : Text
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add service links");
    };
    let linkId = nextLinkId;
    nextLinkId += 1;
    let link : ServiceLink = {
      id = linkId;
      name;
      url;
      category;
      description;
    };
    serviceLinks.add(linkId, link);
    linkId;
  };

  // Admin-only: Edit service link
  public shared ({ caller }) func editServiceLink(
    linkId : Nat,
    name : Text,
    url : Text,
    category : Text,
    description : Text
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can edit service links");
    };
    let link : ServiceLink = {
      id = linkId;
      name;
      url;
      category;
      description;
    };
    serviceLinks.add(linkId, link);
  };

  // Admin-only: Delete service link
  public shared ({ caller }) func deleteServiceLink(linkId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete service links");
    };
    serviceLinks.remove(linkId);
  };

  // Contact/Info - Public read access
  public query ({ caller }) func getSiteInfo() : async ?SiteInfo {
    siteInfo;
  };

  // Admin-only: Update site info
  public shared ({ caller }) func updateSiteInfo(
    phone : Text,
    whatsapp : Text,
    email : Text,
    address : Text,
    socialLinks : [Text]
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update site info");
    };
    siteInfo := ?{
      phone;
      whatsapp;
      email;
      address;
      socialLinks;
    };
  };
};
