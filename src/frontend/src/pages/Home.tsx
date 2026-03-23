import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Shield,
  Star,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SEED_FORMS } from "../data/forms";

const BANNER_SLIDES = [
  {
    id: "home",
    title: "ઘરે બેઠા ભરો સરકારી ફોર્મ",
    subtitle: "Fill Government Forms From Home — Fast & Easy",
    bg: "from-secondary/90 to-brand-navy/70",
  },
  {
    id: "forms",
    title: "35+ ગ્રામ પંચાયત ફોર્મ",
    subtitle: "All Gram Panchayat forms in one place",
    bg: "from-primary/80 to-brand-orange-dark/60",
  },
  {
    id: "pdf",
    title: "PDF ડાઉનલોડ — ક્ષણ ભર માં",
    subtitle: "Instant PDF download after filling your form",
    bg: "from-brand-navy/90 to-accent/70",
  },
];

const FORM_TABS = [
  { key: "all", label: "All" },
  { key: "panchayat", label: "પંચાયત" },
  { key: "income", label: "અન્ય અરજી" },
  { key: "nrega", label: "જનસેવા" },
  { key: "revenue", label: "જમીન" },
  { key: "bpl", label: "ગ્રા.પં. દાખલા" },
  { key: "marriage", label: "લગ્ન રજીસ્ટ્રેશન" },
  { key: "rationCard", label: "પુરવઠા" },
  { key: "construction", label: "DILR" },
  { key: "birthDeath", label: "સોગંધનામુ" },
];

const ABOUT_BULLETS = [
  {
    id: "trusted",
    icon: Shield,
    text: "Your Trusted Partner: Simplifying every step of Gujarat's official paperwork",
  },
  {
    id: "platform",
    icon: FileText,
    text: "All-in-One Platform: Access, complete, and download forms instantly",
  },
  {
    id: "secure",
    icon: CheckCircle,
    text: "Safe & Secure: Your data is protected and never stored beyond your device",
  },
  {
    id: "library",
    icon: Zap,
    text: "Comprehensive Library: From certificates to affidavits, find all forms here",
  },
  {
    id: "designed",
    icon: Star,
    text: "Designed for You: Built to make paperwork effortless for every citizen",
  },
];

const PROCESS_STEPS = [
  {
    id: "register",
    num: "01",
    icon: UserCheck,
    title: "Register or Login",
    desc: "Create your account or log in securely to access all services",
  },
  {
    id: "fill",
    num: "02",
    icon: FileText,
    title: "Select & Fill Your Form",
    desc: "Browse forms by category and fill in your details easily",
  },
  {
    id: "download",
    num: "03",
    icon: Download,
    title: "Submit & Download PDF Instantly",
    desc: "Get a print-ready PDF in seconds — no waiting",
  },
];

const TESTIMONIALS = [
  {
    id: "t1",
    name: "સહર્ષ પંચાલ",
    text: "તમારું ઓનલાઈન પોર્ટલ ખૂબ જ ઉપયોગી છે. ઘરે બેઠા ફોર્મ ભરી PDF ડાઉનલોડ કરી શક્યો. ખૂબ ઝડપી સેવા!",
    stars: 5,
  },
  {
    id: "t2",
    name: "હાર્દિક પટેલ",
    text: "ગ્રામ પંચાયત ના ફોર્મ્સ ઉપયોગથી ખૂબ સમય બચ્યો. ઓફિસ ના ચક્કર ઘટ્યા. ખૂબ સારી website!",
    stars: 5,
  },
  {
    id: "t3",
    name: "દિયા મેહતા",
    text: "આ વેબસાઇટ ખૂબ જ સરળ અને સ્પષ્ટ છે. ગુજરાતીમાં બધું સ્પષ્ટ છે. ખૂબ ઉત્તમ સેવા!",
    stars: 5,
  },
  {
    id: "t4",
    name: "ઓમ સુથાર",
    text: "e GRAM PANCHAYAT GUJARAT ખરેખર ખૂબ ઉપયોગી Platform છે. BPL, Income certificate — બધું ઓનલાઇન!",
    stars: 5,
  },
];

const STATS = [
  { id: "total", label: "Total Forms Generated", value: 0, icon: FileText },
  { id: "users", label: "Verified Registered Users", value: 0, icon: Users },
  { id: "active", label: "Active Forms", value: 35, icon: CheckCircle },
  { id: "pro", label: "Pro Users", value: 0, icon: Star },
];

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || target === 0) {
      setCount(target);
      return;
    }
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);
  return count;
}

