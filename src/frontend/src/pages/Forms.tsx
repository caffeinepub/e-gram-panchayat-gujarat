import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import FormModal from "../components/FormModal";
import { useLanguage } from "../context/LanguageContext";
import { FORM_CATEGORIES, SEED_FORMS, type SeedForm } from "../data/forms";

export default function Forms() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedForm, setSelectedForm] = useState<SeedForm | null>(null);

  const filtered = SEED_FORMS.filter((f) => {
    const matchCat = activeCategory === "all" || f.category === activeCategory;
    const title =
      language === "gu" ? f.titleGu : language === "hi" ? f.titleHi : f.titleEn;
    const matchSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      f.titleEn.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const getTitle = (f: SeedForm) =>
    language === "gu" ? f.titleGu : language === "hi" ? f.titleHi : f.titleEn;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase text-secondary mb-2">
          {t("forms")}
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto" />
        <p className="text-muted-foreground mt-3">
          ગ્રામ પંચાયત / તાલુકા / જિલ્લા પંચાયતના તમામ ફોર્મ (35+ ફોર્મ)
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={t("searchForms")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          data-ocid="forms.search_input"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {FORM_CATEGORIES.map((cat) => (
          <Button
            key={cat.key}
            variant={activeCategory === cat.key ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat.key)}
            className={
              activeCategory === cat.key ? "bg-primary text-white" : ""
            }
            data-ocid={`forms.category_${cat.key}.tab`}
          >
            {language === "gu"
              ? cat.labelGu
              : language === "hi"
                ? cat.labelHi
                : cat.labelEn}
          </Button>
        ))}
      </div>

      {/* Forms Grid */}
      {filtered.length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="forms.empty_state"
        >
          <div className="text-4xl mb-3">📄</div>
          <p>કોઈ ફોર્મ મળ્યા નહીં / No forms found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((form, i) => (
            <Card
              key={form.id}
              className="shadow-card hover:shadow-md transition-all"
              data-ocid={`forms.item.${i + 1}`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-secondary text-sm leading-snug">
                      {getTitle(form)}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {form.titleEn}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  {form.descEn}
                </p>
                <Button
                  size="sm"
                  className="w-full bg-accent text-white hover:bg-brand-blue"
                  onClick={() => setSelectedForm(form)}
                  data-ocid={`forms.fill_${i + 1}.button`}
                >
                  {t("fillForm")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <FormModal
        form={selectedForm}
        open={!!selectedForm}
        onClose={() => setSelectedForm(null)}
      />
    </div>
  );
}
