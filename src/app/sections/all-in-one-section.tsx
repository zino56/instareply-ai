import MediaTile, { type MediaTileData } from "../components/media-tile";
import TextLink, { type TextLinkData } from "../components/text-link";
import { MediaTile_cids, TextLink_cids } from "../_cids";
import { MediaTile_styles, TextLink_styles } from "../_styles";
const MediaTile_data: MediaTileData[] = [
    { imgSrc: "/assets/cloned/images/715637bc8af9.jpg", text: "Cosmetics" },
    { imgSrc: "/assets/cloned/images/67720947beb7.jpg", text: "Real estate" },
    { imgSrc: "/assets/cloned/images/6d6b327d52ba.jpg", text: "Influencer" },
    { imgSrc: "/assets/cloned/images/715637bc8af9.jpg", text: "Beauty UGC" },
    { imgSrc: "/assets/cloned/images/67720947beb7.jpg", text: "Listing UGC" },
    { imgSrc: "/assets/cloned/images/6d6b327d52ba.jpg", text: "Creator UGC" },
    { imgSrc: "/assets/cloned/images/715637bc8af9.jpg", text: "Skincare" },
    { imgSrc: "/assets/cloned/images/67720947beb7.jpg", text: "Home tour" }
];
const TextLink_data: TextLinkData[] = [
    { ariaselected: "true", label: "Posts", style: { backgroundImage: "linear-gradient(90deg, var(--accent), var(--clr-12) 28%, var(--clr-13) 55%, var(--clr-14) 78%, var(--clr-15))" } },
    { ariaselected: "false", label: "Stories" },
    { ariaselected: "false", label: "Reels" },
    { ariaselected: "false", label: "Ads" }
];
/** All In One section. */
export default function AllInOneSection({ mediaTileData = MediaTile_data, textLinkData = TextLink_data } = {}) {
  return (
    <section className="block py-24 overflow-x-clip max-lg:py-14" data-cid="n269" id="create">
      <div className="block max-w-300 mx-auto px-8" data-cid="n270">
        <div className="block max-w-160 mb-14 mx-auto text-center" data-cid="n271">
          <h2 className="block [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[3.1875rem] font-bold leading-[3.1875rem] tracking-[-1.28px] text-balance max-lg:text-4xl max-lg:leading-9 max-lg:tracking-[-0.9px] 2xl:text-[3.25rem] 2xl:leading-13 2xl:tracking-[-1.3px]" data-cid="n272" data-component="heading">
            {"The all-in-one "}
            <mark className="inline px-[0.575rem] rounded-sm bg-color-010 max-lg:px-[6.5px] 2xl:px-[0.5875rem]" data-cid="n273">
              {"create & publish"}
            </mark>
            {" studio"}
          </h2>
          <p className="block max-w-[44rem] my-5 text-primary text-lg leading-[1.8125rem]" data-cid="n274">
            <em className="inline text-foreground italic" data-cid="n275">
              Skip the tools, templates, and tabs.
            </em>
            {" Generate photos and videos in Conveero, then post them directly to Instagram, Facebook, and TikTok — posts, Stories, Reels, and ads covered."}
          </p>
        </div>
      </div>
      <div className="flex relative justify-center items-center" data-cid="n276">
        <div className="w-full h-full flex relative max-w-314 justify-center items-center max-md:max-w-[21.9375rem] md:max-lg:max-w-186 2xl:max-w-474" data-cid="n277">
          <div className="w-0 h-0 block relative [animation-name:create-ring-spin] [animation-duration:18s] [animation-timing-function:linear] [animation-iteration-count:infinite]" data-cid="n278" aria-hidden="true">
            {mediaTileData.map((d, i) => <MediaTile key={i} d={d} cids={MediaTile_cids[i]} styles={MediaTile_styles[i]} />)}
          </div>
        </div>
      </div>
      <div className="block max-w-300 mx-auto px-8" data-cid="n303">
        <div className="flex max-w-[min(1000px,_100%)] mt-8 mx-17 justify-center items-start gap-5 max-lg:gap-[0.65rem] max-lg:mx-0" data-cid="n304" aria-label="Creative formats" role="tablist">
          {textLinkData.map((d, i) => <TextLink key={i} d={d} cids={TextLink_cids[i]} styles={TextLink_styles[i]} />)}
        </div>
        <p className="block max-w-144 mt-5 mx-auto text-primary text-center" data-cid="n317">
          Square 1:1 UGC feed posts for cosmetics, real estate, and creators.
        </p>
        <div className="flex mt-14 flex-col items-center gap-5 text-center" data-cid="n318">
          <p className="w-full max-w-128 block text-primary" data-cid="n319">
            Built for cosmetics, real estate, creators — and every brand in between.
          </p>
          <a className="w-[216.3px] h-12 border border-solid border-foreground flex px-6.5 rounded-[999px] justify-center items-center gap-2 text-background font-semibold leading-4 tracking-[-0.08px] whitespace-nowrap text-nowrap bg-foreground cursor-pointer hover:bg-color-001 hover:border-color-001" data-cid="n320" data-component="button" href="/signup">
            Create your first post
          </a>
        </div>
      </div>
    </section>
  );
}
