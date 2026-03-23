import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Globe,
  Instagram,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Settings,
  Twitter,
  User,
  X,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { SiFacebook } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";
import AuthModal from "./AuthModal";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact Us", path: "/contact" },
  { label: "Guides", path: "/forms" },
  { label: "Smart-Learning", path: "/schemes" },
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
  const { language, setLanguage } = useLanguage();
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
              <div className="text-secondary font-bold text-base leading-tight">
                e GRAM PANCHAYAT GUJARAT
              </div>
              <div className="text-primary font-semibold text-xs">
                Online Service Centre
              </div>
              <div className="text-muted-foreground text-xs">
                Moti Dugdol, Ta. Dhanera, Dist. Banaskantha
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
                      Admin
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
                  Logout
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
                  Login
                </Button>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-brand-orange-dark"
                  onClick={() => openAuth("register")}
                  data-ocid="nav.register.button"
                >
                  Register
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
                key={item.label}
                to={item.path}
                data-ocid={`nav.${item.label.toLowerCase().replace(/[^a-z0-9]/g, "")}.link`}
                className={`px-5 py-3 text-sm font-semibold tracking-wide transition-colors hover:bg-black/20 ${
                  location.pathname === item.path
                    ? "bg-black/30 border-b-2 border-white"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden py-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-semibold hover:bg-black/20"
                >
                  {item.label}
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

      {/* WhatsApp Channel Banner */}
      <div className="whatsapp-channel-bg py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-white">
            <MessageCircle className="w-8 h-8 text-green-300 shrink-0" />
            <div>
              <div className="font-bold text-lg">Join Our WhatsApp Channel</div>
              <div className="text-white/70 text-sm">
                સૌ પ્રથમ સરકારી અપડેટ, નવા ફોર્મ, અને સેવા સૂચના WhatsApp પર
              </div>
            </div>
          </div>
          <a
            href="https://whatsapp.com/channel/0029VaxXnP33WHTc9kTFQi2O"
            target="_blank"
            rel="noreferrer"
            data-ocid="whatsapp.channel.button"
          >
            <Button className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-full">
              <MessageCircle className="w-4 h-4 mr-2" />
              Join WhatsApp Channel
            </Button>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-bg text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
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
              Moti Dugdol, Ta. Dhanera,
              <br />
              Dist. Banaskantha, Gujarat
            </p>
            <p className="text-white/70 text-sm mt-1">Online Service Centre</p>
            {/* Social Media */}
            <div className="mt-4">
              <p className="text-xs text-white/60 mb-2">Follow Us:</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://whatsapp.com/channel/0029VaxXnP33WHTc9kTFQi2O"
                  target="_blank"
                  rel="noreferrer"
                  title="WhatsApp Channel"
                  className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://www.facebook.com/share/16rsNxQxZM/"
                  target="_blank"
                  rel="noreferrer"
                  title="Facebook"
                  className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <SiFacebook className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/digitalstore1983"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center hover:bg-pink-500 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://twitter.com/motidugdolgp"
                  target="_blank"
                  rel="noreferrer"
                  title="Twitter/X"
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://t.me/egrampanchayat_gujarat"
                  target="_blank"
                  rel="noreferrer"
                  title="Telegram"
                  className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-400 transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://youtube.com/@veritasnews26"
                  target="_blank"
                  rel="noreferrer"
                  title="YouTube"
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <Youtube className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-bold text-brand-orange mb-3 uppercase text-sm">
              Useful Links
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link
                  to="/forms"
                  className="hover:text-brand-orange transition-colors"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-brand-orange transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-brand-orange transition-colors"
                >
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-brand-orange transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand-orange transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand-orange transition-colors"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="font-bold text-brand-orange mb-3 uppercase text-sm">
              Help &amp; Support
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand-orange transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand-orange transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand-orange transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand-orange transition-colors"
                >
                  How to Register
                </Link>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com/Dwy2hkxhlFMKiCmOk3IMSR"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-orange transition-colors"
                >
                  WhatsApp Group
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-brand-orange mb-3 uppercase text-sm">
              Contact Info
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-brand-orange" />
                <span>
                  <a href="tel:7874785814" className="hover:text-brand-orange">
                    7874785814
                  </a>
                  <br />
                  <span className="text-xs text-white/50">(24/7 Support)</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-brand-orange" />
                <a
                  href="mailto:cscservicedugdolgp@gmail.com"
                  className="hover:text-brand-orange break-all"
                >
                  cscservicedugdolgp@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-orange text-base shrink-0">📍</span>
                <span>
                  Moti Dugdol, Ta. Dhanera, Dist. Banaskantha, Gujarat
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-white">
              © e GRAM PANCHAYAT GUJARAT All Rights Reserved
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://whatsapp.com/channel/0029VaxXnP33WHTc9kTFQi2O"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white"
                aria-label="WhatsApp Channel"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/16rsNxQxZM/"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white"
                aria-label="Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/digitalstore1983"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/motidugdolgp"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@veritasnews26"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-white/50">
              Built with ❤️ using{" "}
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
