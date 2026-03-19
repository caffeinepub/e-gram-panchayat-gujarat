export interface SeedPost {
  id: number;
  title: string;
  content: string;
  date: string;
  language: "gu" | "hi" | "en";
  excerpt: string;
}

export const SEED_POSTS: SeedPost[] = [
  {
    id: 1,
    title: "ડિજિટલ ગ્રામ પંચાયત - ઓનલાઇન સેવા",
    excerpt: "હવે ઘર બ ​ ​ ​ ​ ​ ​ ​. BPL, ​ ​ ​, ​ ​ ​ ​, ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​.",
    content:
      "હ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​. ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​. ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​. ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​. e ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​.",
    date: "2026-03-15",
    language: "gu",
  },
  {
    id: 2,
    title: "NREGA Job Card ​ ​ ​ ​",
    excerpt: "NREGA ​ ​ ​ ​ ​ ​. ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​.",
    content:
      "NREGA ​ ​ ​ ​ ​ ​ ​ ​. ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​. ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​. ​ ​ ​: 1) ​ ​ ​ 2) ​ 3) ​ ​ ​ 4) ​ ​.",
    date: "2026-03-10",
    language: "gu",
  },
  {
    id: 3,
    title: "PM Awas Yojana - ​ ​ ​ ​ ​",
    excerpt: "PM ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​.",
    content:
      "PM Awas Yojana ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​. ​ ​ ​ 1.20 ​ ​ ​ ​ ​ ​ ​ ​ ​. ​ ​ ​: ​ ​, BPL ​, ​ ​, ​ ​.",
    date: "2026-03-05",
    language: "gu",
  },
  {
    id: 4,
    title: "डिजिटल ग्राम पंचायत - ऑनलाइन सेवाएं",
    excerpt:
      "अब घर बैठे ग्राम पंचायत की सभी सेवाएं प्राप्त करें। BPL, राशन कार्ड, जन्म-मृत्यु सर्टिफिकेट ऑनलाइन।",
    content:
      "हमारे e Gram Panchayat पोर्टल के माध्यम से सभी ग्राम पंचायत सेवाएं ऑनलाइन उपलब्ध हैं। आप घर बैठे फॉर्म भर सकते हैं और PDF डाउनलोड कर सकते हैं।",
    date: "2026-03-14",
    language: "hi",
  },
  {
    id: 5,
    title: "Digital Gram Panchayat - Online Services Launched",
    excerpt:
      "All gram panchayat services are now available online. Fill forms, download PDFs, and pay fees digitally.",
    content:
      "We are proud to launch the e Gram Panchayat Gujarat Online Service Centre for Moti Dugdol, Ta. Dhanera. Citizens can now access 30+ government forms, download certificates, and apply for government schemes from the comfort of their homes.",
    date: "2026-03-12",
    language: "en",
  },
  {
    id: 6,
    title: "Ayushman Bharat - Health Coverage for All",
    excerpt:
      "Get free health coverage up to Rs. 5 lakh per year under Ayushman Bharat PMJAY scheme.",
    content:
      "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PMJAY) provides health cover of Rs. 5 lakh per family per year. Visit our office or apply online to check your eligibility and get your Ayushman card.",
    date: "2026-03-08",
    language: "en",
  },
];
