import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { SEED_POSTS } from "../data/blog";
import { usePublishedPosts } from "../hooks/useQueries";

const LANG_OPTIONS = [
  { key: "all", label: "All / બધા" },
  { key: "gu", label: "ગુજરાતી" },
  { key: "hi", label: "हिंदी" },
  { key: "en", label: "English" },
];

export default function Blog() {
  const { t } = useLanguage();
  const [langFilter, setLangFilter] = useState("all");
  const [selectedPost, setSelectedPost] = useState<
    (typeof SEED_POSTS)[0] | null
  >(null);

  const { data: backendPosts } = usePublishedPosts(
    langFilter === "all" ? undefined : langFilter,
  );
  const posts =
    backendPosts && backendPosts.length > 0
      ? backendPosts.map((p) => ({
          id: Number(p.id),
          title: p.title,
          content: p.content,
          date: new Date(Number(p.date) / 1000000).toISOString().split("T")[0],
          language: p.language as "gu" | "hi" | "en",
          excerpt: `${p.content.slice(0, 100)}...`,
        }))
      : SEED_POSTS;

  const filtered =
    langFilter === "all"
      ? posts
      : posts.filter((p) => p.language === langFilter);

  if (selectedPost) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Button
          variant="outline"
          onClick={() => setSelectedPost(null)}
          className="mb-6"
          data-ocid="blog.back.button"
        >
          ← Back
        </Button>
        <Badge className="mb-3">{selectedPost.language.toUpperCase()}</Badge>
        <h1 className="text-2xl font-bold text-secondary mb-2">
          {selectedPost.title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
          <CalendarDays className="w-4 h-4" />
          {selectedPost.date}
        </div>
        <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
          {selectedPost.content.split("\n").map((para) => (
            <p key={para.slice(0, 30)} className="mb-3">
              {para}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase text-secondary mb-2">
          {t("blog")}
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto" />
      </div>

      {/* Language Filter */}
      <div className="flex gap-2 mb-6 justify-center flex-wrap">
        {LANG_OPTIONS.map((opt) => (
          <Button
            key={opt.key}
            variant={langFilter === opt.key ? "default" : "outline"}
            size="sm"
            onClick={() => setLangFilter(opt.key)}
            className={langFilter === opt.key ? "bg-primary text-white" : ""}
            data-ocid={`blog.filter_${opt.key}.tab`}
          >
            {opt.label}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="blog.empty_state"
        >
          <p>No posts found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <Card
              key={post.id}
              className="shadow-card hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedPost(post)}
              data-ocid={`blog.item.${i + 1}`}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">
                    {post.language.toUpperCase()}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="w-3 h-3" />
                    {post.date}
                  </div>
                </div>
                <h3 className="font-bold text-secondary leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                <Button
                  variant="link"
                  className="mt-2 p-0 text-primary text-sm"
                  data-ocid={`blog.read_${i + 1}.button`}
                >
                  {t("readMore")} →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
