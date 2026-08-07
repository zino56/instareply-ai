import Logo2 from "../components/logo2";
import { Logo2_cids } from "../_cids";
import { logos2 as logosContent } from "../content";
/** Logo Cloud section. */
export default function LogoCloudSection({ logos = logosContent } = {}) {
  return (
    <section className="border-t border-solid border-t-color-002 border-b border-b-color-002 block py-14 text-center" data-cid="n114" id="partners">
      <div className="flex max-w-300 mx-auto px-8 flex-col items-center" data-cid="n115">
        <p className="w-full max-w-[30.675rem] block text-primary text-xs font-semibold leading-[0.875rem] tracking-[1.68px] uppercase" data-cid="n116">
          Partners
        </p>
        <div className="flex mt-5 flex-wrap justify-center items-center gap-14" data-cid="n117">
          {logos.map((d, i) => <Logo2 key={i} d={d} cids={Logo2_cids[i]} />)}
        </div>
      </div>
    </section>
  );
}
