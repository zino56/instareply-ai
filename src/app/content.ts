// Semantic page content extracted from recognized recipe sections.

export type ListRowDataItem = {
  href: string;
  label: string;
};
export const listRowData: ListRowDataItem[] = [
    { href: "#product", label: "Product" },
    { href: "#testimonials", label: "Customers" },
    { href: "#integrations", label: "Integrations" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" }
];

export type LogosItem = {
  label: string;
  alt: string;
  imgSrc: string;
};
export const logos: LogosItem[] = [
    { label: "ICT Africa Summit", alt: "ICT Africa Summit", imgSrc: "/assets/cloned/images/bcff7b36a347.png" },
    { label: "Wlad Hooma", alt: "Wlad Hooma", imgSrc: "/assets/cloned/images/4ef6b50c0d23.png" },
    { label: "ONE", alt: "ONE", imgSrc: "/assets/cloned/images/80020b91122c.png" },
    { label: "FormaTech Expo", alt: "FormaTech Expo", imgSrc: "/assets/cloned/images/73f206a02c1b.png" }
];

export type Logos2Item = {
  alt: string;
  imgSrc: string;
};
export const logos2: Logos2Item[] = [
    { alt: "Meta", imgSrc: "/assets/cloned/svg/40930dd1cb5b.svg" },
    { alt: "TikTok Business Partner", imgSrc: "/assets/cloned/svg/a8649324be4f.svg" },
    { alt: "Cloudflare", imgSrc: "/assets/cloned/svg/819ec794ed59.svg" },
    { alt: "Alibaba Cloud", imgSrc: "/assets/cloned/svg/3194f4d64061.svg" }
];

export type MediaCardDataItem = {
  title: string;
  description: string;
  label: string;
  alt: string;
  imgSrc: string;
};
export const mediaCardData: MediaCardDataItem[] = [
    { title: "AI-powered responses", description: "Claude 3.5 understands customer intent and replies intelligently. No more robotic answers, and never a missed DM.", label: "See the AI inbox", alt: "Conveero AI inbox replying to Instagram DMs", imgSrc: "/assets/cloned/images/bec30c7817bc.png" },
    { title: "Zero hallucinations", description: "The AI only recommends products in your catalog. 100% accurate, 100% on-brand, every single reply.", label: "How it stays accurate", alt: "Conveero product catalog grounding", imgSrc: "/assets/cloned/images/323cff3bb6a9.png" },
    { title: "Real-time analytics", description: "Track conversations, conversions, and customer intent with dashboards built for operators, not analysts.", label: "See analytics", alt: "Conveero analytics dashboard", imgSrc: "/assets/cloned/images/84ca3162f02f.png" }
];

export type ProductsItem = {
  variant: string;
  title: string;
  description: string;
  price: string;
  label: string;
  stat: string;
  description2: string;
  description3: string;
};
export const products: ProductsItem[] = [
    { variant: "starter", title: "Starter", description: "Automate the questions you answer every day", price: "$49", label: "Choose Starter", stat: "1", description2: "For solo operators", description3: "1 Instagram account · DM auto-replies · Email support" },
    { variant: "pro", title: "Growth", description: "Handle repetitive DMs at scale with a shared inbox", price: "$99", label: "Choose Growth", stat: "3", description2: "Most popular", description3: "Up to 3 Instagram accounts · Shared inbox · Saved FAQs" },
    { variant: "enterprise", title: "Scale", description: "For teams running high-volume community inboxes", price: "$199", label: "Choose Scale", stat: "10", description2: "For growing teams", description3: "Up to 10 accounts · Priority support · Advanced automation" }
];

export type MediaTile3DataItem = {
  label: string;
};
export const mediaTile3Data: MediaTile3DataItem[] = [
    { label: "Can the AI say wrong things (hallucinate)?" },
    { label: "Do I need coding skills?" },
    { label: "What if a customer asks something outside my catalog?" },
    { label: "What if I need help setting things up?" }
];

export type TextLink2DataItem = {
  href: string;
  label: string;
};
export const textLink2Data: TextLink2DataItem[] = [
    { href: "https://www.instagram.com/conveero", label: "Instagram" },
    { href: "https://www.facebook.com/conveero", label: "Facebook" },
    { href: "https://www.youtube.com/@guidategadato", label: "YouTube" },
    { href: "https://www.linkedin.com/company/conveero", label: "LinkedIn" },
    { href: "https://twitter.com/conveero", label: "Twitter" }
];

export type ListRow3DataItem = {
  href: string;
  label: string;
};
export const listRow3Data: ListRow3DataItem[] = [
    { href: "/site#product", label: "Features" },
    { href: "/site#pricing", label: "Pricing" },
    { href: "/dashboard", label: "Workflows" },
    { href: "/dashboard", label: "Automation" },
    { href: "/dashboard", label: "Analytics" },
    { href: "/dashboard", label: "Post Management" },
    { href: "/dashboard", label: "Inbox" }
];

export type CtaSectionContentAction = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type CtaSectionContent = {
  title?: string;
  actions: CtaSectionContentAction[];
};
export const ctaSectionContent: CtaSectionContent = {
  "title": "ship",
  "actions": []
};

