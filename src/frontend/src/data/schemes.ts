export interface SeedScheme {
  id: number;
  titleGu: string;
  titleEn: string;
  descEn: string;
  category: string;
  color: "green" | "blue" | "teal" | "red";
  image: string;
  documents: string[];
  applyLink: string;
}

export const SEED_SCHEMES: SeedScheme[] = [
  {
    id: 1,
    titleGu: "PM Awas Yojana (Gramin)",
    titleEn: "PM Awas Yojana (Gramin)",
    descEn:
      "Affordable housing for rural BPL families. Financial assistance to build pucca houses.",
    category: "Central",
    color: "green",
    image: "/assets/generated/scheme-pmay.dim_400x250.jpg",
    documents: [
      "Aadhaar Card",
      "BPL Certificate",
      "Bank Passbook",
      "Land Documents",
      "Passport Photo",
    ],
    applyLink: "https://pmayg.nic.in",
  },
  {
    id: 2,
    titleGu: "Digital Gujarat Portal",
    titleEn: "Digital Gujarat Services",
    descEn:
      "Access 500+ government services online. Apply for certificates, licenses, and welfare schemes.",
    category: "Gujarat",
    color: "blue",
    image: "/assets/generated/scheme-digital.dim_400x250.jpg",
    documents: ["Aadhaar Card", "Mobile Number", "Email ID"],
    applyLink: "https://digitalgujarat.gov.in",
  },
  {
    id: 3,
    titleGu: "NREGA - Mahatma Gandhi NREGS",
    titleEn: "NREGA / MGNREGS",
    descEn:
      "100 days guaranteed rural employment. Apply for job card and get assured wages.",
    category: "Central",
    color: "teal",
    image: "/assets/generated/scheme-pmay.dim_400x250.jpg",
    documents: ["Aadhaar Card", "Photo", "Bank Passbook", "Residence Proof"],
    applyLink: "https://nrega.nic.in",
  },
  {
    id: 4,
    titleGu: "Ayushman Bharat - PMJAY",
    titleEn: "Ayushman Bharat PMJAY",
    descEn:
      "Health insurance of Rs. 5 lakh per family per year for secondary and tertiary hospitalization.",
    category: "Central",
    color: "red",
    image: "/assets/generated/scheme-digital.dim_400x250.jpg",
    documents: [
      "Aadhaar Card",
      "Ration Card",
      "Income Certificate",
      "Passport Photo",
    ],
    applyLink: "https://pmjay.gov.in",
  },
  {
    id: 5,
    titleGu: "Mukhyamantri Amrutum Yojana",
    titleEn: "Mukhyamantri Amrutum Yojana (MA)",
    descEn:
      "Free health coverage for BPL and middle-class families in Gujarat. Medical treatment up to ₹5 lakh.",
    category: "Gujarat",
    color: "green",
    image: "/assets/generated/scheme-pmay.dim_400x250.jpg",
    documents: [
      "Aadhaar Card",
      "BPL Card / Income Certificate",
      "Ration Card",
      "Bank Passbook",
    ],
    applyLink: "https://www.magujarat.com",
  },
  {
    id: 6,
    titleGu: "e-Shram Card Yojana",
    titleEn: "e-Shram Card for Unorganized Workers",
    descEn:
      "National database for unorganised workers. Insurance, pension and welfare schemes.",
    category: "Central",
    color: "blue",
    image: "/assets/generated/scheme-digital.dim_400x250.jpg",
    documents: [
      "Aadhaar Card",
      "Mobile (linked to Aadhaar)",
      "Bank Account Details",
    ],
    applyLink: "https://eshram.gov.in",
  },
  {
    id: 7,
    titleGu: "Kisan Credit Card (KCC)",
    titleEn: "Kisan Credit Card",
    descEn:
      "Easy credit for farmers for agricultural inputs. Loans at subsidized interest rates.",
    category: "Central",
    color: "teal",
    image: "/assets/generated/scheme-pmay.dim_400x250.jpg",
    documents: [
      "Aadhaar Card",
      "Land Documents (7/12)",
      "Bank Passbook",
      "Passport Photo",
    ],
    applyLink: "https://pmkisan.gov.in",
  },
  {
    id: 8,
    titleGu: "PM Kisan Samman Nidhi",
    titleEn: "PM Kisan Samman Nidhi",
    descEn:
      "Direct income support of ₹6000 per year to small and marginal farmers.",
    category: "Central",
    color: "red",
    image: "/assets/generated/scheme-digital.dim_400x250.jpg",
    documents: [
      "Aadhaar Card",
      "Land Documents (7/12)",
      "Bank Account (DBT enabled)",
    ],
    applyLink: "https://pmkisan.gov.in",
  },
];