function StatCard({
  stat,
  active,
}: { stat: (typeof STATS)[0]; active: boolean }) {
  const count = useCountUp(stat.value, active);
  return (
    <div className="text-center text-white">
      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
        <stat.icon className="w-7 h-7" />
      </div>
      <div className="text-4xl font-bold">{count.toLocaleString()}</div>
      <div className="text-white/80 text-sm mt-1">{stat.label}</div>
    </div>
  );
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Auto-rotate banner
  useEffect(() => {
    const t = setInterval(
      () => setSlide((s) => (s + 1) % BANNER_SLIDES.length),
      4000,
    );
    return () => clearInterval(t);
  }, []);

  // Stats intersection observer
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsActive(true);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filteredForms =
    activeTab === "all"
      ? SEED_FORMS
      : SEED_FORMS.filter((f) => f.category === activeTab);

  return (
    <div>
      {/* Section A — Verification Widget Banner */}
      <section className="bg-secondary text-white py-3 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
          <span className="font-bold text-brand-orange text-base">
            ✔ તમારી માહિતી ચકાસો
          </span>
          <span className="text-white/80">ફેરફાર કરો ✔ ઠીક છે, ડાઉનલોડ કરો</span>
        </div>
      </section>

      {/* Section B — Hero Banner with slides */}
      <section className="relative min-h-[420px] sm:min-h-[520px] overflow-hidden">
        <img
          src="/assets/generated/hero-village.dim_1400x600.jpg"
          alt="Gujarat Village"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={BANNER_SLIDES[slide].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`absolute inset-0 bg-gradient-to-r ${BANNER_SLIDES[slide].bg}`}
          />
        </AnimatePresence>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${BANNER_SLIDES[slide].id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <div className="text-white/80 text-sm uppercase tracking-widest mb-2">
                ગુજરાત સરકાર | Government of Gujarat
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white uppercase leading-tight">
                {BANNER_SLIDES[slide].title}
              </h1>
              <div className="text-lg sm:text-xl text-white/90 font-semibold mt-2">
                {BANNER_SLIDES[slide].subtitle}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/forms">
                  <Button
                    size="lg"
                    className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold uppercase tracking-wide"
                    data-ocid="hero.explore.primary_button"
                  >
                    ફોર્મ જુઓ <ChevronRight className="ml-1 w-4 h-4" />
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
          </AnimatePresence>
        </div>
        {/* Slide controls */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
          {BANNER_SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSlide(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === slide ? "bg-white w-6" : "bg-white/50 w-2.5"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setSlide(
              (s) => (s - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length,
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => setSlide((s) => (s + 1) % BANNER_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* Section C — Our Forms */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary">
              Fill Faster. Work Smarter.
            </h2>
            <p className="text-muted-foreground mt-2">
              35+ Gram Panchayat Forms — Online, Free, & Instant PDF
            </p>
          </div>
          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {FORM_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                data-ocid={`forms.${tab.key}.tab`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  activeTab === tab.key
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-secondary border-border hover:border-primary hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Form cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredForms.slice(0, 12).map((form, i) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                data-ocid={`forms.item.${i + 1}`}
              >
                <Card className="h-full hover:shadow-md transition-shadow border-border">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="w-10 h-10 bg-brand-cream rounded-lg flex items-center justify-center mb-3">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-secondary text-sm leading-snug mb-1">
                      {form.titleGu}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 flex-1">
                      {form.descEn}
                    </p>
                    <Link to="/forms">
                      <Button
                        size="sm"
                        className="bg-primary text-white hover:bg-brand-orange-dark w-full text-xs"
                        data-ocid={`forms.${i + 1}.button`}
                      >
                        ફોર્મ ભરો / Fill Form
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          {filteredForms.length > 12 && (
            <div className="text-center mt-6">
              <Link to="/forms">
                <Button variant="outline" data-ocid="forms.viewall.button">
                  બધા ફોર્મ જુઓ ({filteredForms.length}){" "}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Section D — Stats */}
      <section ref={statsRef} className="stats-bg py-14 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} active={statsActive} />
          ))}
        </div>
      </section>

      {/* Section E — About Us */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/assets/generated/hero-village.dim_1400x600.jpg"
              alt="About e GRAM PANCHAYAT GUJARAT"
              className="rounded-2xl shadow-card w-full h-72 object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-brand-cream text-primary mb-3">About Us</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary leading-snug mb-4">
              Making Government Paperwork Simple, Fast, and Accessible
            </h2>
            <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
              Welcome to <strong>e GRAM PANCHAYAT GUJARAT</strong> — your
              trusted digital gateway for all official Gram Panchayat forms and
              government services in Moti Dugdol, Ta. Dhanera, Dist.
              Banaskantha.
            </p>
            <ul className="space-y-3">
              {ABOUT_BULLETS.map((b) => (
                <li key={b.id} className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <b.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{b.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Section F — Process */}
      <section className="bg-brand-cream py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
              Simple | Secure | Trusted
            </h2>
            <p className="text-primary font-semibold mt-1">
              That's How e GRAM PANCHAYAT GUJARAT Works.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto shadow-md">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {step.num}
                  </div>
                </div>
                <h3 className="font-bold text-secondary mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section G — Testimonials */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
              Hear from our happy customers
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <Card className="h-full shadow-card">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: testimonial.stars }, (_, si) => (
                        <Star
                          key={`star-${testimonial.id}-${si}`}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">
                          {testimonial.name[0]}
                        </span>
                      </div>
                      <span className="font-semibold text-secondary text-sm">
                        {testimonial.name}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section H — CTA */}
      <section className="cta-bg py-16 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Ready to work together?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Let's discuss your product goals and see how we can help.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-white text-secondary hover:bg-white/90 font-bold uppercase tracking-wider px-10"
                data-ocid="cta.contact.primary_button"
              >
                CONTACT US
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
