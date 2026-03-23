import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { SEED_SCHEMES } from "../data/schemes";

const PM_KISAN_LINKS = [
  {
    id: "registration",
    label: "નવી નોંધણી (Registration)",
    url: "https://pmkisan.gov.in/RegistrationFormNew.aspx",
  },
  {
    id: "status",
    label: "Beneficiary Status",
    url: "https://pmkisan.gov.in/BeneficiaryStatus/BeneficiaryStatus.aspx",
  },
  { id: "kyc", label: "e-KYC", url: "https://pmkisan.gov.in/Ekyc.aspx" },
  {
    id: "payment",
    label: "Payment History",
    url: "https://pmkisan.gov.in/PaymentStatus.aspx",
  },
];

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
      {/* PM Kisan Warning Card */}
      <div
        className="mb-8 rounded-xl border-2 border-green-500 bg-green-50 p-5 shadow-card"
        data-ocid="pmkisan.card"
      >
        <div className="flex items-start gap-3 mb-3">
          <AlertTriangle className="w-6 h-6 text-green-700 shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-green-800 text-lg">
              PM કિસાન સન્માન નિધિ — સત્તાવાર (Official) Website
            </h2>
            <a
              href="https://pmkisan.gov.in"
              target="_blank"
              rel="noreferrer"
              className="text-green-700 font-bold text-base underline hover:text-green-900 flex items-center gap-1 mt-1"
            >
              <ExternalLink className="w-4 h-4" />
              pmkisan.gov.in
            </a>
          </div>
        </div>
        <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4 text-sm text-red-700 font-medium">
          ⚠️ સાવધાન: ફક્ત <strong>pmkisan.gov.in (.gov.in domain)</strong> વાળી
          સાઇટ જ સાચી સરકારી સાઇટ છે. નકલી websites થી સાવધ રહો!
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PM_KISAN_LINKS.map((link, i) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              data-ocid={`pmkisan.link.${i + 1}`}
            >
              <Button
                size="sm"
                variant="outline"
                className="border-green-500 text-green-700 hover:bg-green-100 w-full text-xs"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                {link.label}
              </Button>
            </a>
          ))}
        </div>
      </div>

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
