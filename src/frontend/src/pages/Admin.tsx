import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  FileText,
  Image,
  Link,
  Loader2,
  Lock,
  Pencil,
  Plus,
  Settings,
  Star,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import type { Form, Scheme, ServiceLink } from "../backend.d";
import { FormCategory } from "../backend.d";
import { useLanguage } from "../context/LanguageContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  FormCategory as FC,
  SubmissionStatus,
  useAddForm,
  useAddGalleryItem,
  useAddScheme,
  useAddServiceLink,
  useAllForms,
  useAllPosts,
  useAllSchemes,
  useAllSubmissions,
  useCreatePost,
  useDeleteForm,
  useDeleteGalleryItem,
  useDeletePost,
  useDeleteScheme,
  useDeleteServiceLink,
  useEditForm,
  useEditScheme,
  useEditServiceLink,
  useGalleryItems,
  useIsAdmin,
  useServiceLinks,
  useSiteInfo,
  useUpdateSiteInfo,
  useUpdateSubmissionStatus,
} from "../hooks/useQueries";

const FORM_CATEGORIES = [
  { value: FormCategory.bpl, label: "BPL" },
  { value: FormCategory.rationCard, label: "Ration Card" },
  { value: FormCategory.birthDeath, label: "Birth / Death" },
  { value: FormCategory.revenue, label: "Revenue" },
  { value: FormCategory.nrega, label: "NREGA" },
  { value: FormCategory.panchayat, label: "Panchayat" },
  { value: FormCategory.construction, label: "Construction" },
  { value: FormCategory.marriage, label: "Marriage" },
  { value: FormCategory.income, label: "Income" },
];

