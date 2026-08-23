import "./globals.css";
import DropdownMenu from "./ditto/DropdownMenu";
import Navbar from "./sections/navbar";
import HeroSection from "./sections/hero-section";
import DmSandboxSection from "./sections/dm-sandbox-section";
import HiConveeroLetSection from "./sections/hi-conveero-let-section";
import LogoCloudSection2 from "./sections/logo-cloud-section2";
import OneWorkspaceForSection from "./sections/one-workspace-for-section";
import AllInOneSection from "./sections/all-in-one-section";
import CtaSection from "./sections/cta-section";
import ProductGridSection from "./sections/product-grid-section";
import GalleryShowcaseSection from "./sections/gallery-showcase-section";
import QuestionsAnsweredSection from "./sections/questions-answered-section";
import ReadyToPutSection from "./sections/ready-to-put-section";
import Footer from "./sections/footer";

const languageMenuItems = [
  { label: "EN", secondaryLabel: "English", active: true },
  { label: "FR", secondaryLabel: "Français" },
  { label: "ع", secondaryLabel: "العربية" },
  { label: "RU", secondaryLabel: "Русский" },
  { label: "ⵣ", secondaryLabel: "ⵜⴰⵎⴰⵣⵉⵖⵜ" },
];

export default function Page() {
  return (
    <>
      <div className="conveero-page min-h-screen block" data-cid="n1" id="root">
        <Navbar />
        <main className="block" data-cid="n29">
          <HeroSection />
          <DmSandboxSection />
          <HiConveeroLetSection />
          <LogoCloudSection2 />
          <OneWorkspaceForSection />
          <AllInOneSection />
          <CtaSection />
          <ProductGridSection />
          <GalleryShowcaseSection />
          <QuestionsAnsweredSection />
          <ReadyToPutSection />
        </main>
        <Footer />
      </div>
      {" "}
      <DropdownMenu
        menus={[
          { trigger: "n21", hoverOpen: false, gap: 6, align: "right", label: "Language", items: languageMenuItems },
          { trigger: "n589", hoverOpen: false, gap: 0, align: "left", label: "Language", items: [] },
        ]}
      />
    </>
  );
}
