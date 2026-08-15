import LegalPage from "@/app/sections/legal-page";

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This page explains what data Conveero collects, why we collect it, and how you stay in control. Last updated: 2026."
      sections={[
        {
          heading: "Data we collect",
          body: "Account details you provide (name, email), the messaging accounts you connect, and the content needed to generate replies — such as conversations, product catalogs, and documents you upload.",
        },
        {
          heading: "How we use it",
          body: "We use your data only to operate the service: generating replies, showing analytics, and supporting your account. We do not sell your data.",
        },
        {
          heading: "Retention and deletion",
          body: "You can delete uploaded documents and products at any time. When you close your account, we remove your workspace data within a reasonable period.",
        },
        {
          heading: "Contact",
          body: "For privacy requests, email privacy@conveero.ai.",
        },
      ]}
    />
  );
}
