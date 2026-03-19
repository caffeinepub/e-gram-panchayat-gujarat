import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  ChevronRight,
  FileText,
  Globe,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { SEED_POSTS } from "../data/blog";
import { SEED_SCHEMES } from "../data/schemes";

const POPULAR_SERVICES = [
  {
    icon: FileText,
    titleGu: "જન્મ-મૃત્યુ નોંધણી",
    titleEn: "Birth/Death Registration",
    path: "/forms",
  },
  {
    icon: Building2,
    titleGu: "મિલકત વેરો",
    titleEn: "Property Tax",
    path: "/forms",
  },
  {
    icon: Star,
    titleGu: "યોજનાઓ માટે અરજી",
    titleEn: "Apply for Schemes",
    path: "/schemes",
  },
  {
    icon: Shield,
    titleGu: "પ્રમાણપત્ર સેવાઓ",
    titleEn: "Certificate Services",
    path: "/forms",
  },
];

const OBJECTIVES = [
  { icon: Globe, title: "Digital India", descGu: "ગ્રામ પંચાયતમાં ડિજિટલ ઇન્ડિયા" },
  { icon: Zap, title: "Efficiency", descGu: "ખેડૂતો માટે ઝડપી સેવા" },
  { icon: Shield, title: "Transparency", descGu: "પારદર્શિ શાસન" },
];

