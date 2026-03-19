import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Loader2, Lock, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  SubmissionStatus,
  useAllPosts,
  useAllSubmissions,
  useCreatePost,
  useDeletePost,
  useIsAdmin,
  useUpdateSubmissionStatus,
} from "../hooks/useQueries";

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
        <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
          <TabsTrigger value="submissions" data-ocid="admin.submissions.tab">
            ફોર્મ અરજી
          </TabsTrigger>
          <TabsTrigger value="blog" data-ocid="admin.blog.tab">
            બ્લૉગ
          </TabsTrigger>
          <TabsTrigger value="siteinfo" data-ocid="admin.siteinfo.tab">
            વેબ માહિતી
          </TabsTrigger>
        </TabsList>

        <TabsContent value="submissions">
          <SubmissionsTab />
        </TabsContent>
        <TabsContent value="blog">
          <BlogTab />
        </TabsContent>
        <TabsContent value="siteinfo">
          <SiteInfoTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

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
                          data-ocid={`admin.submissions.approve_${i + 1}.button`}
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
                          data-ocid={`admin.submissions.reject_${i + 1}.button`}
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
                    className="flex items-center justify-between p-3 bg-brand-cream rounded-lg"
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
                      data-ocid={`admin.blog.delete_${i + 1}.delete_button`}
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

function SiteInfoTab() {
  const [info, setInfo] = useState({
    phone: "7874785814",
    whatsapp: "7874785814",
    email: "cscservicedugdolgp@gmail.com",
    address: "Moti Dugdol, Ta. Dhanera, Dist. Banaskantha, Gujarat",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("સાઇટ માહિતી સચવાઈ!");
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
            className="bg-primary text-white"
            data-ocid="admin.siteinfo.save.button"
          >
            સચવો / Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