export default function Admin() {
  const { t } = useLanguage();
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading } = useIsAdmin();

  if (!identity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Lock className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold text-secondary">લૉગિન કરો</h2>
        <p className="text-muted-foreground mt-2">
          Please login to access admin panel
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Lock className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold text-secondary">અધિકાર નથી</h2>
        <p className="text-muted-foreground mt-2">
          Admin access only. You do not have permission.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">A</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-secondary">
            {t("admin")} Panel
          </h1>
          <p className="text-sm text-muted-foreground">
            e GRAM PANCHAYAT GUJARAT - Admin Dashboard
          </p>
        </div>
      </div>

      <Tabs defaultValue="submissions">
        <div className="overflow-x-auto pb-1">
          <TabsList className="flex w-max min-w-full gap-1 mb-6 h-auto">
            <TabsTrigger
              value="submissions"
              className="flex items-center gap-1 text-xs"
              data-ocid="admin.submissions.tab"
            >
              <FileText className="w-3.5 h-3.5" /> ફોર્મ અરજી
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className="flex items-center gap-1 text-xs"
              data-ocid="admin.blog.tab"
            >
              <BookOpen className="w-3.5 h-3.5" /> બ્લૉગ
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="flex items-center gap-1 text-xs"
              data-ocid="admin.gallery.tab"
            >
              <Image className="w-3.5 h-3.5" /> ગેલેરી
            </TabsTrigger>
            <TabsTrigger
              value="schemes"
              className="flex items-center gap-1 text-xs"
              data-ocid="admin.schemes.tab"
            >
              <Star className="w-3.5 h-3.5" /> યોજનાઓ
            </TabsTrigger>
            <TabsTrigger
              value="servicelinks"
              className="flex items-center gap-1 text-xs"
              data-ocid="admin.servicelinks.tab"
            >
              <Link className="w-3.5 h-3.5" /> સર્વિસ લિંક
            </TabsTrigger>
            <TabsTrigger
              value="forms"
              className="flex items-center gap-1 text-xs"
              data-ocid="admin.forms.tab"
            >
              <FileText className="w-3.5 h-3.5" /> ફોર્મ કૅટૅલૉગ
            </TabsTrigger>
            <TabsTrigger
              value="siteinfo"
              className="flex items-center gap-1 text-xs"
              data-ocid="admin.siteinfo.tab"
            >
              <Settings className="w-3.5 h-3.5" /> વેબ માહિતી
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="submissions">
          <SubmissionsTab />
        </TabsContent>
        <TabsContent value="blog">
          <BlogTab />
        </TabsContent>
        <TabsContent value="gallery">
          <GalleryTab />
        </TabsContent>
        <TabsContent value="schemes">
          <SchemesTab />
        </TabsContent>
        <TabsContent value="servicelinks">
          <ServiceLinksTab />
        </TabsContent>
        <TabsContent value="forms">
          <FormsTab />
        </TabsContent>
        <TabsContent value="siteinfo">
          <SiteInfoTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── Submissions Tab ──────────────────────────────────────────────────────────
function SubmissionsTab() {
  const { data: submissions, isLoading } = useAllSubmissions();
  const { mutate: updateStatus } = useUpdateSubmissionStatus();

  if (isLoading)
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>ફોર્મ અરજીઓ ({submissions?.length || 0})</CardTitle>
      </CardHeader>
      <CardContent>
        {!submissions?.length ? (
          <div
            className="text-center py-12 text-muted-foreground"
            data-ocid="admin.submissions.empty_state"
          >
            <p>No submissions yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table data-ocid="admin.submissions.table">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Form</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((sub, i) => (
                  <TableRow
                    key={sub.id.toString()}
                    data-ocid={`admin.submissions.item.${i + 1}`}
                  >
                    <TableCell className="text-xs">
                      {sub.id.toString()}
                    </TableCell>
                    <TableCell className="text-xs">
                      {sub.formId.toString()}
                    </TableCell>
                    <TableCell className="text-xs truncate max-w-[100px]">
                      {sub.user.toString().slice(0, 15)}...
                    </TableCell>
                    <TableCell className="text-xs">
                      {new Date(
                        Number(sub.timestamp) / 1000000,
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs ${
                          sub.status === SubmissionStatus.approved
                            ? "bg-green-100 text-green-700"
                            : sub.status === SubmissionStatus.rejected
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {sub.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-7"
                          onClick={() =>
                            updateStatus({
                              id: sub.id,
                              status: SubmissionStatus.approved,
                            })
                          }
                          data-ocid={`admin.submissions.item.${i + 1}`}
                        >
                          ✓ Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-7 text-destructive"
                          onClick={() =>
                            updateStatus({
                              id: sub.id,
                              status: SubmissionStatus.rejected,
                            })
                          }
                          data-ocid={`admin.submissions.item.${i + 1}`}
                        >
                          ✗ Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Blog Tab ─────────────────────────────────────────────────────────────────
function BlogTab() {
  const { data: posts, isLoading } = useAllPosts();
  const { mutate: createPost, isPending: creating } = useCreatePost();
  const { mutate: deletePost } = useDeletePost();
  const [form, setForm] = useState({
    title: "",
    content: "",
    language: "gu",
    published: true,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createPost(form, {
      onSuccess: () => {
        toast.success("પોસ્ટ ઉમેરાયો!");
        setForm({ title: "", content: "", language: "gu", published: true });
      },
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>નવો બ્લૉગ પોસ્ટ</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>શીર્ષક / Title *</Label>
                <Input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  data-ocid="admin.blog.title.input"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>ભાષા / Language</Label>
                <Select
                  value={form.language}
                  onValueChange={(v) => setForm((p) => ({ ...p, language: v }))}
                >
                  <SelectTrigger
                    className="mt-1"
                    data-ocid="admin.blog.language.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gu">ગુજરાતી</SelectItem>
                    <SelectItem value="hi">हिंदी</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>સંપૂર્ણ લેખ / Content *</Label>
              <Textarea
                required
                rows={5}
                value={form.content}
                onChange={(e) =>
                  setForm((p) => ({ ...p, content: e.target.value }))
                }
                data-ocid="admin.blog.content.textarea"
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              disabled={creating}
              className="bg-primary text-white"
              data-ocid="admin.blog.submit.button"
            >
              {creating ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                <Plus className="mr-2 w-4 h-4" />
              )}
              પોસ્ટ ઉમેરો
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ઉપલબ્ધ પોસ્ટ ({posts?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <div className="space-y-2">
              {!posts?.length ? (
                <p
                  className="text-muted-foreground text-center py-8"
                  data-ocid="admin.blog.empty_state"
                >
                  No posts
                </p>
              ) : (
                posts.map((post, i) => (
                  <div
                    key={post.id.toString()}
                    className="flex items-center justify-between p-3 bg-muted/40 rounded-lg"
                    data-ocid={`admin.blog.item.${i + 1}`}
                  >
                    <div>
                      <div className="font-medium text-sm">{post.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {post.language} •{" "}
                        {post.published ? "Published" : "Draft"}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        deletePost(post.id, {
                          onSuccess: () => toast.success("ડિલીટ થયું!"),
                        })
                      }
                      data-ocid={`admin.blog.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Gallery Tab ──────────────────────────────────────────────────────────────
function GalleryTab() {
  const { data: items, isLoading } = useGalleryItems();
  const { mutate: addItem, isPending: uploading } = useAddGalleryItem();
  const { mutate: deleteItem } = useDeleteGalleryItem();
  const fileRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [mediaType, setMediaType] = useState("photo");
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    const bytes = new Uint8Array(await selectedFile.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((p) =>
      setProgress(p),
    );
    addItem(
      { type: mediaType, blob, caption },
      {
        onSuccess: () => {
          toast.success("અપલોડ સફળ!");
          setCaption("");
          setSelectedFile(null);
          setProgress(0);
          if (fileRef.current) fileRef.current.value = "";
        },
        onError: () => toast.error("અપલોડ નિષ્ફળ"),
      },
    );
  };

  const typeLabel = (t: string) => {
    if (t === "photo")
      return { label: "Photo", color: "bg-blue-100 text-blue-700" };
    if (t === "video")
      return { label: "Video", color: "bg-purple-100 text-purple-700" };
    return { label: "Audio", color: "bg-green-100 text-green-700" };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>નવી ફાઇલ અપલોડ કરો</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label>પ્રકાર / Type</Label>
                <Select value={mediaType} onValueChange={setMediaType}>
                  <SelectTrigger
                    className="mt-1"
                    data-ocid="admin.gallery.type.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photo">📷 Photo</SelectItem>
                    <SelectItem value="video">🎥 Video</SelectItem>
                    <SelectItem value="audio">🎵 Audio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Label>શીર્ષક / Caption *</Label>
                <Input
                  required
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="ફોટો / વિડિઓ વર્ણન"
                  data-ocid="admin.gallery.caption.input"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>ફાઇલ પસંદ કરો *</Label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,video/*,audio/*"
                required
                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                className="mt-1 block w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                data-ocid="admin.gallery.upload_button"
              />
            </div>
            {uploading && (
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Uploading... {progress}%
                </div>
                <Progress
                  value={progress}
                  className="h-2"
                  data-ocid="admin.gallery.loading_state"
                />
              </div>
            )}
            <Button
              type="submit"
              disabled={uploading || !selectedFile}
              className="bg-primary text-white"
              data-ocid="admin.gallery.submit.button"
            >
              {uploading ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                <Plus className="mr-2 w-4 h-4" />
              )}
              અપલોડ કરો
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ગેલેરી આઇટમ ({items?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div
              className="flex justify-center py-4"
              data-ocid="admin.gallery.loading_state"
            >
              <Loader2 className="animate-spin" />
            </div>
          ) : !items?.length ? (
            <div
              className="text-center py-10 text-muted-foreground"
              data-ocid="admin.gallery.empty_state"
            >
              <Image className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>કોઈ ફાઇલ નહીં</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {items.map((item, i) => {
                const tl = typeLabel(item.type);
                return (
                  <div
                    key={item.id.toString()}
                    className="relative group rounded-xl overflow-hidden border border-border bg-muted/20"
                    data-ocid={`admin.gallery.item.${i + 1}`}
                  >
                    {item.type === "photo" ? (
                      <img
                        src={item.blob.getDirectURL()}
                        alt={item.caption}
                        className="w-full h-28 object-cover"
                      />
                    ) : (
                      <div className="w-full h-28 flex items-center justify-center bg-muted">
                        <span className="text-3xl">
                          {item.type === "video" ? "🎥" : "🎵"}
                        </span>
                      </div>
                    )}
                    <div className="p-2">
                      <Badge className={`text-xs ${tl.color} mb-1`}>
                        {tl.label}
                      </Badge>
                      <p className="text-xs truncate text-muted-foreground">
                        {item.caption}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() =>
                        deleteItem(item.id, {
                          onSuccess: () => toast.success("ડિલીટ થયું!"),
                        })
                      }
                      data-ocid={`admin.gallery.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Schemes Tab ──────────────────────────────────────────────────────────────
type SchemeForm = {
  title: string;
  description: string;
  category: string;
  documentsRequired: string;
  applicationLink: string;
  active: boolean;
};

const defaultSchemeForm: SchemeForm = {
  title: "",
  description: "",
  category: "general",
  documentsRequired: "",
  applicationLink: "",
  active: true,
};

function SchemesTab() {
  const { data: schemes, isLoading } = useAllSchemes();
  const { mutate: addScheme, isPending: adding } = useAddScheme();
  const { mutate: editScheme, isPending: editing } = useEditScheme();
  const { mutate: deleteScheme } = useDeleteScheme();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Scheme | null>(null);
  const [form, setForm] = useState<SchemeForm>(defaultSchemeForm);

  const openAdd = () => {
    setEditTarget(null);
    setForm(defaultSchemeForm);
    setDialogOpen(true);
  };

  const openEdit = (s: Scheme) => {
    setEditTarget(s);
    setForm({
      title: s.title,
      description: s.description,
      category: s.category,
      documentsRequired: s.documentsRequired.join("\n"),
      applicationLink: s.applicationLink,
      active: s.active,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const docs = form.documentsRequired
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);
    if (editTarget) {
      editScheme(
        { id: editTarget.id, ...form, documentsRequired: docs },
        {
          onSuccess: () => {
            toast.success("અપડેટ થયું!");
            setDialogOpen(false);
          },
        },
      );
    } else {
      addScheme(
        { ...form, documentsRequired: docs },
        {
          onSuccess: () => {
            toast.success("ઉમેરાયું!");
            setDialogOpen(false);
          },
        },
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          સરકારી યોજનાઓ ({schemes?.length || 0})
        </h2>
        <Button
          onClick={openAdd}
          className="bg-primary text-white"
          data-ocid="admin.schemes.open_modal_button"
        >
          <Plus className="w-4 h-4 mr-1" /> ઉમેરો
        </Button>
      </div>

      <Card>
        <CardContent className="pt-4">
          {isLoading ? (
            <div
              className="flex justify-center py-6"
              data-ocid="admin.schemes.loading_state"
            >
              <Loader2 className="animate-spin" />
            </div>
          ) : !schemes?.length ? (
            <div
              className="text-center py-10 text-muted-foreground"
              data-ocid="admin.schemes.empty_state"
            >
              <Star className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>કોઈ યોજના નહીં</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schemes.map((s, i) => (
                    <TableRow
                      key={s.id.toString()}
                      data-ocid={`admin.schemes.item.${i + 1}`}
                    >
                      <TableCell>
                        <div className="font-medium text-sm">{s.title}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-48">
                          {s.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {s.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            s.active
                              ? "bg-green-100 text-green-700 text-xs"
                              : "bg-gray-100 text-gray-600 text-xs"
                          }
                        >
                          {s.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                            onClick={() => openEdit(s)}
                            data-ocid={`admin.schemes.edit_button.${i + 1}`}
                          >
                            <Pencil className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-7 w-7 p-0"
                            onClick={() =>
                              deleteScheme(s.id, {
                                onSuccess: () => toast.success("ડિલીટ!"),
                              })
                            }
                            data-ocid={`admin.schemes.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin.schemes.dialog">
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "યોજના સંપાદિત" : "નવી યોજના"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label>શીર્ષક *</Label>
              <Input
                required
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                className="mt-1"
                data-ocid="admin.schemes.title.input"
              />
            </div>
            <div>
              <Label>વર્ણન</Label>
              <Textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                className="mt-1"
                data-ocid="admin.schemes.description.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Category</Label>
                <Input
                  value={form.category}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, category: e.target.value }))
                  }
                  className="mt-1"
                  placeholder="general, housing, health..."
                  data-ocid="admin.schemes.category.input"
                />
              </div>
              <div>
                <Label>Application Link</Label>
                <Input
                  value={form.applicationLink}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, applicationLink: e.target.value }))
                  }
                  className="mt-1"
                  placeholder="https://..."
                  data-ocid="admin.schemes.link.input"
                />
              </div>
            </div>
            <div>
              <Label>Documents Required (one per line)</Label>
              <Textarea
                rows={3}
                value={form.documentsRequired}
                onChange={(e) =>
                  setForm((p) => ({ ...p, documentsRequired: e.target.value }))
                }
                className="mt-1"
                placeholder="Aadhaar Card\nRation Card\n..."
                data-ocid="admin.schemes.documents.textarea"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.active}
                onCheckedChange={(v) => setForm((p) => ({ ...p, active: v }))}
                data-ocid="admin.schemes.active.switch"
              />
              <Label>Active</Label>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="admin.schemes.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={adding || editing}
                className="bg-primary text-white"
                data-ocid="admin.schemes.confirm_button"
              >
                {adding || editing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editTarget ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Service Links Tab ────────────────────────────────────────────────────────
type ServiceLinkForm = {
  name: string;
  url: string;
  category: string;
  description: string;
};

const defaultServiceLinkForm: ServiceLinkForm = {
  name: "",
  url: "",
  category: "general",
  description: "",
};

function ServiceLinksTab() {
  const { data: links, isLoading } = useServiceLinks();
  const { mutate: addLink, isPending: adding } = useAddServiceLink();
  const { mutate: editLink, isPending: editing } = useEditServiceLink();
  const { mutate: deleteLink } = useDeleteServiceLink();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ServiceLink | null>(null);
  const [form, setForm] = useState<ServiceLinkForm>(defaultServiceLinkForm);

  const openAdd = () => {
    setEditTarget(null);
    setForm(defaultServiceLinkForm);
    setDialogOpen(true);
  };

  const openEdit = (l: ServiceLink) => {
    setEditTarget(l);
    setForm({
      name: l.name,
      url: l.url,
      category: l.category,
      description: l.description,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTarget) {
      editLink(
        { id: editTarget.id, ...form },
        {
          onSuccess: () => {
            toast.success("અપડેટ!");
            setDialogOpen(false);
          },
        },
      );
    } else {
      addLink(form, {
        onSuccess: () => {
          toast.success("ઉમેરાયું!");
          setDialogOpen(false);
        },
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">
            સર્વિસ લિંક ({links?.length || 0})
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gujarat govt links, external services ઉમેરી શકો
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-primary text-white"
          data-ocid="admin.servicelinks.open_modal_button"
        >
          <Plus className="w-4 h-4 mr-1" /> ઉમેરો
        </Button>
      </div>

      <Card>
        <CardContent className="pt-4">
          {isLoading ? (
            <div
              className="flex justify-center py-6"
              data-ocid="admin.servicelinks.loading_state"
            >
              <Loader2 className="animate-spin" />
            </div>
          ) : !links?.length ? (
            <div
              className="text-center py-10 text-muted-foreground"
              data-ocid="admin.servicelinks.empty_state"
            >
              <Link className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>કોઈ સર્વિસ લિંક નહીં</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {links.map((l, i) => (
                    <TableRow
                      key={l.id.toString()}
                      data-ocid={`admin.servicelinks.item.${i + 1}`}
                    >
                      <TableCell>
                        <div className="font-medium text-sm">{l.name}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-40">
                          {l.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-primary hover:underline truncate max-w-40 block"
                        >
                          {l.url}
                        </a>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {l.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                            onClick={() => openEdit(l)}
                            data-ocid={`admin.servicelinks.edit_button.${i + 1}`}
                          >
                            <Pencil className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-7 w-7 p-0"
                            onClick={() =>
                              deleteLink(l.id, {
                                onSuccess: () => toast.success("ડિલીટ!"),
                              })
                            }
                            data-ocid={`admin.servicelinks.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-md"
          data-ocid="admin.servicelinks.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Link સંપાદિત" : "નવી Service Link"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label>Name *</Label>
              <Input
                required
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="e.g. AnyROR Gujarat"
                className="mt-1"
                data-ocid="admin.servicelinks.name.input"
              />
            </div>
            <div>
              <Label>URL *</Label>
              <Input
                required
                type="url"
                value={form.url}
                onChange={(e) =>
                  setForm((p) => ({ ...p, url: e.target.value }))
                }
                placeholder="https://..."
                className="mt-1"
                data-ocid="admin.servicelinks.url.input"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
                }
                placeholder="revenue, health, education..."
                className="mt-1"
                data-ocid="admin.servicelinks.category.input"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                rows={2}
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                className="mt-1"
                data-ocid="admin.servicelinks.description.textarea"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="admin.servicelinks.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={adding || editing}
                className="bg-primary text-white"
                data-ocid="admin.servicelinks.confirm_button"
              >
                {adding || editing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editTarget ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Forms Tab ────────────────────────────────────────────────────────────────
type FormCatalogForm = {
  title: string;
  category: FormCategory;
  description: string;
};

const defaultFormCatalog: FormCatalogForm = {
  title: "",
  category: FormCategory.panchayat,
  description: "",
};

function FormsTab() {
  const { data: forms, isLoading } = useAllForms();
  const { mutate: addForm, isPending: adding } = useAddForm();
  const { mutate: editForm, isPending: editing } = useEditForm();
  const { mutate: deleteForm } = useDeleteForm();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Form | null>(null);
  const [form, setForm] = useState<FormCatalogForm>(defaultFormCatalog);

  const openAdd = () => {
    setEditTarget(null);
    setForm(defaultFormCatalog);
    setDialogOpen(true);
  };

  const openEdit = (f: Form) => {
    setEditTarget(f);
    setForm({
      title: f.title,
      category: f.category,
      description: f.description,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTarget) {
      editForm(
        { id: editTarget.id, ...form },
        {
          onSuccess: () => {
            toast.success("અપડેટ!");
            setDialogOpen(false);
          },
        },
      );
    } else {
      addForm(form, {
        onSuccess: () => {
          toast.success("ઉમેરાયું!");
          setDialogOpen(false);
        },
      });
    }
  };

  const catLabel = (c: FormCategory) =>
    FORM_CATEGORIES.find((x) => x.value === c)?.label ?? c;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          ફોર્મ કૅટૅલૉગ ({forms?.length || 0})
        </h2>
        <Button
          onClick={openAdd}
          className="bg-primary text-white"
          data-ocid="admin.forms.open_modal_button"
        >
          <Plus className="w-4 h-4 mr-1" /> ઉમેરો
        </Button>
      </div>

      <Card>
        <CardContent className="pt-4">
          {isLoading ? (
            <div
              className="flex justify-center py-6"
              data-ocid="admin.forms.loading_state"
            >
              <Loader2 className="animate-spin" />
            </div>
          ) : !forms?.length ? (
            <div
              className="text-center py-10 text-muted-foreground"
              data-ocid="admin.forms.empty_state"
            >
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>કોઈ ફોર્મ નહીં</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forms.map((f, i) => (
                    <TableRow
                      key={f.id.toString()}
                      data-ocid={`admin.forms.item.${i + 1}`}
                    >
                      <TableCell>
                        <div className="font-medium text-sm">{f.title}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-60">
                          {f.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {catLabel(f.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                            onClick={() => openEdit(f)}
                            data-ocid={`admin.forms.edit_button.${i + 1}`}
                          >
                            <Pencil className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-7 w-7 p-0"
                            onClick={() =>
                              deleteForm(f.id, {
                                onSuccess: () => toast.success("ડિલીટ!"),
                              })
                            }
                            data-ocid={`admin.forms.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" data-ocid="admin.forms.dialog">
          <DialogHeader>
            <DialogTitle>{editTarget ? "ફોર્મ સંપાદિત" : "નવો ફોર્મ"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label>Title *</Label>
              <Input
                required
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                className="mt-1"
                placeholder="e.g. BPL Certificate Form"
                data-ocid="admin.forms.title.input"
              />
            </div>
            <div>
              <Label>Category *</Label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, category: v as FormCategory }))
                }
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="admin.forms.category.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FORM_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                className="mt-1"
                data-ocid="admin.forms.description.textarea"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="admin.forms.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={adding || editing}
                className="bg-primary text-white"
                data-ocid="admin.forms.confirm_button"
              >
                {adding || editing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editTarget ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Site Info Tab ────────────────────────────────────────────────────────────
function SiteInfoTab() {
  const { data: siteInfo } = useSiteInfo();
  const { mutate: updateSiteInfo, isPending: saving } = useUpdateSiteInfo();

  const [info, setInfo] = useState({
    phone: "7874785814",
    whatsapp: "7874785814",
    email: "cscservicedugdolgp@gmail.com",
    address: "Moti Dugdol, Ta. Dhanera, Dist. Banaskantha, Gujarat",
    upiId: "9586712501@ybl",
  });

  useEffect(() => {
    if (siteInfo) {
      const upiLink = siteInfo.socialLinks.find((l) => l.startsWith("upi:"));
      setInfo({
        phone: siteInfo.phone || "7874785814",
        whatsapp: siteInfo.whatsapp || "7874785814",
        email: siteInfo.email || "cscservicedugdolgp@gmail.com",
        address:
          siteInfo.address ||
          "Moti Dugdol, Ta. Dhanera, Dist. Banaskantha, Gujarat",
        upiId: upiLink ? upiLink.replace("upi:", "") : "9586712501@ybl",
      });
    }
  }, [siteInfo]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const existingSocial = (siteInfo?.socialLinks ?? []).filter(
      (l) => !l.startsWith("upi:"),
    );
    updateSiteInfo(
      {
        phone: info.phone,
        whatsapp: info.whatsapp,
        email: info.email,
        address: info.address,
        socialLinks: [...existingSocial, `upi:${info.upiId}`],
      },
      {
        onSuccess: () => toast.success("સાઇટ માહિતી સચવાઈ!"),
        onError: () => toast.error("Error saving site info"),
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>વેબસાઇટ માહિતી / Site Info</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>ફોન / Phone</Label>
              <Input
                value={info.phone}
                onChange={(e) =>
                  setInfo((p) => ({ ...p, phone: e.target.value }))
                }
                data-ocid="admin.siteinfo.phone.input"
                className="mt-1"
              />
            </div>
            <div>
              <Label>WhatsApp</Label>
              <Input
                value={info.whatsapp}
                onChange={(e) =>
                  setInfo((p) => ({ ...p, whatsapp: e.target.value }))
                }
                data-ocid="admin.siteinfo.whatsapp.input"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={info.email}
                onChange={(e) =>
                  setInfo((p) => ({ ...p, email: e.target.value }))
                }
                data-ocid="admin.siteinfo.email.input"
                className="mt-1"
              />
            </div>
            <div>
              <Label>UPI ID</Label>
              <Input
                value={info.upiId}
                onChange={(e) =>
                  setInfo((p) => ({ ...p, upiId: e.target.value }))
                }
                placeholder="9586712501@ybl"
                data-ocid="admin.siteinfo.upiid.input"
                className="mt-1"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>સરનામું / Address</Label>
              <Input
                value={info.address}
                onChange={(e) =>
                  setInfo((p) => ({ ...p, address: e.target.value }))
                }
                data-ocid="admin.siteinfo.address.input"
                className="mt-1"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={saving}
            className="bg-primary text-white"
            data-ocid="admin.siteinfo.save.button"
          >
            {saving ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : null}
            સચવો / Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
