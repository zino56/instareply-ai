// Semantic page content extracted from recognized recipe sections.

export type ListRowDataItem = {
  href: string;
  label: string;
};
export const listRowData: ListRowDataItem[] = [
    { href: "#product", label: "Product" },
    { href: "#create", label: "Create" },
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
    { title: "Open Inbox across channels", description: "Instagram, Messenger, WhatsApp, Telegram, and email in one thread view. Assign, reply, and keep context without tab hopping.", label: "Try Open Inbox", alt: "Zamili open inbox across social channels", imgSrc: "/assets/cloned/images/bec30c7817bc.png" },
    { title: "Workflows that run on real events", description: "Trigger on comments, DMs, and form events. Branch, delay, and hand off to humans when the conversation needs a person.", label: "Start a workflow", alt: "Zamili workflow canvas", imgSrc: "/assets/cloned/images/323cff3bb6a9.png" },
    { title: "Publish and measure in the same place", description: "Schedule posts, watch performance, and feed winning creatives back into your automations.", label: "Publish smarter", alt: "Zamili analytics dashboard", imgSrc: "/assets/cloned/images/84ca3162f02f.png" }
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
    { variant: "starter", title: "Starter", description: "10,000 Zamili tokens / month", price: "$9", label: "Start 7-day trial", stat: "10,000", description2: "For growing businesses", description3: "10,000 Zamili tokens / month" },
    { variant: "pro", title: "Pro", description: "50,000 Zamili tokens / month", price: "$29.99", label: "Start 7-day trial", stat: "50,000", description2: "For professionals", description3: "50,000 Zamili tokens / month" },
    { variant: "enterprise", title: "Enterprise", description: "Unlimited store products & orders", price: "$140", label: "Start 7-day trial", stat: "200,000", description2: "For large organizations", description3: "200,000 Zamili tokens / month" }
];

export type MediaTile3DataItem = {
  label: string;
};
export const mediaTile3Data: MediaTile3DataItem[] = [
    { label: "Do I need to code to build automations?" },
    { label: "Is there a free trial?" },
    { label: "Can my team share one workspace?" },
    { label: "How do tokens work on paid plans?" }
];

export type TextLink2DataItem = {
  href: string;
  label: string;
};
export const textLink2Data: TextLink2DataItem[] = [
    { href: "https://www.instagram.com/zamili.ai", label: "Instagram" },
    { href: "https://www.facebook.com/zamili.ai", label: "Facebook" },
    { href: "https://www.youtube.com/@guidategadato", label: "YouTube" },
    { href: "https://www.linkedin.com/company/zamili-ai", label: "LinkedIn" },
    { href: "https://twitter.com/zamili_ai", label: "Twitter" }
];

export type ListRow3DataItem = {
  href: string;
  label: string;
};
export const listRow3Data: ListRow3DataItem[] = [
    { href: "/site#product", label: "Features" },
    { href: "/site#pricing", label: "Pricing" },
    { href: "https://app.zamili.ai/workflows", label: "Workflows" },
    { href: "https://app.zamili.ai/workflows", label: "Automation" },
    { href: "https://app.zamili.ai/analytics", label: "Analytics" },
    { href: "https://app.zamili.ai/posts", label: "Post Management" },
    { href: "https://app.zamili.ai/inbox", label: "Inbox" }
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

