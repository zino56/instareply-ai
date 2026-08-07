import Logo3, { type Logo3Data } from "../components/logo3";
import Logo4, { type Logo4Data } from "../components/logo4";
import { Logo3_cids, Logo4_cids } from "../_cids";
import { Logo4_styles } from "../_styles";
const Logo3_data: Logo3Data[] = [
    { label: "Google Meet", alt: "Google Meet", imgSrc: "/assets/cloned/svg/5710b095a901.svg" },
    { label: "Shopify", alt: "Shopify", imgSrc: "/assets/cloned/svg/ec0edae60ae3.svg" },
    { label: "Stripe", alt: "Stripe", imgSrc: "/assets/cloned/svg/31a41c9267ed.svg" },
    { label: "Chargily", alt: "Chargily", imgSrc: "/assets/cloned/svg/ed0a3b9596b7.svg" },
    { label: "SlickPay", alt: "SlickPay", imgSrc: "/assets/cloned/images/13103d1d5fc9.webp" },
    { label: "Yalidine", alt: "Yalidine", imgSrc: "/assets/cloned/images/6dfba489dabe.png" },
    { label: "OpenRouter", alt: "OpenRouter", imgSrc: "/assets/cloned/svg/66f6641b1242.svg" },
    { label: "Kling", alt: "Kling", imgSrc: "/assets/cloned/images/6fe3113e11a0.png" },
    { label: "Facebook", alt: "Facebook", imgSrc: "/assets/cloned/svg/c15bbac4dc5b.svg" },
    { label: "Messenger", alt: "Messenger", imgSrc: "/assets/cloned/svg/22d4eb08aaa4.svg" },
    { label: "Instagram", alt: "Instagram", imgSrc: "/assets/cloned/svg/37a066279051.svg", kind: "image" },
    { label: "TikTok", alt: "TikTok", imgSrc: "/assets/cloned/svg/c9ccc68c64e2.svg", kind: "image" },
    { label: "WhatsApp", alt: "WhatsApp", imgSrc: "/assets/cloned/svg/f3c2bf5280f8.svg", kind: "image" },
    { label: "Telegram", alt: "Telegram", imgSrc: "/assets/cloned/svg/b99a31f2367d.svg", kind: "image" },
    { label: "Gmail", alt: "Gmail", imgSrc: "/assets/cloned/svg/a9ad56b546ab.svg", kind: "image" },
    { label: "Google Calendar", alt: "Google Calendar", imgSrc: "/assets/cloned/svg/16a81259b8e0.svg", kind: "image" },
    { label: "Google Meet", alt: "Google Meet", imgSrc: "/assets/cloned/svg/5710b095a901.svg", kind: "image" },
    { label: "Shopify", alt: "Shopify", imgSrc: "/assets/cloned/svg/ec0edae60ae3.svg", kind: "image" },
    { label: "Stripe", alt: "Stripe", imgSrc: "/assets/cloned/svg/31a41c9267ed.svg", kind: "image" },
    { label: "Chargily", alt: "Chargily", imgSrc: "/assets/cloned/svg/ed0a3b9596b7.svg", kind: "image" },
    { label: "SlickPay", alt: "SlickPay", imgSrc: "/assets/cloned/images/13103d1d5fc9.webp", kind: "image" },
    { label: "Yalidine", alt: "Yalidine", imgSrc: "/assets/cloned/images/6dfba489dabe.png", kind: "image" },
    { label: "OpenRouter", alt: "OpenRouter", imgSrc: "/assets/cloned/svg/66f6641b1242.svg", kind: "image" },
    { label: "Kling", alt: "Kling", imgSrc: "/assets/cloned/images/6fe3113e11a0.png", kind: "image" },
    { label: "Facebook", alt: "Facebook", imgSrc: "/assets/cloned/svg/c15bbac4dc5b.svg", kind: "image" }
];
const Logo4_data: Logo4Data[] = [
    { label: "Stripe", alt: "Stripe", imgSrc: "/assets/cloned/svg/31a41c9267ed.svg" },
    { label: "Chargily", alt: "Chargily", imgSrc: "/assets/cloned/svg/ed0a3b9596b7.svg" },
    { label: "SlickPay", alt: "SlickPay", imgSrc: "/assets/cloned/images/13103d1d5fc9.webp" },
    { label: "Yalidine", alt: "Yalidine", imgSrc: "/assets/cloned/images/6dfba489dabe.png" },
    { label: "OpenRouter", alt: "OpenRouter", imgSrc: "/assets/cloned/svg/66f6641b1242.svg" },
    { label: "Kling", alt: "Kling", imgSrc: "/assets/cloned/images/6fe3113e11a0.png" },
    { label: "Facebook", alt: "Facebook", imgSrc: "/assets/cloned/svg/c15bbac4dc5b.svg" },
    { label: "Messenger", alt: "Messenger", imgSrc: "/assets/cloned/svg/22d4eb08aaa4.svg" },
    { label: "Instagram", alt: "Instagram", imgSrc: "/assets/cloned/svg/37a066279051.svg" },
    { label: "TikTok", alt: "TikTok", imgSrc: "/assets/cloned/svg/c9ccc68c64e2.svg", kind: "image" },
    { label: "WhatsApp", alt: "WhatsApp", imgSrc: "/assets/cloned/svg/f3c2bf5280f8.svg", kind: "image" },
    { label: "Telegram", alt: "Telegram", imgSrc: "/assets/cloned/svg/b99a31f2367d.svg", kind: "image" },
    { label: "Gmail", alt: "Gmail", imgSrc: "/assets/cloned/svg/a9ad56b546ab.svg", kind: "image" },
    { label: "Google Calendar", alt: "Google Calendar", imgSrc: "/assets/cloned/svg/16a81259b8e0.svg", kind: "image" },
    { label: "Google Meet", alt: "Google Meet", imgSrc: "/assets/cloned/svg/5710b095a901.svg", kind: "image" },
    { label: "Shopify", alt: "Shopify", imgSrc: "/assets/cloned/svg/ec0edae60ae3.svg", kind: "image" },
    { label: "Stripe", alt: "Stripe", imgSrc: "/assets/cloned/svg/31a41c9267ed.svg", kind: "image" },
    { label: "Chargily", alt: "Chargily", imgSrc: "/assets/cloned/svg/ed0a3b9596b7.svg", kind: "image" },
    { label: "SlickPay", alt: "SlickPay", imgSrc: "/assets/cloned/images/13103d1d5fc9.webp", kind: "image" },
    { label: "Yalidine", alt: "Yalidine", imgSrc: "/assets/cloned/images/6dfba489dabe.png", kind: "image" },
    { label: "OpenRouter", alt: "OpenRouter", imgSrc: "/assets/cloned/svg/66f6641b1242.svg", kind: "image" },
    { label: "Kling", alt: "Kling", imgSrc: "/assets/cloned/images/6fe3113e11a0.png", kind: "image" },
    { label: "Facebook", alt: "Facebook", imgSrc: "/assets/cloned/svg/c15bbac4dc5b.svg", kind: "image" },
    { label: "Messenger", alt: "Messenger", imgSrc: "/assets/cloned/svg/22d4eb08aaa4.svg", kind: "image" }
];
/** Logo Cloud section. */
export default function LogoCloudSection2({ logo3Data = Logo3_data, logo4Data = Logo4_data } = {}) {
  return (
    <section className="block py-24 overflow-hidden text-background bg-foreground max-lg:py-14" data-cid="n122" id="integrations">
      <div className="block max-w-300 mx-auto px-8" data-cid="n123">
        <header className="block max-w-160 mb-14 mx-auto text-center" data-cid="n124">
          <h2 className="block [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[3.1875rem] font-bold leading-[3.1875rem] tracking-[-1.28px] text-balance max-lg:text-4xl max-lg:leading-9 max-lg:tracking-[-0.9px] 2xl:text-[3.25rem] 2xl:leading-13 2xl:tracking-[-1.3px]" data-cid="n125" data-component="heading">
            {"Plug AI into your own data & "}
            <span className="block text-accent" data-cid="n126">
              tools
            </span>
          </h2>
          <p className="block max-w-[44rem] my-5 text-clr-5 text-lg leading-[1.8125rem]" data-cid="n127">
            Connect the channels and systems you already run. Automations stay close to the conversations that convert.
          </p>
        </header>
      </div>
      <div className="flex mt-8 py-5 flex-col gap-3" data-cid="n128">
        <div className="block py-2.5 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, var(--clr-0), var(--clr-6) 8%, var(--clr-6) 92%, var(--clr-0))" }} data-cid="n129">
          <div className="w-1032 flex pl-4 gap-4 [animation-name:c-marquee] [animation-duration:70s] [animation-timing-function:linear] [animation-iteration-count:infinite] max-md:w-816 max-md:pl-3 max-md:gap-3" data-cid="n130">
            <span className="w-17.5 h-17.5 border border-solid border-border flex p-4 rounded-xl justify-center items-center bg-surface max-md:w-14 max-md:h-14 max-md:p-3" data-cid="n131" title="Google Calendar" />
            {logo3Data.map((d, i) => <Logo3 key={i} d={d} cids={Logo3_cids[i]} />)}
          </div>
        </div>
        <div className="block py-2.5 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, var(--clr-0), var(--clr-6) 8%, var(--clr-6) 92%, var(--clr-0))" }} data-cid="n182">
          <div className="w-1032 flex pl-4 gap-4 [animation-name:c-marquee] [animation-duration:85s] [animation-timing-function:linear] [animation-iteration-count:infinite] [animation-direction:reverse] max-md:w-816 max-md:pl-3 max-md:gap-3" data-cid="n183">
            {logo4Data.map((d, i) => <Logo4 key={i} d={d} cids={Logo4_cids[i]} styles={Logo4_styles[i]} />)}
          </div>
        </div>
      </div>
      <div className="block max-w-300 mx-auto px-8" data-cid="n232">
        <div className="flex mt-14 flex-col items-center gap-3 text-center" data-cid="n233">
          <a className="w-[10.8125rem] h-12 border border-solid border-background flex px-6.5 rounded-[999px] justify-center items-center gap-2 text-foreground font-semibold leading-4 tracking-[-0.08px] whitespace-nowrap text-nowrap bg-background cursor-pointer hover:bg-color-003 hover:border-color-003 hover:text-background hover:outline-background hover:[text-decoration-color:var(--background)]" data-cid="n234" data-component="button" href="https://app.zamili.ai/join">
            Start 7-day trial
          </a>
        </div>
      </div>
    </section>
  );
}
