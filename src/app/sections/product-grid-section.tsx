import { useState } from "react";
import { Reveal, Stagger, StaggerItem } from "../motion";
import ProductCard from "../components/product-card";
import SpotlightCard from "../components/spotlight-card";
import { CardSkeleton, useSkeleton } from "../components/skeleton";
import { ProductCard_cids } from "../_cids";
import { ProductCard_styles } from "../_styles";
import { products as productsContent } from "../content";
import { cn } from "../../lib/utils";

export type Billing = "monthly" | "yearly";

/** Product Grid section. */
export default function ProductGridSection({ products = productsContent } = {}) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const loading = useSkeleton(700);

  return (
    <section className="block py-24 max-lg:py-14" data-cid="n352" id="pricing">
      <div className="block max-w-300 mx-auto px-8" data-cid="n353">
        <Reveal className="block max-w-160 mb-14 mx-auto text-center">
          <h2 className="block [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[3.1875rem] font-bold leading-[3.1875rem] tracking-[-1.28px] text-balance max-lg:text-4xl max-lg:leading-9 max-lg:tracking-[-0.9px] 2xl:text-[3.25rem] 2xl:leading-13 2xl:tracking-[-1.3px]" data-cid="n355" data-component="heading">
            {"Simple plans that scale with "}
            <mark className="inline px-[0.575rem] rounded-sm bg-color-010 max-lg:px-[6.5px] 2xl:px-[0.5875rem]" data-cid="n356">
              volume
            </mark>
          </h2>
          <p className="block max-w-[44rem] my-5 text-primary text-lg leading-[1.8125rem]" data-cid="n357">
            Starter, Pro, or Enterprise. Choose the plan that fits your volume.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <div
              className="border border-solid border-color-002 inline-flex p-1.5 rounded-[999px] items-center gap-1 bg-background"
              data-cid="n358"
              aria-label="Billing period"
              role="group"
            >
              <button
                type="button"
                aria-pressed={billing === "monthly"}
                onClick={() => setBilling("monthly")}
                className={cn(
                  "h-10 flex px-4.5 rounded-[999px] items-center gap-2 text-sm font-semibold leading-[1.0625rem] transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-[rgb(26,14,8)]/20 focus-visible:outline-none",
                  billing === "monthly"
                    ? "text-background bg-foreground"
                    : "text-primary hover:text-foreground"
                )}
                data-cid="n359"
                data-component="button"
              >
                Monthly
              </button>
              <button
                type="button"
                aria-pressed={billing === "yearly"}
                onClick={() => setBilling("yearly")}
                className={cn(
                  "h-10 flex px-4.5 rounded-[999px] items-center gap-2 text-sm font-semibold leading-[1.0625rem] transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-[rgb(26,14,8)]/20 focus-visible:outline-none",
                  billing === "yearly"
                    ? "text-background bg-foreground"
                    : "text-primary hover:text-foreground"
                )}
                data-cid="n360"
                data-component="button"
              >
                Yearly
                <span className="inline-flex items-center rounded-full bg-[rgb(0,182,122)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </Reveal>
        {loading ? (
          <div className="w-full grid gap-8 grid-cols-1 lg:grid-cols-3" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <CardSkeleton key={i} tone="light" />
            ))}
          </div>
        ) : (
          <Stagger className="w-full grid gap-8 grid-cols-1 lg:grid-cols-3">
            {products.map((d, i) => (
              <StaggerItem key={d.variant} className="h-full">
                <SpotlightCard>
                  <ProductCard d={d} cids={ProductCard_cids[i]} styles={ProductCard_styles[i]} billing={billing} />
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        )}

      </div>
    </section>
  );
}
