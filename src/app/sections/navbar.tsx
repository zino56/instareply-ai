import { Logo } from "@/components/brand/Logo";
import ListRow from "../components/list-row";
import Icon from "../svgs/svg-icon";
import Icon2 from "../svgs/svg-icon2";
import { ListRow_cids } from "../_cids";
import { listRowData as listRowDataContent } from "../content";
/** Top navigation bar. */
export default function Navbar({ listRowData = listRowDataContent } = {}) {
  return (
    <header className="h-19 border-b border-solid border-b-clr-0 block sticky top-0 z-50 bg-background max-lg:h-16.5" data-cid="n2">
      <div className="h-full block max-w-300 mx-auto px-8" data-cid="n3">
        <nav className="h-full flex py-3 justify-between items-center gap-8" data-cid="n4" data-component="nav" aria-label="Primary">
          <a className="h-8 flex items-center cursor-pointer" data-cid="n5" data-component="link" href="#" aria-label="Conveero home">
            <Logo size="nav" />
          </a>

          <ul className="border border-solid border-color-002 flex p-1.5 rounded-[999px] items-center gap-1 [list-style-type:none] list-outside bg-background max-lg:hidden" data-cid="n8">
            {listRowData.map((d, i) => <ListRow key={i} d={d} cids={ListRow_cids[i]} />)}
          </ul>
          <div className="flex flex-wrap items-center gap-2 max-lg:hidden" data-cid="n19">
            <div className="flex relative" data-cid="n20">
              <button className="h-[33.7px] border border-solid border-color-007 flex py-[0.35rem] px-[0.55rem] rounded-[999px] items-center gap-[0.35rem] text-[0.8125rem] font-semibold leading-[1.3125rem] tracking-[0.26px] text-center bg-surface-4 cursor-pointer hover:border-clr-20" data-cid="n21" data-component="button" aria-expanded="false" aria-haspopup="listbox" aria-label="Choose language" type="button">
                <span className="block" data-cid="n22">
                  EN
                </span>
                <Icon cid={"n23"} />
              </button>
            </div>
            <a className="h-9 border border-solid border-clr-0 flex px-4.5 rounded-[999px] justify-center items-center gap-2 text-sm font-semibold leading-3.5 tracking-[-0.07px] whitespace-nowrap text-nowrap cursor-pointer hover:border-color-001 hover:text-background hover:outline-background hover:[text-decoration-color:var(--color-001)] hover:underline" data-cid="n24" data-component="button" href="/dashboard">
              Sign in
            </a>
            <a className="w-[8.875rem] h-9 border border-solid border-foreground flex px-4.5 rounded-[999px] justify-center items-center gap-2 text-background text-sm font-semibold leading-3.5 tracking-[-0.07px] whitespace-nowrap text-nowrap bg-foreground cursor-pointer hover:bg-[rgb(255,241,0)] hover:border-[rgb(255,241,0)] hover:text-foreground" data-cid="n25" data-component="button" href="/signup">
              Get started
            </a>
          </div>
          <button className="w-10 h-10 hidden min-w-0 py-px px-1.5 rounded-md justify-center items-center [font-family:Arial] text-[0.8125rem] leading-[0.9375rem] text-center cursor-pointer max-lg:flex" data-cid="n26" aria-expanded="false" aria-label="Open menu" type="button">
            <Icon2 cid={"n27"} />
          </button>
        </nav>
        <div className="h-px border-t border-solid border-t-clr-0 grid invisible opacity-0 grid-cols-[minmax(0,_1fr)]" data-cid="n28" aria-hidden="true" />
      </div>
    </header>
  );
}
