import LegalPage from "@/app/sections/legal-page";

export default function About() {
  return (
    <LegalPage
      title="About Conveero"
      intro="Conveero is an AI agent that handles first-line customer conversations so teams can reply faster and never lose a lead in the inbox."
      sections={[
        {
          heading: "What we do",
          body: "Conveero connects to your Instagram and community inboxes, understands your catalog and documents, and answers the questions your customers ask every day — instantly, in your brand voice.",
        },
        {
          heading: "Why we build it",
          body: "Most conversations are lost to slow replies. We believe every message deserves an answer in seconds, and that small teams should be able to operate like large support organizations.",
        },
        {
          heading: "How we work",
          body: "We ship fast, keep the product simple, and design for people who live in their inbox all day. Your data stays yours, and you stay in control of every automated reply.",
        },
      ]}
    />
  );
}
