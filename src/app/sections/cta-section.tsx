import MediaCard from "../components/media-card";
import { MediaCard_cids } from "../_cids";
import { MediaCard_styles } from "../_styles";
import { mediaCardData as mediaCardDataContent, ctaSectionContent } from "../content";
/** Cta section. */
export default function CtaSection({ mediaCardData = mediaCardDataContent, content = ctaSectionContent } = {}) {
  return (
    <section className="block py-24 max-lg:py-14" data-cid="n321" id="capabilities">
      <div className="block max-w-300 mx-auto px-8" data-cid="n322">
        <div className="block max-w-160 mb-14 mx-auto text-center" data-cid="n323">
          <h2 className="block [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[3.1875rem] font-bold leading-[3.1875rem] tracking-[-1.28px] text-balance max-lg:text-4xl max-lg:leading-9 max-lg:tracking-[-0.9px] 2xl:text-[3.25rem] 2xl:leading-13 2xl:tracking-[-1.3px]" data-cid="n324" data-component="heading">
            {"Built for operators who "}
            <mark className="inline px-[0.575rem] rounded-sm bg-color-010 max-lg:px-[6.5px] 2xl:px-[0.5875rem]" data-cid="n325">
              {content.title}
            </mark>
            {" every day"}
          </h2>
          <p className="block max-w-[44rem] my-5 text-primary text-lg leading-[1.8125rem]" data-cid="n326">
            See the product, not abstract promises.
          </p>
        </div>
        <div className="flex flex-col gap-8" data-cid="n327">
          {mediaCardData.map((d, i) => <MediaCard key={i} d={d} cids={MediaCard_cids[i]} styles={MediaCard_styles[i]} />)}
        </div>
      </div>
    </section>
  );
}
