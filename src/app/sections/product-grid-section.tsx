import { Reveal, Stagger, StaggerItem } from "../motion";
import ProductCard from "../components/product-card";
import SpotlightCard from "../components/spotlight-card";
import { CardSkeleton, useSkeleton } from "../components/skeleton";
import { ProductCard_cids } from "../_cids";
import { ProductCard_styles } from "../_styles";
import { products as productsContent } from "../content";
/** Product Grid section. */
export default function ProductGridSection({ products = productsContent } = {}) {
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
          <div className="border border-solid border-color-002 inline-flex mt-8 p-1.5 rounded-[999px] items-center gap-1 bg-background" data-cid="n358" aria-label="Monthly" role="group">
            <button className="h-10 flex px-4.5 rounded-[999px] items-center gap-2 text-background text-sm font-semibold leading-[1.0625rem] bg-foreground cursor-pointer" data-cid="n359" data-component="button" aria-pressed="true" type="button">
              Monthly
            </button>
            <button className="h-10 flex px-4.5 rounded-[999px] items-center gap-2 text-primary text-sm font-semibold leading-[1.0625rem] cursor-pointer hover:border-foreground hover:text-foreground hover:outline-foreground hover:[text-decoration-color:var(--foreground)]" data-cid="n360" data-component="button" aria-pressed="false" type="button">
              Yearly
            </button>
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
                  <ProductCard d={d} cids={ProductCard_cids[i]} styles={ProductCard_styles[i]} />
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        )}

      </div>
    </section>
  );
}
