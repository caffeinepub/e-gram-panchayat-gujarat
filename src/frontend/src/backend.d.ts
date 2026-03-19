import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface FormField {
    required: boolean;
    fieldName: string;
    fieldType: FieldType;
}
export interface FormSubmission {
    id: bigint;
    status: SubmissionStatus;
    user: Principal;
    fieldValues: Array<[string, Uint8Array]>;
    timestamp: Time;
    formId: bigint;
}
export interface Form {
    id: bigint;
    feeAmount: bigint;
    title: string;
    description: string;
    instructions: string;
    fields: Array<FormField>;
    category: FormCategory;
}
export interface Scheme {
    id: bigint;
    title: string;
    active: boolean;
    description: string;
    documentsRequired: Array<string>;
    category: string;
    applicationLink: string;
}
export interface ServiceLink {
    id: bigint;
    url: string;
    name: string;
    description: string;
    category: string;
}
export interface Post {
    id: bigint;
    title: string;
    content: string;
    date: Time;
    published: boolean;
    author: Principal;
    language: string;
}
export type FieldType = {
    __kind__: "date";
    date: null;
} | {
    __kind__: "text";
    text: null;
} | {
    __kind__: "document";
    document: ExternalBlob;
} | {
    __kind__: "number";
    number: null;
} | {
    __kind__: "checkbox";
    checkbox: null;
} | {
    __kind__: "dropdown";
    dropdown: Array<string>;
};
export interface GalleryItem {
    id: bigint;
    blob: ExternalBlob;
    date: Time;
    type: string;
    caption: string;
}
export interface SiteInfo {
    socialLinks: Array<string>;
    whatsapp: string;
    email: string;
    address: string;
    phone: string;
}
export interface UserProfile {
    subscriptionExpiry: Time;
    name: string;
    subscriptionType: SubscriptionType;
    district: string;
    taluka: string;
    village: string;
    mobile: string;
}
export enum FormCategory {
    bpl = "bpl",
    revenue = "revenue",
    construction = "construction",
    rationCard = "rationCard",
    birthDeath = "birthDeath",
    panchayat = "panchayat",
    income = "income",
    marriage = "marriage",
    nrega = "nrega"
}
export enum SubmissionStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum SubscriptionType {
    annual = "annual",
    quarterly = "quarterly",
    monthly = "monthly"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addForm(title: string, category: FormCategory, description: string, feeAmount: bigint, fields: Array<FormField>, instructions: string): Promise<bigint>;
    addGalleryItem(type: string, blob: ExternalBlob, caption: string): Promise<bigint>;
    addScheme(title: string, description: string, category: string, documentsRequired: Array<string>, applicationLink: string, active: boolean): Promise<bigint>;
    addServiceLink(name: string, url: string, category: string, description: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPost(title: string, content: string, language: string, published: boolean): Promise<bigint>;
    deleteForm(formId: bigint): Promise<void>;
    deleteGalleryItem(itemId: bigint): Promise<void>;
    deletePost(postId: bigint): Promise<void>;
    deleteScheme(schemeId: bigint): Promise<void>;
    deleteServiceLink(linkId: bigint): Promise<void>;
    editForm(formId: bigint, title: string, category: FormCategory, description: string, feeAmount: bigint, fields: Array<FormField>, instructions: string): Promise<void>;
    editPost(postId: bigint, title: string, content: string, language: string, published: boolean): Promise<void>;
    editScheme(schemeId: bigint, title: string, description: string, category: string, documentsRequired: Array<string>, applicationLink: string, active: boolean): Promise<void>;
    editServiceLink(linkId: bigint, name: string, url: string, category: string, description: string): Promise<void>;
    getAllActiveSchemes(): Promise<Array<Scheme>>;
    getAllForms(): Promise<Array<Form>>;
    getAllGalleryItems(): Promise<Array<GalleryItem>>;
    getAllPosts(): Promise<Array<Post>>;
    getAllPublishedPosts(): Promise<Array<Post>>;
    getAllSchemes(): Promise<Array<Scheme>>;
    getAllServiceLinks(): Promise<Array<ServiceLink>>;
    getAllSubmissions(): Promise<Array<FormSubmission>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getForm(formId: bigint): Promise<Form | null>;
    getMySubmissions(): Promise<Array<FormSubmission>>;
    getPublishedPostsByLanguage(language: string): Promise<Array<Post>>;
    getSiteInfo(): Promise<SiteInfo | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitFormSubmission(formId: bigint, fieldValues: Array<[string, Uint8Array]>): Promise<bigint>;
    updateSiteInfo(phone: string, whatsapp: string, email: string, address: string, socialLinks: Array<string>): Promise<void>;
    updateSubmissionStatus(submissionId: bigint, status: SubmissionStatus): Promise<void>;
}
