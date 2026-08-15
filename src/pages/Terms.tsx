import LegalPage from "@/app/sections/legal-page";

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms cover your use of Conveero. By creating an account, you agree to them. Last updated: 2026."
      sections={[
        {
          heading: "Your account",
          body: "You are responsible for the accounts you connect, the content you upload, and keeping your login credentials secure.",
        },
        {
          heading: "Acceptable use",
          body: "Do not use Conveero to send spam, unlawful content, or messages that violate the policies of the messaging platforms you connect.",
        },
        {
          heading: "Plans and billing",
          body: "Paid plans include a monthly AI reply allowance. You can change or cancel your plan at any time; changes apply from the next billing period.",
        },
        {
          heading: "Availability",
          body: "We work to keep Conveero available and reliable, but the service is provided as is. We may update features to improve the product.",
        },
      ]}
    />
  );
}
