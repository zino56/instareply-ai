import MediaTile2, { type MediaTile2Data } from "../components/media-tile2";
import { MediaTile2_cids } from "../_cids";
import { MediaTile2_styles } from "../_styles";
const MediaTile2_data: MediaTile2Data[] = [
    { text: "“Zamili is the best AI tool, I use it every day to automate everything in my daily life and the support is great! Highly recommend”", text2: "Y", description: "Yanis Tabellout", description2: "Verified User · France" },
    { text: "“What I loved most is the user experience, it's very easy to use and it helps a lot”", text2: "A", description: "Anis Halfaoui", description2: "Verified User · France" },
    { text: "“Easy to use simple platform with a variety of options and tools, highly recommend for beginners e-commerce/startups, and they have good customer support service. Proud to be an Algerian product!”", text2: "M", description: "Mohamed Chekebkeb", description2: "Verified User · Algeria" }
];
/** Gallery Showcase section. */
export default function GalleryShowcaseSection({ mediaTile2Data = MediaTile2_data } = {}) {
  return (
    <section className="block py-24 text-color-003 bg-accent max-lg:py-14" data-cid="n485" id="testimonials">
      <div className="block max-w-300 mx-auto px-8" data-cid="n486">
        <div className="block max-w-160 mb-14 mx-auto text-center" data-cid="n487">
          <h2 className="block [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[3.1875rem] font-bold leading-[3.1875rem] tracking-[-1.28px] text-balance max-lg:text-4xl max-lg:leading-9 max-lg:tracking-[-0.9px] 2xl:text-[3.25rem] 2xl:leading-13 2xl:tracking-[-1.3px]" data-cid="n488" data-component="heading">
            What our users are saying
          </h2>
          <p className="block opacity-90 max-w-[44rem] my-5 text-background text-lg leading-[1.8125rem]" data-cid="n489">
            {"Reviews on "}
            <a className="inline text-clr-16 font-semibold underline cursor-pointer hover:border-color-001 hover:text-color-001 hover:outline-color-001 hover:[text-decoration-color:var(--color-001)]" data-cid="n490" data-component="link" href="https://www.trustpilot.com/review/zamili.ai" rel="noopener noreferrer" target="_blank">
              Trustpilot
            </a>
            {" · TrustScore 4.1/5"}
          </p>
        </div>
        <div className="grid gap-8 grid-cols-3 max-lg:grid-cols-1" data-cid="n491">
          {mediaTile2Data.map((d, i) => <MediaTile2 key={i} d={d} cids={MediaTile2_cids[i]} styles={MediaTile2_styles[i]} />)}
        </div>
        <div className="flex mt-14 flex-col flex-wrap justify-center items-center gap-3 text-center" data-cid="n531">
          <a className="w-[10.8125rem] h-12 border border-solid border-background flex mx-auto px-6.5 rounded-[999px] justify-center items-center gap-2 text-foreground font-semibold leading-4 tracking-[-0.08px] whitespace-nowrap text-nowrap bg-background cursor-pointer hover:bg-color-003 hover:border-color-003 hover:text-background hover:outline-background hover:[text-decoration-color:var(--background)]" data-cid="n532" data-component="button" href="https://app.zamili.ai/join">
            Start 7-day trial
          </a>
          <a className="w-[284.7px] h-12 border border-solid border-accent flex mx-auto px-6.5 rounded-[999px] justify-center items-center gap-2 text-accent font-semibold leading-4 tracking-[-0.08px] whitespace-nowrap text-nowrap cursor-pointer hover:bg-accent hover:text-background hover:outline-background hover:[text-decoration-color:var(--background)]" data-cid="n533" data-component="button" href="https://www.trustpilot.com/review/zamili.ai" rel="noopener noreferrer" target="_blank">
            Read All Reviews on Trustpilot
          </a>
        </div>
      </div>
    </section>
  );
}
