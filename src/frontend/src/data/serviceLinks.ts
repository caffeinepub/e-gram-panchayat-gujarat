export interface SeedServiceLink {
  name: string;
  url: string;
  description: string;
  category: string;
  icon: string;
}

export const GOVT_LINKS: SeedServiceLink[] = [
  {
    name: "Digital Gujarat",
    url: "https://digitalgujarat.gov.in",
    description: "500+ government services online",
    category: "Gujarat Govt",
    icon: "\ud83c\udfd1",
  },
  {
    name: "e-Dhara (Land Records)",
    url: "https://anyror.gujarat.gov.in",
    description: "Land records, 7/12, 8-A extract",
    category: "Revenue",
    icon: "\ud83d\udcdc",
  },
  {
    name: "Revenue Department Gujarat",
    url: "https://revenue.gujarat.gov.in",
    description: "Revenue department services",
    category: "Revenue",
    icon: "\ud83c\udfe2",
  },
  {
    name: "eSevak Gujarat",
    url: "https://seva.gujarat.gov.in",
    description: "Integrated service delivery",
    category: "Gujarat Govt",
    icon: "\u26a1",
  },
  {
    name: "Gujarat State Portal",
    url: "https://gujaratindia.gov.in",
    description: "State government portal",
    category: "Gujarat Govt",
    icon: "\ud83c\udf10",
  },
  {
    name: "NREGA Gujarat",
    url: "https://nrega.nic.in",
    description: "MGNREGA job card and wages",
    category: "Central Govt",
    icon: "\ud83d\udc77",
  },
  {
    name: "PM Awas Yojana (Gramin)",
    url: "https://pmayg.nic.in",
    description: "Rural housing scheme - PMAY-G",
    category: "Central Govt",
    icon: "\ud83c\udfe0",
  },
  {
    name: "Aadhaar Services - UIDAI",
    url: "https://myaadhaar.uidai.gov.in",
    description: "Aadhaar update, download, verify",
    category: "Central Govt",
    icon: "\ud83e\udeb9",
  },
  {
    name: "PAN Card - NSDL",
    url: "https://www.onlineservices.nsdl.com",
    description: "PAN card apply and download",
    category: "Central Govt",
    icon: "\ud83d\udcb3",
  },
  {
    name: "Voter Registration (ECI)",
    url: "https://voters.eci.gov.in",
    description: "Voter ID and election services",
    category: "Election",
    icon: "\ud83d\uddf3\ufe0f",
  },
  {
    name: "DigiLocker",
    url: "https://digilocker.gov.in",
    description: "Digital documents wallet",
    category: "Central Govt",
    icon: "\ud83d\udcf1",
  },
  {
    name: "e-Gram Swaraj",
    url: "https://egramswaraj.gov.in",
    description: "Panchayat accounting system",
    category: "Panchayat",
    icon: "\ud83c\udfe8",
  },
  {
    name: "e-Shram Portal",
    url: "https://eshram.gov.in",
    description: "Unorganized sector worker registration",
    category: "Central Govt",
    icon: "\ud83d\udee0\ufe0f",
  },
  {
    name: "PM Kisan (Farmer Benefits)",
    url: "https://pmkisan.gov.in",
    description: "PM Kisan Samman Nidhi - Rs.6000/year",
    category: "Central Govt",
    icon: "\ud83c\udf3e",
  },
  {
    name: "Ayushman Bharat",
    url: "https://beneficiary.nha.gov.in",
    description: "Health insurance - Rs.5 lakh coverage",
    category: "Central Govt",
    icon: "\ud83c\udfe5",
  },
];

export const QUICK_LINKS: SeedServiceLink[] = [
  {
    name: "Aadhaar Update",
    url: "https://myaadhaar.uidai.gov.in",
    description: "Update Aadhaar details online",
    category: "Quick",
    icon: "\ud83e\udeb9",
  },
  {
    name: "PAN Card Apply",
    url: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
    description: "Apply for new PAN card",
    category: "Quick",
    icon: "\ud83d\udcb3",
  },
  {
    name: "e-Shram Card",
    url: "https://eshram.gov.in",
    description: "Register as unorganized worker",
    category: "Quick",
    icon: "\ud83d\udc77",
  },
  {
    name: "PM Kisan Registration",
    url: "https://pmkisan.gov.in",
    description: "PM Kisan Samman Nidhi apply",
    category: "Quick",
    icon: "\ud83c\udf3e",
  },
  {
    name: "Ayushman Card",
    url: "https://beneficiary.nha.gov.in",
    description: "Apply for Ayushman Bharat card",
    category: "Quick",
    icon: "\ud83c\udfe5",
  },
  {
    name: "Ration Card KYC",
    url: "https://nfsa.gov.in",
    description: "Ration card KYC update",
    category: "Quick",
    icon: "\ud83c\udfea",
  },
];
