/* =====================================================
   EBHAR LINE — HOMEPAGE + SIX SECTOR DETAIL PAGES
===================================================== */

import { Fragment, useEffect, useState } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

import "./styles/base.css";
import IconSprite from "./components/Icons/IconSprite";
import Seo from "./components/Seo/Seo";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Partners from "./components/Partners/Partners";
import "./styles/shared.css";
import Sectors from "./components/Sectors/Sectors";
import ProjectFields from "./components/ProjectFields/ProjectFields";
import NewsEvents from "./components/NewsEvents/NewsEvents";
import ContactCta from "./components/ContactCta/ContactCta";
import Footer from "./components/Footer/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat/WhatsAppFloat";

import EngineeringConsultancy from "./sectors/EngineeringConsultancy/EngineeringConsultancy";
import ProjectManagement from "./sectors/ProjectManagement/ProjectManagement";
import ConstructionContracting from "./sectors/ConstructionContracting/ConstructionContracting";
import InfrastructureEnergy from "./sectors/InfrastructureEnergy/InfrastructureEnergy";
import LogisticsServices from "./sectors/LogisticsServices/LogisticsServices";
import ProfessionalTraining from "./sectors/ProfessionalTraining/ProfessionalTraining";

import "./styles/scroll-entrances.css";
import "./styles/responsive.css";
import "./styles/overrides.css";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const SECTOR_PAGES = {
  "engineering-consultancy": EngineeringConsultancy,
  "project-management": ProjectManagement,
  "construction-contracting": ConstructionContracting,
  "infrastructure-energy": InfrastructureEnergy,
  "logistics-services": LogisticsServices,
  "professional-training": ProfessionalTraining,
};

const sectorRoutes = {
  home: (lang) => `${BASE}/${lang}`,
  sectors: (lang) => `${BASE}/${lang}#sectors`,
  sector: (slug, lang) => `${BASE}/${lang}/sectors/${slug}`,
  project: (lang) => `${BASE}/${lang}#projects`,
  contact: () => `${BASE}/#contact`,
};

function readSectorSlug() {
  const path = window.location.pathname.startsWith(`${BASE}/`)
    ? window.location.pathname.slice(BASE.length)
    : window.location.pathname;
  const match = path.match(/^\/(?:ar|en)\/sectors\/([^/]+)\/?$/);
  return match ? match[1] : null;
}

function Page() {
  const { lang } = useLanguage();
  const [sectorSlug, setSectorSlug] = useState(readSectorSlug);

  useEffect(() => {
    const updateRoute = () => setSectorSlug(readSectorSlug());
    window.addEventListener("popstate", updateRoute);
    return () => window.removeEventListener("popstate", updateRoute);
  }, []);

  const SectorPage = sectorSlug ? SECTOR_PAGES[sectorSlug] : null;

  return (
    <Fragment key={`${lang}-${sectorSlug || "home"}`}>
      <IconSprite />
      <Header />
      {SectorPage ? (
        <SectorPage lang={lang} routes={sectorRoutes} />
      ) : (
        <main id="home">
          <Hero />
          <About />
          <Partners />
          <Sectors />
          <ProjectFields />
          <NewsEvents />
          <ContactCta />
        </main>
      )}
      <Footer />
      <WhatsAppFloat />
    </Fragment>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Seo />
      <Page />
    </LanguageProvider>
  );
}
