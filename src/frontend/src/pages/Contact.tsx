import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

const DISTRICTS = [
  "બનાસકાંઠા / Banaskantha",
  "પાટણ / Patan",
  "મેહસાણા / Mehsana",
];
const TALUKAS = ["ધાનેરા / Dhanera", "ડીસா / Disa", "થરાદ / Tharad"];
const VILLAGES = ["મોટી દૂગડોળ / Moti Dugdol", "નાની દૂગડોળ", "૩વારા / Jvara"];

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    district: "",
    taluka: "",
    village: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("સંદેશ મોકલાયો! Message sent!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase text-secondary mb-2">
          {t("contactUs")}
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-5">
          <Card className="shadow-card">
            <CardContent className="p-5 space-y-4">
              <h2 className="font-bold text-secondary text-lg">
                e GRAM PANCHAYAT GUJARAT
              </h2>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium">મોટી દૂગડોળ ગ્રામ પંચાયત</div>
                  <div className="text-sm text-muted-foreground">
                    Moti Dugdol, Ta. Dhanera, Dist. Banaskantha
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Gujarat - 385310
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:7874785814"
                  className="font-medium hover:text-primary"
                >
                  7874785814
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-green-500 shrink-0" />
                <a
                  href="https://wa.me/917874785814"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium hover:text-green-600"
                >
                  WhatsApp: 7874785814
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:cscservicedugdolgp@gmail.com"
                  className="font-medium hover:text-primary break-all"
                >
                  cscservicedugdolgp@gmail.com
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Map Placeholder */}
          <div className="rounded-xl overflow-hidden shadow-card bg-brand-cream h-52 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-2" />
              <p className="font-medium text-secondary">Moti Dugdol, Dhanera</p>
              <p className="text-sm text-muted-foreground">
                Banaskantha, Gujarat
              </p>
              <a
                href="https://maps.google.com/?q=Moti+Dugdol+Dhanera+Banaskantha+Gujarat"
                target="_blank"
                rel="noreferrer"
                className="text-primary text-sm underline mt-1 block"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <h2 className="font-bold text-secondary text-lg mb-5">
              {t("sendMessage")}
            </h2>
            {sent ? (
              <div
                className="text-center py-8"
                data-ocid="contact.success_state"
              >
                <div className="text-5xl mb-3">✅</div>
                <h3 className="font-bold text-secondary">સંદેશ મોકલાયો!</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  We will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>{t("yourName")} *</Label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      data-ocid="contact.name.input"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>{t("yourEmail")}</Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      data-ocid="contact.email.input"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>જિલ્લો / District</Label>
                    <Select
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, district: v }))
                      }
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="contact.district.select"
                      >
                        <SelectValue placeholder="જિલ્લો..." />
                      </SelectTrigger>
                      <SelectContent>
                        {DISTRICTS.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>તાલુકો / Taluka</Label>
                    <Select
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, taluka: v }))
                      }
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="contact.taluka.select"
                      >
                        <SelectValue placeholder="તાલુકો..." />
                      </SelectTrigger>
                      <SelectContent>
                        {TALUKAS.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>ગામ / Village</Label>
                  <Select
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, village: v }))
                    }
                  >
                    <SelectTrigger
                      className="mt-1"
                      data-ocid="contact.village.select"
                    >
                      <SelectValue placeholder="ગામ..." />
                    </SelectTrigger>
                    <SelectContent>
                      {VILLAGES.map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{t("yourMessage")} *</Label>
                  <Textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    data-ocid="contact.message.textarea"
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-white"
                  data-ocid="contact.submit.button"
                >
                  {t("sendMessage")}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
