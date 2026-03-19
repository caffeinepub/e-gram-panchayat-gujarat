import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultMode?: "login" | "register";
}

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

  const handleLogin = () => {
    login();
  };

  if (isLoginSuccess && open) {
    toast.success("Successfully logged in!");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-ocid="auth.dialog">
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
                ગ્રામ પંચાયત સેવા માટે લ಺ગિન કરો. Internet Identity ખાતું વાપરીને
                સુરક્ષિત રીતે લ಺ગિન કરો.
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
                  <>લ಺ગિન / Login with Internet Identity</>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="pt-4">
            <div className="space-y-4">
              {/* 30-day free trial banner */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-700 mb-1">
                  30 દિવસ મફત Trial
                </div>
                <div className="text-sm text-green-600">
                  નોંધણી કરો અને 30 દિવસ માટે બધી સવલત મફત મળવો
                </div>
              </div>

              <ul className="space-y-2">
                {TRIAL_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleLogin}
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
                  "નોંધણી કરો / Register with Internet Identity"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                30 દિવસ બાદ Premium પ્લાન બધી સવલત ૧મા રાખવા માટે જરૂરી રહેશે.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
