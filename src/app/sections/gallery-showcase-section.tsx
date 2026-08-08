import MediaTile2, { type MediaTile2Data } from "../components/media-tile2";
import { MediaTile2_cids } from "../_cids";
import { MediaTile2_styles } from "../_styles";
const MediaTile2_data: MediaTile2Data[] = [
    { text: "“Generated $65k in revenue in 3 months. Conveero handles 90% of our customer replies.”", text2: "S", description: "Sarah Chen", description2: "Verified User" },
    { text: "“Before: 50 unanswered DMs per day. After: 100% response rate in under 2 minutes.”", text2: "J", description: "James Rodriguez", description2: "Verified User" },
    { text: "“We were drowning in DMs. Conveero gave us our life back while increasing revenue.”", text2: "M", description: "Michael Park", description2: "Verified User" }
];
/** Gallery Showcase section. */
export default function GalleryShowcaseSection({ mediaTile2Data = MediaTile2_data } = {}) {
  return (
    <section className="block py-24 text-black bg-accent max-lg:py-14" data-cid="n485" id="testimonials">
      <div className="block max-w-300 mx-auto px-8" data-cid="n486">
        <div className="block max-w-160 mb-14 mx-auto text-center" data-cid="n487">
          <h2 className="block [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[3.1875rem] font-bold leading-[3.1875rem] tracking-[-1.28px] text-balance max-lg:text-4xl max-lg:leading-9 max-lg:tracking-[-0.9px] 2xl:text-[3.25rem] 2xl:leading-13 2xl:tracking-[-1.3px]" data-cid="n488" data-component="heading">
            What our users are saying
          </h2>
          <p className="block opacity-90 max-w-[44rem] my-5 text-black text-lg leading-[1.8125rem]" data-cid="n489">
            {"Reviews on "}
            <a className="inline text-black font-semibold underline cursor-pointer hover:text-mc-dark-gray" data-cid="n490" data-component="link" href="https://www.trustpilot.com/review/conveero.com" rel="noopener noreferrer" target="_blank">
              Trustpilot
            </a>
            {" · TrustScore 4.1/5"}
          </p>
        </div>
        <div className="grid gap-8 grid-cols-3 max-lg:grid-cols-1" data-cid="n491">
          {mediaTile2Data.map((d, i) => <MediaTile2 key={i} d={d} cids={MediaTile2_cids[i]} styles={MediaTile2_styles[i]} />)}
        </div>
        <div className="flex mt-14 flex-col flex-wrap justify-center items-center gap-3 text-center" data-cid="n531">
          <a className="w-[10.8125rem] h-12 border border-solid border-black flex mx-auto px-6.5 rounded-[999px] justify-center items-center gap-2 text-white font-semibold leading-4 tracking-[-0.08px] whitespace-nowrap text-nowrap bg-black cursor-pointer hover:bg-mc-dark-gray hover:border-mc-dark-gray transition-colors duration-300" data-cid="n532" data-component="button" href="/signup">
            Get started
          </a>
          <a className="w-[284.7px] h-12 border border-solid border-black flex mx-auto px-6.5 rounded-[999px] justify-center items-center gap-2 text-black font-semibold leading-4 tracking-[-0.08px] whitespace-nowrap text-nowrap cursor-pointer hover:bg-black/5 transition-colors duration-300" data-cid="n533" data-component="button" href="https://www.trustpilot.com/review/conveero.com" rel="noopener noreferrer" target="_blank">
            Read All Reviews on Trustpilot
          </a>
        </div>
      </div>
    </section>
  );
}
