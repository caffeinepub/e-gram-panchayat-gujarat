import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { SEED_SCHEMES } from "../data/schemes";

export default function Schemes() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Central", "Gujarat"];
  const filtered =
    filter === "All"
      ? SEED_SCHEMES
      : SEED_SCHEMES.filter((s) => s.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase text-secondary mb-2">
          {t("schemes")}
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto" />
        <p className="text-muted-foreground mt-3">
          કેન્દ્ર અને ગુજરાત સરકારની યોજનાઓ
        </p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 justify-center flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(cat)}
            className={filter === cat ? "bg-primary text-white" : ""}
            data-ocid={`schemes.filter_${cat.toLowerCase()}.tab`}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map((scheme, i) => (
          <Card
            key={scheme.id}
            className="shadow-card overflow-hidden"
            data-ocid={`schemes.item.${i + 1}`}
          >
            <div className="relative h-36">
              <img
                src={scheme.image}
                alt={scheme.titleEn}
                className="w-full h-full object-cover"
              />
              <div
                className={`scheme-overlay-${scheme.color} absolute inset-0`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-white/20 text-white text-xs border border-white/30">
                    {scheme.category}
                  </Badge>
                </div>
                <h3 className="text-white font-bold mt-1">{scheme.titleEn}</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-3">
                {scheme.descEn}
              </p>

              <button
                type="button"
                className="flex items-center gap-1 text-sm text-primary font-medium"
                onClick={() =>
                  setExpanded(expanded === scheme.id ? null : scheme.id)
                }
                data-ocid={`schemes.expand_${i + 1}.toggle`}
              >
                {t("documentsRequired")}
                {expanded === scheme.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {expanded === scheme.id && (
                <ul className="mt-2 space-y-1">
                  {scheme.documents.map((doc) => (
                    <li key={doc} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              )}

              <a
                href={scheme.applyLink}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block"
              >
                <Button
                  size="sm"
                  className="bg-primary text-white w-full"
                  data-ocid={`schemes.apply_${i + 1}.button`}
                >
                  <ExternalLink className="w-3 h-3 mr-1" /> {t("applyNow")}
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
