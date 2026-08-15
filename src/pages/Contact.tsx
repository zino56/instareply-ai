import LegalPage from "@/app/sections/legal-page";

export default function Contact() {
  return (
    <LegalPage
      title="Contact us"
      intro="Questions about Conveero, pricing, or setup? We usually reply within one business day."
      sections={[
        {
          heading: "Support",
          body: "Email support@conveero.ai and include your account email so we can find your workspace quickly.",
        },
        {
          heading: "Sales",
          body: "Email sales@conveero.ai if you need a higher AI reply allowance, multiple accounts, or a custom rollout.",
        },
        {
          heading: "Partnerships",
          body: "Email hello@conveero.ai for agency, reseller, and integration partnerships.",
        },
      ]}
    />
  );
}
