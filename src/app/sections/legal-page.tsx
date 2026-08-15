import "../globals.css";
import Navbar from "./navbar";
import Footer from "./footer";

type Section = { heading: string; body: string };

export default function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <div className="conveero-page min-h-screen block">
      <Navbar />
      <main className="block py-20 max-lg:py-12">
        <div className="max-w-300 mx-auto px-8">
          <div className="max-w-160">
            <h1 className="[font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[3.1875rem] font-bold leading-[3.1875rem] tracking-[-1.28px] text-balance max-lg:text-4xl max-lg:leading-9 max-lg:tracking-[-0.9px]">
              {title}
            </h1>
            <p className="mt-5 text-primary text-lg leading-[1.8125rem]">{intro}</p>
          </div>

          <div className="mt-12 max-w-160 space-y-10">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="[font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[1.375rem] font-bold leading-6.5 tracking-[-0.22px]">
                  {s.heading}
                </h2>
                <p className="mt-3 text-primary leading-[1.75rem]">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