export default function Home() {
  const { t, language } = useLanguage();

  const latestPosts = SEED_POSTS.filter(
    (p) => p.language === language || language === "en",
  ).slice(0, 3);
  const displayPosts =
    latestPosts.length > 0 ? latestPosts : SEED_POSTS.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[420px] sm:min-h-[520px] overflow-hidden">
        <img
          src="/assets/generated/hero-village.dim_1400x600.jpg"
          alt="Gujarat Village"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <div className="text-white/80 text-sm uppercase tracking-widest mb-2">
              ગુજરાત સરકાર | Government of Gujarat
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white uppercase leading-tight">
              {t("heroTitle")}
            </h1>
            <div className="text-xl sm:text-2xl text-white/90 font-semibold mt-2">
              {t("heroSubtitle")}
            </div>
            <p className="text-white/80 mt-3 text-base">{t("heroDesc")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/forms">
                <Button
                  size="lg"
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold uppercase tracking-wide"
                  data-ocid="hero.explore.primary_button"
                >
                  {t("exploreServices")}{" "}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/20"
                  data-ocid="hero.contact.secondary_button"
                >
                  સંપર્ક કરો
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl font-bold uppercase text-secondary mb-8 tracking-wide">
            {t("popularServices")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_SERVICES.map((svc, i) => (
              <motion.div
                key={svc.titleEn}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className="shadow-card hover:shadow-md transition-shadow text-center"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-4">
                      <svc.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-secondary mb-1">
                      {svc.titleGu}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {svc.titleEn}
                    </p>
                    <Link to={svc.path}>
                      <Button
                        size="sm"
                        className="bg-accent text-white hover:bg-brand-blue w-full"
                        data-ocid={`services.${i + 1}.button`}
                      >
                        જુઓ / View
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="bg-brand-cream py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-xl font-bold uppercase text-secondary mb-6">
            {t("ourObjectives")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {OBJECTIVES.map((obj) => (
              <div key={obj.title} className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <obj.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-secondary">{obj.title}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {obj.descGu}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Govt Schemes */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold uppercase text-secondary">
              {t("govtSchemes")}
            </h2>
            <Link to="/schemes">
              <Button
                variant="outline"
                size="sm"
                data-ocid="schemes.viewall.button"
              >
                {t("viewAll")} <ChevronRight className="ml-1 w-3 h-3" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SEED_SCHEMES.slice(0, 4).map((scheme, i) => (
              <div
                key={scheme.id}
                className="relative rounded-xl overflow-hidden shadow-card group"
                data-ocid={`schemes.item.${i + 1}`}
              >
                <img
                  src={scheme.image}
                  alt={scheme.titleEn}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className={`scheme-overlay-${scheme.color} absolute inset-0 flex flex-col justify-end p-4`}
                >
                  <span className="text-xs text-white/80 font-semibold uppercase">
                    {scheme.category}
                  </span>
                  <h3 className="text-white font-bold text-sm leading-tight">
                    {scheme.titleEn}
                  </h3>
                  <Link to="/schemes">
                    <Button
                      size="sm"
                      className="mt-2 bg-white/20 hover:bg-white/30 text-white text-xs border border-white/30 w-full"
                    >
                      {t("learnMore")}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog + Gallery Two Column */}
      <section className="bg-brand-cream py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blog */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold uppercase text-secondary">
                {t("blogNotices")}
              </h2>
              <Link to="/blog">
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="blog.viewall.button"
                >
                  {t("viewAll")}
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {displayPosts.map((post, i) => (
                <Link key={post.id} to="/blog">
                  <Card
                    className="hover:shadow-md transition-shadow"
                    data-ocid={`blog.item.${i + 1}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                        <div>
                          <h3 className="font-semibold text-secondary text-sm leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {post.excerpt}
                          </p>
                          <span className="text-xs text-primary mt-1 block">
                            {post.date}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Gallery Preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold uppercase text-secondary">
                {t("photoGallery")}
              </h2>
              <Link to="/gallery">
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="gallery.viewall.button"
                >
                  {t("viewAll")}
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  src: "/assets/generated/scheme-pmay.dim_400x250.jpg",
                  alt: "Scheme 1",
                },
                {
                  src: "/assets/generated/scheme-digital.dim_400x250.jpg",
                  alt: "Scheme 2",
                },
                {
                  src: "/assets/generated/hero-village.dim_1400x600.jpg",
                  alt: "Village",
                },
                {
                  src: "/assets/generated/scheme-pmay.dim_400x250.jpg",
                  alt: "Scheme 3",
                },
              ].map((item, i) => (
                <div
                  key={item.alt}
                  className="relative overflow-hidden rounded-lg shadow-card"
                  data-ocid={`gallery.item.${i + 1}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-28 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QR Payment Section */}
      <section className="bg-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-secondary to-brand-navy-light rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">{t("payViaQR")}</h2>
            <p className="text-white/80 mb-6">સરકારી સેવાઓ માટે UPI થી જમા કરો</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <svg
                  viewBox="0 0 200 200"
                  className="w-36 h-36"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="UPI QR Code"
                >
                  <title>UPI QR Code - 9586712501@ybl</title>
                  <rect width="200" height="200" fill="white" />
                  <rect
                    x="10"
                    y="10"
                    width="70"
                    height="70"
                    fill="none"
                    stroke="black"
                    strokeWidth="4"
                  />
                  <rect x="20" y="20" width="50" height="50" fill="black" />
                  <rect x="30" y="30" width="30" height="30" fill="white" />
                  <rect
                    x="120"
                    y="10"
                    width="70"
                    height="70"
                    fill="none"
                    stroke="black"
                    strokeWidth="4"
                  />
                  <rect x="130" y="20" width="50" height="50" fill="black" />
                  <rect x="140" y="30" width="30" height="30" fill="white" />
                  <rect
                    x="10"
                    y="120"
                    width="70"
                    height="70"
                    fill="none"
                    stroke="black"
                    strokeWidth="4"
                  />
                  <rect x="20" y="130" width="50" height="50" fill="black" />
                  <rect x="30" y="140" width="30" height="30" fill="white" />
                  <rect x="90" y="90" width="20" height="20" fill="black" />
                  <rect x="120" y="90" width="10" height="10" fill="black" />
                  <rect x="140" y="90" width="10" height="10" fill="black" />
                  <rect x="160" y="90" width="10" height="10" fill="black" />
                  <rect x="90" y="120" width="10" height="10" fill="black" />
                  <rect x="90" y="140" width="10" height="10" fill="black" />
                  <rect x="90" y="160" width="10" height="10" fill="black" />
                  <rect x="120" y="120" width="20" height="20" fill="black" />
                  <rect x="150" y="150" width="20" height="20" fill="black" />
                </svg>
                <p className="text-center text-xs text-muted-foreground mt-2 font-medium">
                  UPI: 9586712501@ybl
                </p>
              </div>
              <div className="text-left space-y-2">
                <div className="font-semibold">સ્કૅન કરો અને પેમેન્ટ કરો</div>
                <p className="text-white/70 text-sm">
                  કોઈપણ UPI App થી: PhonePe, Google Pay, Paytm
                </p>
                <div className="bg-white/10 rounded-lg p-3 text-sm">
                  <div>
                    <span className="text-white/70">નામ / Name: </span>CSC
                    Service Dugdol GP
                  </div>
                  <div>
                    <span className="text-white/70">UPI ID: </span>
                    9586712501@ybl
                  </div>
                  <div>
                    <span className="text-white/70">બેન્ક / Bank: </span>
                    Banaskantha Dist. Co-op Bank
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
