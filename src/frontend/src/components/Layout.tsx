import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Globe,
  LogOut,
  Mail,
  Menu,
  Phone,
  Settings,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";
import AuthModal from "./AuthModal";

const NAV_ITEMS = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "services", path: "/services" },
  { key: "schemes", path: "/schemes" },
  { key: "forms", path: "/forms" },
  { key: "gallery", path: "/gallery" },
  { key: "blog", path: "/blog" },
  { key: "contact", path: "/contact" },
] as const;

const NEWS_ITEMS = [
  "📢 નવી સેવા શરૂ - હવે ઘરે બેઠા ઓનલાઇન ફોર્મ ભરો",
  "🎉 PM Awas Yojana માટે અરજી શરૂ - હજુ અરજી કરો",
  "⚠️ NREGA Job Card માટે ગ્રામ પંચાયત કચેરી માં સંપર્ક કરો",
  "📝 રેશન કાર્ડ KYC કરાવવું જરૂરી - છેલ્લી તારીખ: 31 માર્ચ 2026",
  "🏥 Ayushman Bharat કાર્ડ બનાવવા માટે હવે ઓનલાઇન અરજી શક્ય",
  "📜 જમીન ની નકલ (7/12) ઓનલાઇન મળવી - digitalgujarat.gov.in",
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const { language, setLanguage, t } = useLanguage();
  const { identity, clear, isLoginSuccess } = useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();
  const location = useLocation();

  const isLoggedIn = isLoginSuccess || !!identity;

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Utility Bar */}
      <div className="bg-white border-b border-border py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <span className="text-muted-foreground hidden sm:block">
            ગુજરાત સરકાર | Government of Gujarat
          </span>
          <div className="flex items-center gap-4 ml-auto">
            <a
              href="tel:7874785814"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary"
            >
              <Phone className="w-3 h-3" />
              <span>7874785814</span>
            </a>
            <a
              href="mailto:cscservicedugdolgp@gmail.com"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary hidden md:flex"
            >
              <Mail className="w-3 h-3" />
              <span>cscservicedugdolgp@gmail.com</span>
            </a>
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-muted-foreground" />
              {(["gu", "hi", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  data-ocid={`lang_${lang}.toggle`}
                  className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                    language === lang
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {lang === "gu" ? "ગુ" : lang === "hi" ? "हि" : "En"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/assets/generated/gujarat-emblem-transparent.dim_120x120.png"
              alt="Gujarat Emblem"
              className="w-14 h-14 object-contain"
            />
            <div>
              <div className="text-secondary font-semibold text-sm">
                e GRAM PANCHAYAT GUJARAT - Online Service Centre
              </div>
              <div className="text-muted-foreground text-xs">
                Moti Dugdol, Ta. Dhanera, Dist. Banaskantha, Gujarat
              </div>
            </div>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link to="/admin">
                    <Button
                      variant="outline"
                      size="sm"
                      data-ocid="nav.admin.link"
                    >
                      <Settings className="w-3 h-3 mr-1" />
                      {t("admin")}
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clear}
                  data-ocid="nav.logout.button"
                >
                  <LogOut className="w-3 h-3 mr-1" />
                  {t("logout")}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openAuth("login")}
                  data-ocid="nav.login.button"
                >
                  <User className="w-3 h-3 mr-1" />
                  {t("login")}
                </Button>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-brand-orange-dark"
                  onClick={() => openAuth("register")}
                  data-ocid="nav.register.button"
                >
                  {t("register")}
                </Button>
              </div>
            )}
            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              data-ocid="nav.menu.toggle"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="nav-gradient text-white">
        <div className="max-w-7xl mx-auto">
          <div className="hidden md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                data-ocid={`nav.${item.key}.link`}
                className={`px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-black/20 ${
                  location.pathname === item.path
                    ? "bg-black/30 border-b-2 border-white"
                    : ""
                }`}
              >
                {t(item.key as any)}
              </Link>
            ))}
          </div>
          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden py-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-semibold uppercase hover:bg-black/20"
                >
                  {t(item.key as any)}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* News Ticker */}
      <div className="ticker-bg text-white py-1.5 overflow-hidden relative">
        <div className="flex items-center">
          <span className="shrink-0 bg-brand-navy px-3 py-0.5 text-xs font-bold uppercase mr-2">
            LIVE
          </span>
          <div className="overflow-hidden flex-1">
            <p className="ticker-text text-sm">{NEWS_ITEMS.join("  ✦  ")}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="footer-bg text-white mt-8">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/assets/generated/gujarat-emblem-transparent.dim_120x120.png"
                alt="Gujarat Emblem"
                className="w-10 h-10 object-contain"
              />
              <div>
                <div className="font-bold text-brand-orange text-sm">
                  e GRAM PANCHAYAT
                </div>
                <div className="text-xs text-white/80">GUJARAT</div>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              Moti Dugdol, Ta. Dhanera, Dist. Banaskantha, Gujarat
            </p>
            <p className="text-white/70 text-sm mt-1">Online Service Centre</p>
          </div>

          <div>
            <h3 className="font-bold text-brand-orange mb-3 uppercase text-sm">
              Quick Links
            </h3>
            <ul className="space-y-1.5 text-sm text-white/80">
              {NAV_ITEMS.slice(0, 5).map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.path}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {t(item.key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-brand-orange mb-3 uppercase text-sm">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-brand-orange" />
                <span>7874785814</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-brand-orange" />
                <span className="break-all">cscservicedugdolgp@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-orange text-base shrink-0">📍</span>
                <span>
                  Moti Dugdol, Ta. Dhanera, Dist. Banaskantha, Gujarat - 385310
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-brand-orange mb-3 uppercase text-sm">
              Govt Links
            </h3>
            <ul className="space-y-1.5 text-sm text-white/80">
              <li>
                <a
                  href="https://digitalgujarat.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-orange"
                >
                  Digital Gujarat
                </a>
              </li>
              <li>
                <a
                  href="https://anyror.gujarat.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-orange"
                >
                  e-Dhara (Land Records)
                </a>
              </li>
              <li>
                <a
                  href="https://nrega.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-orange"
                >
                  NREGA Portal
                </a>
              </li>
              <li>
                <a
                  href="https://pmayg.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-orange"
                >
                  PM Awas Yojana
                </a>
              </li>
              <li>
                <a
                  href="https://uidai.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-orange"
                >
                  Aadhaar Services
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom py-3 px-4 text-center">
          <p className="text-sm text-white">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-white/80"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/917874785814"
        target="_blank"
        rel="noreferrer"
        data-ocid="whatsapp.button"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        title="WhatsApp Contact"
        aria-label="WhatsApp Contact"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-current"
          role="img"
          aria-label="WhatsApp"
        >
          <title>WhatsApp</title>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultMode={authMode}
      />
    </div>
  );
}
