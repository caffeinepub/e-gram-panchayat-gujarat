import { Card, CardContent } from "@/components/ui/card";
import { Award, FileText, Globe, Shield, Users, Zap } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const FEATURES = [
  {
    icon: FileText,
    title: "30+ Forms",
    desc: "All government forms in one place",
  },
  { icon: Globe, title: "3 Languages", desc: "Gujarati, Hindi & English" },
  { icon: Zap, title: "Instant PDF", desc: "Download certificates instantly" },
  { icon: Shield, title: "Secure", desc: "Internet Identity authentication" },
  {
    icon: Users,
    title: "All Schemes",
    desc: "Central & Gujarat state schemes",
  },
  { icon: Award, title: "Certified", desc: "Government recognized portal" },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold uppercase text-secondary mb-2">
          {t("about")}
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <div>
          <h2 className="text-xl font-bold text-secondary mb-4">
            બંધારણ / Our Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            e GRAM PANCHAYAT GUJARAT - Online Service Centre મોટી દૂગડોળ, તાલુકો
            ધાનેરા, જિલ્લો બનાસકાંઠાના નાગરિકોને સરકારી સેવાઓ ઘરે બેઠા મળે તે માટે શરૂ
            કરવામાં આવ્યું છે.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            આ પોર્ટલ પર ગ્રામ પંચાયત, તાલુકા પંચાયત અને જિલ્લા પંચાયતના 30+ ફોર્મ ઉપલબ્ધ
            છે. BPL, રેશન કાર્ડ, જન્મ-મૃત્યુ નોંધણીથી લઈને NREGA જૉબ કાર્ડ સુધી નાગરિકોને જે
            માહિતી જોઈએ તે અહીં મળશે.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This is a Digital India initiative to bring e-governance to the
            grassroots level, enabling citizens to access government services,
            download certificates, and apply for schemes from their mobile
            phones.
          </p>
        </div>
        <div>
          <img
            src="/assets/generated/hero-village.dim_1400x600.jpg"
            alt="Moti Dugdol Village"
            className="rounded-2xl shadow-card w-full h-64 object-cover"
          />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-brand-cream rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-primary">30+</div>
              <div className="text-sm text-muted-foreground">સરકારી ફોર્મ</div>
            </div>
            <div className="bg-brand-cream rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-secondary">10+</div>
              <div className="text-sm text-muted-foreground">યોજનાઓ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((feat) => (
          <Card key={feat.title} className="shadow-card">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center shrink-0">
                <feat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-bold text-secondary">{feat.title}</div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {feat.desc}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
