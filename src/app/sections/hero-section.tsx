import Icon3 from "../svgs/svg-icon3";
import ListRow2, { type ListRow2Data } from "../components/list-row2";
import Logo from "../components/logo";
import Tile, { type TileData } from "../components/tile";
import { ListRow2_cids, Logo_cids, Tile_cids } from "../_cids";
import { ListRow2_styles, Logo_styles } from "../_styles";
import { logos as logosContent } from "../content";
const ListRow2_data: ListRow2Data[] = [
    { text: "5,000+", text2: "Active users" },
    { text: "20+", text2: "Integrations" },
    { text: "4x", text2: "Conversion uplift" },
    { text: "<2s", text2: "Avg. reply time" }
];
const Tile_data: TileData[] = [
    { text: "CV.USERS", text2: "5,012", text3: "+12.4%" },
    { text: "CV.MSGS", text2: "152,340", text3: "+8.2%" },
    { text: "IG.DM", text2: "48,210", text3: "+6.1%" },
    { text: "WA.FLOWS", text2: "9,842", text3: "+4.7%" },
    { text: "FB.COMMENTS", text2: "31,566", text3: "+5.3%" },
    { text: "TG.BOTS", text2: "1,204", text3: "+2.9%" },
    { text: "TRUSTPILOT", text2: "4.1 / 5", text3: "4.1" },
    { text: "CV.USERS", text2: "5,012", text3: "+12.4%" },
    { text: "CV.MSGS", text2: "152,340", text3: "+8.2%" },
    { text: "IG.DM", text2: "48,210", text3: "+6.1%" }
];
/** Hero section — the page's lead block. */
export default function HeroSection({ listRow2Data = ListRow2_data, logos = logosContent, tileData = Tile_data } = {}) {
  return (
    <div className="block pt-3 px-3" data-cid="n30">
      <section className="h-[773.5px] min-h-176 flex relative isolate pt-[4.8rem] px-8 rounded-[20px] flex-col justify-center items-center overflow-hidden text-background text-center bg-clr-1 [background-size:cover,_cover] [background-position:50%_50%,_50%_50%] [background-repeat:no-repeat,_no-repeat] [background-clip:border-box,_border-box] [background-origin:padding-box,_padding-box] [background-attachment:scroll,_scroll] [background-blend-mode:normal,_normal] [-webkit-background-clip:border-box,_border-box] max-md:h-[62.9375rem] max-md:min-h-179 max-lg:pt-14 md:max-lg:h-232 md:max-lg:min-h-232 2xl:h-246 2xl:min-h-246 2xl:pt-24" style={{ backgroundImage: "linear-gradient(var(--clr-2), var(--clr-3)), url(\"/assets/cloned/images/da46cec9ccba.png\")" }} data-cid="n31" id="hero">
        <div className="flex relative z-1 pb-26 flex-col items-center" data-cid="n32">
          <p className="flex max-w-[80.975rem] mb-8 items-center gap-[0.65rem] text-color-004 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[2rem] font-extrabold leading-[3.1875rem] tracking-[-0.96px] max-lg:max-w-[61.475rem] max-lg:text-2xl max-lg:leading-[2.375rem] max-lg:tracking-[-0.72px]" data-cid="n33">
            <img className="w-auto h-10 block [mix-blend-mode:screen] max-w-full overflow-clip object-contain aspect-[auto_40/40] [filter:grayscale(1)_brightness(2.4)_contrast(1.2)]" data-cid="n34" data-component="image" alt="" height="40" src="/assets/cloned/images/73dc1da22b19.png" width="40" />
            <span className="block" data-cid="n35">
              Conveero
            </span>
          </p>
          <h1 className="block max-w-[52.875rem] mb-5 text-color-004 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[4.8125rem] font-extrabold leading-[4.4375rem] tracking-[-2.3px] text-balance mx-auto max-md:max-w-[508.5px] max-md:text-[2.75rem] max-md:leading-[2.5625rem] max-md:tracking-[-1.32px] md:max-lg:max-w-[33.175rem] md:max-lg:text-[2.875rem] md:max-lg:leading-[2.625rem] md:max-lg:tracking-[-1.38px] 2xl:max-w-[59.5rem] 2xl:text-[5.5rem] 2xl:leading-[5.0625rem] 2xl:tracking-[-2.64px]" data-cid="n36" data-component="heading">
            {"Make the most out of every "}
            <mark className="inline px-3.5 rounded-sm text-foreground bg-color-010 max-md:px-2 md:max-lg:px-[8.3px] 2xl:px-4" data-cid="n37">
              conversation
            </mark>
            .
          </h1>
          <p className="block opacity-92 max-w-[590.5px] mb-5 mx-auto text-color-004 text-lg leading-[1.8125rem]" data-cid="n38">
            Sell more, engage better, and grow your audience. AI-powered automation that turns Instagram messages into revenue.
          </p>
          <div className="flex mt-8 flex-wrap justify-center gap-3" data-cid="n39">
            <a className="h-12 border border-solid border-foreground flex px-6.5 rounded-[999px] justify-center items-center gap-2 text-foreground font-semibold leading-4 tracking-[-0.08px] whitespace-nowrap text-nowrap bg-[rgb(255,241,0)] border-[rgb(255,241,0)] cursor-pointer hover:bg-[rgb(255,214,0)] hover:border-[rgb(255,214,0)] hover:text-foreground" data-cid="n40" data-component="button" href="/signup">
              Get started free
              <Icon3 cid={"n41"} />
            </a>
            <a className="w-[9.1875rem] h-12 border border-solid border-surface-2 flex px-6.5 rounded-[999px] justify-center items-center gap-2 text-color-004 font-semibold leading-4 tracking-[-0.08px] whitespace-nowrap text-nowrap cursor-pointer hover:bg-color-004 hover:border-color-004 hover:text-foreground hover:outline-foreground hover:[text-decoration-color:var(--foreground)] focus:bg-clr-25" data-cid="n42" data-component="button" href="#product">
              See how it works
            </a>
          </div>
          <ul className="flex mt-8 flex-wrap justify-center items-stretch gap-y-5 gap-x-14 [list-style-type:none] list-outside" data-cid="n43" aria-label="Trusted by operators worldwide">
            {listRow2Data.map((d, i) => <ListRow2 key={i} d={d} cids={ListRow2_cids[i]} styles={ListRow2_styles[i]} />)}
          </ul>
          <div className="flex mt-8 justify-center items-center" data-cid="n56" aria-label="Trusted by operators worldwide">
            {logos.map((d, i) => <Logo key={i} d={d} cids={Logo_cids[i]} styles={Logo_styles[i]} />)}
            <span className="block opacity-90 ml-3 text-color-004 text-sm font-semibold leading-[1.375rem]" data-cid="n65">
              Trusted by operators worldwide
            </span>
          </div>
        </div>
        <div className="w-314 h-[2.8rem] block absolute bottom-0 left-0 z-2 min-w-0 py-3 overflow-hidden bg-foreground max-md:w-[21.9375rem] md:max-lg:w-186 2xl:w-474" data-cid="n66" aria-hidden="true">
          <div className="w-[187.2375rem] h-[1.3rem] flex gap-14 [animation-name:hero-ticker] [animation-duration:40s] [animation-timing-function:linear] [animation-iteration-count:infinite]" data-cid="n67">
            {tileData.map((d, i) => <Tile key={i} d={d} cids={Tile_cids[i]} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
