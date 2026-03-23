import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { GOVT_LINKS, QUICK_LINKS } from "../data/serviceLinks";

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

export default function Services() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* PM Kisan Warning Card */}
      <div
        className="mb-8 rounded-xl border-2 border-green-500 bg-green-50 p-5 shadow-card"
        data-ocid="pmkisan.services.card"
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
              data-ocid={`pmkisan.services.link.${i + 1}`}
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
          {t("services")}
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto" />
      </div>

      {/* Quick Links */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-secondary uppercase mb-4">
          {t("quickLinks")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {QUICK_LINKS.map((link, i) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              data-ocid={`services.quick_${i + 1}.link`}
            >
              <Card className="hover:shadow-md transition-shadow text-center cursor-pointer h-full">
                <CardContent className="p-4">
                  <div className="text-3xl mb-2">{link.icon}</div>
                  <div className="text-sm font-semibold text-secondary leading-tight">
                    {link.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {link.description}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Government Links */}
      <section>
        <h2 className="text-xl font-bold text-secondary uppercase mb-4">
          {t("govtLinks")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GOVT_LINKS.map((link, i) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              data-ocid={`services.govt_${i + 1}.link`}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-4 flex items-start gap-3">
                  <span className="text-2xl">{link.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-secondary text-sm">
                      {link.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {link.description}
                    </div>
                    <div className="text-xs text-primary mt-1 flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Visit
                    </div>
                  </div>
                  <span className="text-xs bg-brand-cream text-secondary px-2 py-0.5 rounded-full shrink-0">
                    {link.category}
                  </span>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* WhatsApp Contact Card */}
      <div className="mt-10 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white text-center">
        <h3 className="font-bold text-xl mb-2">{t("whatsapp")}</h3>
        <p className="text-white/80 mb-4">સેવા માટે WhatsApp પર સંપર્ક કરો</p>
        <a href="https://wa.me/917874785814" target="_blank" rel="noreferrer">
          <Button
            className="bg-white text-green-700 hover:bg-green-50 font-bold"
            data-ocid="services.whatsapp.button"
          >
            WhatsApp: 7874785814
          </Button>
        </a>
      </div>
    </div>
  );
}
