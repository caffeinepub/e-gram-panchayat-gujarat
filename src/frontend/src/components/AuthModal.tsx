import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultMode?: "login" | "register";
}

// Gujarat Districts and their Talukas
const GUJARAT_DATA: Record<string, Record<string, string[]>> = {
  Banaskantha: {
    Dhanera: [
      "Moti Dugdol",
      "Dhanera",
      "Galasar",
      "Hadad",
      "Raval",
      "Sami",
      "Shankheshwar",
    ],
    Palanpur: [
      "Palanpur",
      "Ambaji",
      "Danta",
      "Deesa",
      "Deodar",
      "Kankrej",
      "Lakhani",
      "Radhanpur",
      "Santalpur",
      "Tharad",
      "Vadgam",
      "Vav",
    ],
    Amirgadh: ["Amirgadh", "Bhabhar", "Chitrasani", "Khimana", "Morva"],
    Danta: ["Danta", "Ambaji", "Juna Deesa"],
  },
  Ahmedabad: {
    "Ahmedabad City": ["Ahmedabad", "Narol", "Vatva", "Odhav"],
    Daskroi: ["Sanand", "Bavla", "Dholka", "Dhandhuka"],
    "Detroj-Rampura": ["Detroj", "Rampura"],
  },
  Surat: {
    "Surat City": ["Surat", "Bardoli", "Kamrej", "Olpad"],
    Chorasi: ["Chorasi", "Palsana", "Mangrol"],
  },
  Vadodara: {
    "Vadodara City": ["Vadodara", "Karjan", "Padra"],
    Savli: ["Savli", "Shinor", "Waghodia"],
  },
  Rajkot: {
    "Rajkot City": ["Rajkot", "Gondal", "Jetpur", "Upleta"],
    Lodhika: ["Lodhika", "Jasdan", "Paddhari"],
  },
  Gandhinagar: {
    Gandhinagar: ["Gandhinagar", "Mansa", "Kalol", "Dehgam"],
  },
  Mehsana: {
    Mehsana: [
      "Mehsana",
      "Unjha",
      "Vijapur",
      "Kheralu",
      "Satlasana",
      "Visnagar",
      "Becharaji",
      "Kadi",
    ],
  },
  Patan: {
    Patan: ["Patan", "Chanasma", "Harij", "Radhanpur", "Santalpur", "Sidhpur"],
  },
  Sabarkantha: {
    Himmatnagar: [
      "Himmatnagar",
      "Idar",
      "Modasa",
      "Prantij",
      "Talod",
      "Vadali",
      "Khedbrahma",
      "Bayad",
    ],
  },
  Kutch: {
    Bhuj: [
      "Bhuj",
      "Anjar",
      "Bhachau",
      "Gandhidham",
      "Mandvi",
      "Mundra",
      "Nakhatrana",
      "Rapar",
    ],
  },
};

const TRIAL_BENEFITS = [
  "બધા 35+ ફોર્મ ભરવાની સવલત (All 35+ forms)",
  "PDF ડાઉનલોડ મફત (Free PDF download)",
  "સરકારી યોજના ની માહિતી (Scheme information)",
  "ગ્રામ પંચાયત સેવાઓ મળવી (GP services access)",
];

