import { motion } from "framer-motion";
import type { ProductCardStyles } from "../_styles";
import Icon5 from "../svgs/svg-icon5";
import { cn } from "../../lib/utils";
import { easeOutQuiet } from "../motion";

export type Billing = "monthly" | "yearly";

export type ProductCardData = {
  variant: string;
  title: string;
  description: string;
  price: string;
  monthlyAmount: number;
  label: string;
  stat: string;
  description2: string;
  description3: string;
};
/** A product card. */
export default function ProductCard({ d, cids, styles, billing = "monthly" }: { d: ProductCardData; cids: string[]; styles: ProductCardStyles; billing?: Billing }) {
  const isYearly = billing === "yearly";
  const yearlyPrice = d.monthlyAmount * 10;
  const originalYearly = d.monthlyAmount * 12;
  const savings = d.monthlyAmount * 2;

  return (
    <article data-cid={cids[0]} className={cn("border border-solid flex p-7 rounded-4xl flex-col bg-color-003", styles.className)}>
      <h3 data-cid={cids[1]} className="block mb-3 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[1.375rem] font-bold leading-[1.5625rem] tracking-[-0.22px] text-balance" data-component="heading">
        {d.title}
      </h3>
      <p data-cid={cids[2]} className="w-full max-w-[39.1125rem] block">
        {d.description2}
      </p>
      <div data-cid={cids[3]} className="flex my-5 items-baseline gap-1 overflow-hidden">
        <motion.span
          key={billing}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: easeOutQuiet }}
          data-cid={cids[4]}
          className="block [font-family:'JetBrains_Mono',_ui-monospace,_'SF_Mono',_Menlo,_monospace] text-2xl font-medium leading-[1.625rem] tracking-[-0.48px]"
        >
          {isYearly ? `$${yearlyPrice}` : d.price}
        </motion.span>
        <motion.span
          key={`${billing}-period`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.03, ease: easeOutQuiet }}
          data-cid={cids[5]}
          className="block text-primary text-sm leading-[1.375rem]"
        >
          {isYearly ? "/year" : "/mo"}
        </motion.span>
      </div>
      <motion.div
        key={`${billing}-meta`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05, ease: easeOutQuiet }}
        data-cid={cids[6]}
        className="w-full max-w-[34.225rem] block -mt-2 mb-5 text-sm leading-[1.375rem]"
      >
        {isYearly ? (
          <span>
            <span className="line-through text-primary/60">${originalYearly}</span>{" "}
            <span className="text-[rgb(0,182,122)] font-medium">Save ${savings} (17%)</span>
          </span>
        ) : (
          <span className="text-primary">{d.description3}</span>
        )}
      </motion.div>
      <ProductCardSlot1 d={d} />
      <a data-cid={cids[7]} className={cn("h-12 border border-solid border-[rgb(255,241,0)] flex mt-8 px-6.5 rounded-[999px] justify-center items-center gap-2 font-semibold leading-4 tracking-[-0.08px] whitespace-nowrap text-nowrap cursor-pointer bg-[rgb(255,241,0)] text-[rgb(26,14,8)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(255,241,0,0.35)] active:scale-[0.98] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[rgb(26,14,8)]/20 focus-visible:outline-none", styles.className2)} data-component="button" href="/signup">
        Get started
      </a>
      <p className="mt-3 text-center text-xs text-primary/70">
        or start with 7-day free trial
      </p>
    </article>
  );
}

