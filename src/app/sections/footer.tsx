import TextLink2 from "../components/text-link2";
import Icon from "../svgs/svg-icon";
import ListRow3 from "../components/list-row3";
import Tile2, { type Tile2Data } from "../components/tile2";
import { TextLink2_cids, ListRow3_cids, Tile2_cids } from "../_cids";
import { textLink2Data as textLink2DataContent, listRow3Data as listRow3DataContent } from "../content";
const Tile2_data: Tile2Data[] = [
    { description: "Resources", href: "https://www.conveero/documentation", label: "Documentation", href2: "/site#faq", label2: "FAQ", href3: "/site/alternatives", label3: "Competitors & Alternatives", href4: "mailto:support@conveero", label4: "Support", href5: "https://www.conveero/support", label5: "Help Center", href6: "/site#contact", label6: "Contact Us" },
    { description: "Company", href: "/site#product", label: "About Us", href2: "/site#testimonials", label2: "Our Team", href3: "https://www.conveero/#academy", label3: "AIX Academy", href4: "mailto:contact@conveero", label4: "Contact", href5: "tel:+971506071246", label5: "+971 50 607 1246", href6: "https://www.trustpilot.com/review/conveero.com", label6: "Reviews" },
    { description: "Legal", href: "/site/privacy", label: "Privacy Policy", href2: "/site/terms", label2: "Terms of Service", href3: "/site/privacy#cookies", label3: "Cookie Policy", href4: "/site/privacy#gdpr", label4: "GDPR Compliance", href5: "/site/terms#security", label5: "Security", href6: "/site/terms#sla", label6: "SLA" }
];
/** Site footer. */
export default function Footer({ textLink2Data = textLink2DataContent, listRow3Data = listRow3DataContent, tile2Data = Tile2_data } = {}) {
  return (
    <footer className="block py-14 text-background bg-foreground" data-cid="n574" id="contact">
      <div className="block max-w-300 mx-auto px-8" data-cid="n575">
        <div className="grid items-start gap-8 grid-cols-[274.906px_183.266px_183.281px_183.266px_183.266px] max-md:grid-cols-1 md:max-lg:grid-cols-2" data-cid="n576">
          <div className="block max-w-72" data-cid="n577">
            <a className="h-8 inline-flex items-center gap-2 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-xl font-extrabold leading-8 cursor-pointer hover:border-color-010 hover:text-color-010 hover:outline-color-010 hover:[text-decoration-color:var(--color-010)]" data-cid="n578" data-component="link" href="/site">
              <img className="w-7 h-7 block max-w-full rounded-lg overflow-clip object-contain aspect-[auto_28/28]" data-cid="n579" data-component="image" alt="" height="28" src="/assets/cloned/images/73dc1da22b19.png" width="28" />
              Conveero
            </a>
            <p className="block max-w-[34.225rem] my-5 text-color-011 text-sm leading-[1.375rem]" data-cid="n580">
              Your AI companion for business automation and growth. Powered by AIX Training Academy.
            </p>
            <div className="flex flex-wrap gap-3 text-sm leading-[1.375rem]" data-cid="n581">
              {textLink2Data.map((d, i) => <TextLink2 key={i} d={d} cids={TextLink2_cids[i]} />)}
            </div>
            <div className="block mt-4" data-cid="n587">
              <div className="inline-flex relative" data-cid="n588">
                <button className="h-[33.7px] border border-solid border-color-007 flex py-[0.35rem] px-[0.55rem] rounded-[999px] items-center gap-[0.35rem] text-foreground text-[0.8125rem] font-semibold leading-[1.3125rem] tracking-[0.26px] text-center bg-surface-4 cursor-pointer hover:border-clr-20" data-cid="n589" data-component="button" aria-expanded="false" aria-haspopup="listbox" aria-label="Choose language" type="button">
                  <span className="block" data-cid="n590">
                    EN
                  </span>
                  <span className="block opacity-85 font-medium" data-cid="n591">
                    English
                  </span>
                  <Icon cid={"n592"} />
                </button>
              </div>
            </div>
          </div>
          <div className="block" data-cid="n593">
            <p className="block max-w-[30.675rem] mb-5 text-accent text-xs font-semibold leading-[1.1875rem] tracking-[1.68px] uppercase" data-cid="n594">
              Product
            </p>
            <ul className="flex flex-col gap-3 [list-style-type:none] list-outside" data-cid="n595">
              {listRow3Data.map((d, i) => <ListRow3 key={i} d={d} cids={ListRow3_cids[i]} />)}
            </ul>
          </div>
          {tile2Data.map((d, i) => <Tile2 key={i} d={d} cids={Tile2_cids[i]} />)}
        </div>
        <div className="w-full max-w-128 border-t border-solid border-t-border block mt-14 pt-8" data-cid="n655">
          <p className="w-full max-w-[30.675rem] block mb-5 text-accent text-xs font-semibold leading-[1.1875rem] tracking-[1.68px] uppercase" data-cid="n656">
            Stay Updated
          </p>
          <p className="block max-w-[34.225rem] mb-5 text-color-011 text-sm leading-[1.375rem]" data-cid="n657">
            Get the latest updates, tips, and exclusive offers delivered to your inbox.
          </p>
          <form className="flex flex-wrap gap-3" data-cid="n658">
            <input className="w-98.5 h-13 border border-solid border-primary block min-w-0 py-3.5 px-5.5 rounded-[999px] grow basis-[192px] overflow-clip text-foreground leading-[1.375rem] bg-color-003 cursor-text max-md:w-[12.0625rem] focus:border-accent focus:shadow-[var(--color-010)_0px_0px_0px_2px]" data-cid="n659" data-component="input" aria-label="Enter your email" placeholder="Enter your email" type="email" />
            <button className="h-9 border border-solid border-background flex px-4.5 rounded-[999px] justify-center items-center gap-2 text-foreground text-sm font-semibold leading-3.5 tracking-[-0.07px] text-center whitespace-nowrap text-nowrap bg-background cursor-pointer hover:bg-color-003 hover:border-color-003 hover:text-background hover:outline-background hover:[text-decoration-color:var(--background)] focus:outline-foreground focus:[text-decoration-color:var(--foreground)]" data-cid="n660" data-component="button" type="submit">
              Subscribe
            </button>
          </form>
          <p className="block max-w-[34.225rem] mt-5 text-sm leading-[1.375rem]" data-cid="n661">
            <a className="inline text-accent font-semibold cursor-pointer hover:border-color-010 hover:text-color-010 hover:outline-color-010 hover:[text-decoration-color:var(--color-010)] hover:underline" data-cid="n662" data-component="link" href="/signup">
              Start your 7-day trial
            </a>
          </p>
        </div>
        <div className="border-t border-solid border-t-border flex mt-14 pt-8 flex-wrap justify-between items-start gap-5" data-cid="n663">
          <div className="flex flex-col gap-3" data-cid="n664">
            <p className="block opacity-75 max-w-[34.225rem] text-sm leading-[1.375rem]" data-cid="n665">
              © 2026 Conveero.ai. All rights reserved. Powered by AIX Training Academy.
            </p>
            <p className="block max-w-[500.7px] text-clr-17 text-[0.8125rem] leading-[1.3125rem]" data-cid="n666">
              Address: Dubai, Damac Hills, Jasmin B, Office 505, UAE
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 max-lg:items-start" data-cid="n667">
            <a className="h-10 border border-solid border-color-012 flex py-2 px-4 rounded-lg items-center gap-2 text-sm font-semibold leading-[1.375rem] bg-clr-18 cursor-pointer hover:bg-clr-23 hover:text-color-010 hover:outline-color-010 hover:[text-decoration-color:var(--color-010)]" data-cid="n668" data-component="button" href="https://www.trustpilot.com/review/conveero.com" rel="noopener noreferrer" target="_blank">
              Trustpilot 4.1/5
            </a>
            <div className="flex flex-wrap justify-end items-center gap-3 text-sm leading-[1.375rem] max-lg:justify-start" data-cid="n669">
              <a className="block cursor-pointer hover:border-accent hover:text-accent hover:outline-accent hover:[text-decoration-color:var(--accent)] hover:underline" data-cid="n670" data-component="link" href="/site/privacy">
                Privacy
              </a>
              <span className="block" data-cid="n671" aria-hidden="true">
                ·
              </span>
              <a className="block cursor-pointer hover:border-accent hover:text-accent hover:outline-accent hover:[text-decoration-color:var(--accent)] hover:underline" data-cid="n672" data-component="link" href="/site/terms">
                Terms
              </a>
              <span className="block" data-cid="n673" aria-hidden="true">
                ·
              </span>
              <a className="block cursor-pointer hover:border-accent hover:text-accent hover:outline-accent hover:[text-decoration-color:var(--accent)] hover:underline" data-cid="n674" data-component="link" href="/site/alternatives">
                Alternatives
              </a>
              <span className="block" data-cid="n675" aria-hidden="true">
                ·
              </span>
              <a className="block cursor-pointer hover:border-accent hover:text-accent hover:outline-accent hover:[text-decoration-color:var(--accent)] hover:underline" data-cid="n676" data-component="link" href="/site/sitemap">
                Sitemap
              </a>
              <span className="block" data-cid="n677" aria-hidden="true">
                ·
              </span>
              <a className="block cursor-pointer hover:border-accent hover:text-accent hover:outline-accent hover:[text-decoration-color:var(--accent)] hover:underline" data-cid="n678" data-component="link" href="/site/sitemap.xml">
                XML
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