export default function AuthModal({
  open,
  onClose,
  defaultMode = "login",
}: Props) {
  const { t } = useLanguage();
  const { login, isLoggingIn, isLoginSuccess } = useInternetIdentity();
  const [tab, setTab] = useState<string>(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [regData, setRegData] = useState({
    fullName: "",
    district: "",
    taluka: "",
    gramPanchayat: "",
    mobile: "",
    email: "",
    userId: "",
    password: "",
  });

  const handleLogin = () => {
    login();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !regData.fullName ||
      !regData.district ||
      !regData.taluka ||
      !regData.gramPanchayat
    ) {
      toast.error("કૃપા કરી નામ, ગ્રામ પંચાયત, તાલુકો અને જિલ્લો ભરો");
      return;
    }
    if (!regData.mobile || regData.mobile.length < 10) {
      toast.error("કૃપા કરી સાચો મોબાઈલ નંબર ભરો");
      return;
    }
    if (!regData.email || !regData.email.includes("@")) {
      toast.error("કૃપા કરી સાચો Email ID ભરો");
      return;
    }
    if (!regData.userId || regData.userId.length < 4) {
      toast.error("User ID ઓછામાં ઓછો 4 અક્ષરનો હોવો જોઈએ");
      return;
    }
    if (!regData.password || regData.password.length < 6) {
      toast.error("Password ઓછામાં ઓછો 6 અક્ષરનો હોવો જોઈએ");
      return;
    }
    // Proceed with Internet Identity login (which handles actual auth)
    login();
  };

  if (isLoginSuccess && open) {
    toast.success("Successfully logged in!");
    onClose();
  }

  const availableTalukas = regData.district
    ? Object.keys(GUJARAT_DATA[regData.district] || {})
    : [];
  const availableGPs =
    regData.district && regData.taluka
      ? GUJARAT_DATA[regData.district]?.[regData.taluka] || []
      : [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md max-h-[90vh] overflow-y-auto"
        data-ocid="auth.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-secondary font-bold">
            e GRAM PANCHAYAT GUJARAT
          </DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login" data-ocid="auth.login.tab">
              {t("login")}
            </TabsTrigger>
            <TabsTrigger value="register" data-ocid="auth.register.tab">
              {t("register")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="pt-4">
            <div className="text-center space-y-4">
              <div className="bg-brand-cream rounded-lg p-4 text-sm text-muted-foreground">
                ગ્રામ પંચાયત સેવા માટે Login કરો. Internet Identity ખાતું વાપરીને
                સુરક્ષિત રીતે Login કરો.
              </div>
              <Button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="w-full bg-primary hover:bg-brand-orange-dark text-white"
                size="lg"
                data-ocid="auth.login.submit_button"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Connecting...
                  </>
                ) : (
                  <>Login / Internet Identity</>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="pt-4">
            <div className="space-y-4">
              {/* 30-day free trial banner */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-green-700 mb-1">
                  30 દિવસ મફત Trial
                </div>
                <div className="text-xs text-green-600">
                  નોંધણી કરો અને 30 દિવસ માટે બધી સવલત મફત
                </div>
              </div>

              <ul className="space-y-1">
                {TRIAL_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <form onSubmit={handleRegister} className="space-y-3">
                {/* Full Name */}
                <div>
                  <Label className="text-xs font-semibold">
                    પૂરું નામ (Full Name) *
                  </Label>
                  <Input
                    placeholder="તમારું પૂરું નામ લખો"
                    value={regData.fullName}
                    onChange={(e) =>
                      setRegData({ ...regData, fullName: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>

                {/* District */}
                <div>
                  <Label className="text-xs font-semibold">
                    જિલ્લો (District) *
                  </Label>
                  <select
                    value={regData.district}
                    onChange={(e) =>
                      setRegData({
                        ...regData,
                        district: e.target.value,
                        taluka: "",
                        gramPanchayat: "",
                      })
                    }
                    required
                    className="w-full mt-1 border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">-- જિલ્લો પસંદ કરો --</option>
                    {Object.keys(GUJARAT_DATA).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Taluka */}
                <div>
                  <Label className="text-xs font-semibold">
                    તાલુકો (Taluka) *
                  </Label>
                  <select
                    value={regData.taluka}
                    onChange={(e) =>
                      setRegData({
                        ...regData,
                        taluka: e.target.value,
                        gramPanchayat: "",
                      })
                    }
                    required
                    disabled={!regData.district}
                    className="w-full mt-1 border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  >
                    <option value="">-- તાલુકો પસંદ કરો --</option>
                    {availableTalukas.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gram Panchayat */}
                <div>
                  <Label className="text-xs font-semibold">
                    ગ્રામ પંચાયત (Gram Panchayat) *
                  </Label>
                  <select
                    value={regData.gramPanchayat}
                    onChange={(e) =>
                      setRegData({ ...regData, gramPanchayat: e.target.value })
                    }
                    required
                    disabled={!regData.taluka}
                    className="w-full mt-1 border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  >
                    <option value="">-- ગ્રામ પંચાયત પસંદ કરો --</option>
                    {availableGPs.map((gp) => (
                      <option key={gp} value={gp}>
                        {gp}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile */}
                <div>
                  <Label className="text-xs font-semibold">
                    મોબાઈલ નંબર (Mobile) *
                  </Label>
                  <Input
                    type="tel"
                    placeholder="10 અંકનો મોબાઈલ નંબર"
                    value={regData.mobile}
                    onChange={(e) =>
                      setRegData({
                        ...regData,
                        mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    required
                    maxLength={10}
                    className="mt-1"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label className="text-xs font-semibold">Email ID *</Label>
                  <Input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={regData.email}
                    onChange={(e) =>
                      setRegData({ ...regData, email: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>

                {/* User ID */}
                <div>
                  <Label className="text-xs font-semibold">
                    User ID (Username) *
                  </Label>
                  <Input
                    placeholder="તમારો User ID બનાવો (ઓછામાં 4 અક્ષર)"
                    value={regData.userId}
                    onChange={(e) =>
                      setRegData({
                        ...regData,
                        userId: e.target.value.replace(/\s/g, ""),
                      })
                    }
                    required
                    minLength={4}
                    className="mt-1"
                  />
                </div>

                {/* Password */}
                <div>
                  <Label className="text-xs font-semibold">Password *</Label>
                  <div className="relative mt-1">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password બનાવો (ઓછામાં 6 અક્ષર)"
                      value={regData.password}
                      onChange={(e) =>
                        setRegData({ ...regData, password: e.target.value })
                      }
                      required
                      minLength={6}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-primary hover:bg-brand-orange-dark text-white"
                  size="lg"
                  data-ocid="auth.register.submit_button"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Connecting...
                    </>
                  ) : (
                    "નોંધણી કરો / Register"
                  )}
                </Button>
              </form>

              <p className="text-xs text-center text-muted-foreground">
                30 દિવસ બાદ Premium પ્લાન જરૂરી રહેશે.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