function ProductCardSlot1({ d }: { d: ProductCardData }) {
  switch (d.variant) {
    case "starter":
      return (
        <ul className="flex flex-col flex-1 gap-3 [list-style-type:none] list-outside" data-cid="n369">
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n370">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n371" aria-hidden="true">
              <Icon5 cid={"n372"} />
            </span>
            <span className="block" data-cid="n373">
              {d.description}
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n374">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n375" aria-hidden="true">
              <Icon5 cid={"n376"} />
            </span>
            <span className="block" data-cid="n377">
              3 Instagram accounts
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n378">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n379" aria-hidden="true">
              <Icon5 cid={"n380"} />
            </span>
            <span className="block" data-cid="n381">
              3 Facebook pages
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n382">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n383" aria-hidden="true">
              <Icon5 cid={"n384"} />
            </span>
            <span className="block" data-cid="n385">
              1 WhatsApp account
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n386">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n387" aria-hidden="true">
              <Icon5 cid={"n388"} />
            </span>
            <span className="block" data-cid="n389">
              {"Stripe & Chargily enabled"}
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n390">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n391" aria-hidden="true">
              <Icon5 cid={"n392"} />
            </span>
            <span className="block" data-cid="n393">
              Yalidine shipping enabled
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n394">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n395" aria-hidden="true">
              <Icon5 cid={"n396"} />
            </span>
            <span className="block" data-cid="n397">
              Workflow Studio + AI builder
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n398">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n399" aria-hidden="true">
              <Icon5 cid={"n400"} />
            </span>
            <span className="block" data-cid="n401">
              Open Inbox
            </span>
          </li>
        </ul>
      );
    case "pro":
      return (
        <ul className="flex flex-col flex-1 gap-3 [list-style-type:none] list-outside" data-cid="n410">
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n411">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n412" aria-hidden="true">
              <Icon5 cid={"n413"} />
            </span>
            <span className="block" data-cid="n414">
              Everything in Starter
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n415">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n416" aria-hidden="true">
              <Icon5 cid={"n417"} />
            </span>
            <span className="block" data-cid="n418">
              {d.description}
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n419">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n420" aria-hidden="true">
              <Icon5 cid={"n421"} />
            </span>
            <span className="block" data-cid="n422">
              AI workflow chatbot
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n423">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n424" aria-hidden="true">
              <Icon5 cid={"n425"} />
            </span>
            <span className="block" data-cid="n426">
              WhatsApp Flow Builder
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n427">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n428" aria-hidden="true">
              <Icon5 cid={"n429"} />
            </span>
            <span className="block" data-cid="n430">
              Publish Content
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n431">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n432" aria-hidden="true">
              <Icon5 cid={"n433"} />
            </span>
            <span className="block" data-cid="n434">
              Online Store
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n435">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n436" aria-hidden="true">
              <Icon5 cid={"n437"} />
            </span>
            <span className="block" data-cid="n438">
              Shopify integration
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n439">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n440" aria-hidden="true">
              <Icon5 cid={"n441"} />
            </span>
            <span className="block" data-cid="n442">
              AI Analytics Insights
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n443">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n444" aria-hidden="true">
              <Icon5 cid={"n445"} />
            </span>
            <span className="block" data-cid="n446">
              Website chatbots
            </span>
          </li>
        </ul>
      );
    case "enterprise":
      return (
        <ul className="flex flex-col flex-1 gap-3 [list-style-type:none] list-outside" data-cid="n455">
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n456">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n457" aria-hidden="true">
              <Icon5 cid={"n458"} />
            </span>
            <span className="block" data-cid="n459">
              Everything in Pro
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n460">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n461" aria-hidden="true">
              <Icon5 cid={"n462"} />
            </span>
            <span className="block" data-cid="n463">
              {d.description3}
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n464">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n465" aria-hidden="true">
              <Icon5 cid={"n466"} />
            </span>
            <span className="block" data-cid="n467">
              Unlimited social accounts
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n468">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n469" aria-hidden="true">
              <Icon5 cid={"n470"} />
            </span>
            <span className="block" data-cid="n471">
              {d.description}
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n472">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n473" aria-hidden="true">
              <Icon5 cid={"n474"} />
            </span>
            <span className="block" data-cid="n475">
              Higher WhatsApp volume
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n476">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n477" aria-hidden="true">
              <Icon5 cid={"n478"} />
            </span>
            <span className="block" data-cid="n479">
              Priority support
            </span>
          </li>
          <li className="flex gap-3 text-primary text-sm leading-[1.375rem]" data-cid="n480">
            <span className="block mt-0.5 shrink-0 text-color-001" data-cid="n481" aria-hidden="true">
              <Icon5 cid={"n482"} />
            </span>
            <span className="block" data-cid="n483">
              Done-for-you scheduling options
            </span>
          </li>
        </ul>
      );
    default:
      return null;
  }
}
