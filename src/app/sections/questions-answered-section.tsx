import Icon6 from "../svgs/svg-icon6";
import MediaTile3 from "../components/media-tile3";
import { MediaTile3_cids } from "../_cids";
import { MediaTile3_styles } from "../_styles";
import { mediaTile3Data as mediaTile3DataContent } from "../content";
/** Questions Answered section. */
export default function QuestionsAnsweredSection({ mediaTile3Data = mediaTile3DataContent } = {}) {
  return (
    <section className="block py-24 max-lg:py-14" data-cid="n534" id="faq">
      <div className="block max-w-300 mx-auto px-8" data-cid="n535">
        <div className="block max-w-160 mb-14 mx-auto text-center" data-cid="n536">
          <h2 className="block [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[3.1875rem] font-bold leading-[3.1875rem] tracking-[-1.28px] text-balance max-lg:text-4xl max-lg:leading-9 max-lg:tracking-[-0.9px] 2xl:text-[3.25rem] 2xl:leading-13 2xl:tracking-[-1.3px]" data-cid="n537" data-component="heading">
            {"Questions, "}
            <mark className="inline px-[0.575rem] rounded-sm bg-color-010 max-lg:px-[6.5px] 2xl:px-[0.5875rem]" data-cid="n538">
              answered
            </mark>
          </h2>
          <p className="block max-w-[44rem] my-5 text-primary text-lg leading-[1.8125rem]" data-cid="n539">
            Straight answers before you create an account.
          </p>
        </div>
        <div className="border-t border-solid border-t-color-002 border-b border-b-color-002 block mt-8" data-cid="n540">
          <div className="border-b border-solid border-b-color-002 block" data-cid="n541">
            <button className="w-full flex py-5 justify-between items-center gap-5 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[1.375rem] font-bold leading-6.5 tracking-[-0.22px] cursor-pointer" data-cid="n542" data-component="button" aria-expanded="true" type="button">
              <span className="block" data-cid="n543">
                Is this automation safe for my Instagram account?
              </span>
              <Icon6 cid={"n544"} />
            </button>
            <div className="w-full max-w-[39.1125rem] block mb-5 pb-5 text-primary" data-cid="n545">
              Yes. We use Meta's official Graph API, the same one Instagram business tools use, so there is zero account risk. Your account stays safe.
            </div>
          </div>
          {mediaTile3Data.map((d, i) => <MediaTile3 key={i} d={d} cids={MediaTile3_cids[i]} styles={MediaTile3_styles[i]} />)}
        </div>
        <div className="flex mt-14 flex-wrap justify-between items-center gap-5" data-cid="n562">
          <a className="w-[10.8125rem] h-12 border border-solid border-foreground flex px-6.5 rounded-[999px] justify-center items-center gap-2 text-background font-semibold leading-4 tracking-[-0.08px] whitespace-nowrap text-nowrap bg-foreground cursor-pointer hover:bg-color-001 hover:border-color-001" data-cid="n563" data-component="button" href="/signup">
            Start 7-day trial
          </a>
        </div>
      </div>
    </section>
  );
}
