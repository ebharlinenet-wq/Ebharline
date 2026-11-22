/* ==================================================================
   EBHAR LINE — SECTOR PAGE: Construction & Contracting
   File: ConstructionContracting.jsx  (self-contained React component)
   Styles: ./ConstructionContracting.css

   Usage:
     import ConstructionContracting from "./ConstructionContracting/ConstructionContracting";
     <ConstructionContracting />                       // language read from <html dir>
     <ConstructionContracting lang="en" />             // or force "ar" | "en"

   Optional props:
     lang    "ar" | "en"
     Link    router link component that takes a `to` prop
             (e.g. react-router's <Link>). Defaults to a plain <a>.
     routes  override any URL builder, see DEFAULT_ROUTES below.

   This page renders ONLY the <main> content + the project modal.
   Header / footer / WhatsApp button stay in your own layout.
================================================================== */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal, flushSync } from "react-dom";
import "./ConstructionContracting.css";

/* ==================================================================
   01 — CONFIG (edit these)
================================================================== */

/** Folder that holds your images (Vite: put them in /public/assets/images) */
const IMG = `${import.meta.env.BASE_URL}assets/images/`;

/** Link builders. Replace with your real routes. */
const DEFAULT_ROUTES = {
  home: (lang) => `/${lang}`,
  sectors: (lang) => `/${lang}#sectors`,
  sector: (slug, lang) => `/${lang}/sectors/${slug}`,
  project: (lang) => `/${lang}/projects`,
  contact: () => "#contact",
};

/* ==================================================================
   02 — SECTOR CONTENT (this page)
================================================================== */

const SECTOR = {
  "slug": "construction-contracting",
  "heroImage": "construction.png",
  "projects": [
    {
      "id": "building",
      "image": "construction.png",
      "gallery": [
        "site-visit.png",
        "infrastructure.png"
      ]
    },
    {
      "id": "civil",
      "image": "infrastructure.png"
    },
    {
      "id": "finishing",
      "image": "site-visit.png"
    },
    {
      "id": "safety",
      "image": "project-management.png"
    },
    {
      "id": "materials",
      "image": "logistics.png"
    },
    {
      "id": "rehab",
      "image": "infrastructure.png"
    }
  ],
  "extraProjects": [
    {
      "id": "mobilization",
      "image": "construction.png"
    },
    {
      "id": "subcontractors",
      "image": "project-management.png"
    }
  ],
  "ar": {
    "name": "الإنشاءات والمقاولات",
    "modalLabel": "قطاع الإنشاءات والمقاولات",
    "tagline": "من المخططات إلى منشآت قائمة.",
    "aboutTitle": "التنفيذ الجيد يبدأ من التحضير الجيد.",
    "aboutLead": "يحوّل قطاع الإنشاءات والمقاولات المخططات إلى أعمال منفذة بجودة وسلامة والتزام بالجدول.",
    "aboutBody": "نراجع المخططات وبرامج العمل ونجهّز الموارد والمواد، ثم ننفذ ونتابع الأعمال في الموقع وفق متطلبات الجودة والسلامة المعتمدة. يتكيّف نطاق العمل مع طبيعة كل مشروع، من المباني إلى الأعمال المدنية.",
    "approach": [
      {
        "title": "التهيئة والتحضير",
        "text": "مراجعة المخططات وتجهيز الموقع والموارد قبل البدء."
      },
      {
        "title": "التنفيذ المنضبط",
        "text": "تنفيذ الأعمال وفق البرنامج ومعايير الجودة والسلامة."
      },
      {
        "title": "الفحص والتسليم",
        "text": "اختبار الأعمال واستكمال الملاحظات وتسليم المشروع."
      }
    ],
    "projectsIntro": "نماذج تجريبية توضح كيف يظهر دور الإنشاءات والمقاولات في أنواع مختلفة من الأعمال.",
    "ctaTitle": "هل لديك مشروع يحتاج إلى تنفيذ منضبط؟",
    "ctaText": "شاركنا تفاصيل مشروعك ونطاق أعماله، لنناقش معاً أنسب خطة للتنفيذ.",
    "ctaButton": "ناقش تنفيذ مشروعك",
    "projects": [
      {
        "tag": "المباني",
        "title": "تنفيذ مبنى خدمي متعدد الاستخدام",
        "summary": "تنفيذ الهيكل والأعمال المعمارية والكهروميكانيكية ضمن برنامج منسق.",
        "detailTitle": "تنسيق الأعمال المتداخلة",
        "detailText": "يعرض النموذج كيف يساعد تنسيق التخصصات في الموقع على تقليل التعارض وإعادة العمل."
      },
      {
        "tag": "الأعمال المدنية",
        "title": "أعمال مدنية لتحسين مواقع خدمية",
        "summary": "تنفيذ أعمال الحفر والتسوية والتمديدات المدنية وفق المخططات المعتمدة.",
        "detailTitle": "ترتيب الأعمال في الموقع",
        "detailText": "يعتمد النموذج على تسلسل واضح للأعمال ومراقبة الجودة في كل مرحلة."
      },
      {
        "tag": "التشطيبات",
        "title": "تشطيب وتجهيز منشأة قبل التسليم",
        "summary": "إنجاز أعمال التشطيب وفحصها وتصحيح الملاحظات لضمان جاهزية المنشأة.",
        "detailTitle": "الجاهزية للتسليم",
        "detailText": "تُراجع الأعمال مقابل المواصفات ويُوثَّق إغلاق الملاحظات تمهيداً للتسليم."
      },
      {
        "tag": "السلامة والجودة",
        "title": "خطة سلامة وجودة لموقع إنشائي",
        "summary": "وضع إجراءات واضحة للفحص والسلامة المهنية وتوثيقها خلال التنفيذ.",
        "detailTitle": "التزام يومي",
        "detailText": "يوضح النموذج دور الإحاطات اليومية وقوائم الفحص في الحفاظ على بيئة عمل آمنة."
      },
      {
        "tag": "المواد والتوريد",
        "title": "تنسيق توريد المواد لمشروع إنشائي",
        "summary": "ربط احتياجات الموقع بجداول التوريد لتقليل التأخير وضمان توافق المواد مع المواصفات.",
        "detailTitle": "التوريد في الوقت المناسب",
        "detailText": "يتابع النموذج الطلبات والاعتمادات والتسليمات بما يتناسب مع تقدم الأعمال."
      },
      {
        "tag": "إعادة التأهيل",
        "title": "إعادة تأهيل منشأة قائمة",
        "summary": "تقييم الوضع القائم وتنفيذ أعمال التأهيل مع تقليل التأثير على التشغيل.",
        "detailTitle": "العمل ضمن موقع قائم",
        "detailText": "يراعي النموذج القيود التشغيلية ويقسّم الأعمال إلى مراحل تقلل التعطيل."
      }
    ],
    "extraProjects": [
      {
        "tag": "تجهيز الموقع",
        "title": "تجهيز الموقع والمرافق المؤقتة",
        "summary": "تنظيم المداخل ومناطق التخزين والخدمات المؤقتة قبل بدء الأعمال الأساسية.",
        "detailTitle": "بداية منظمة",
        "detailText": "يساعد التجهيز الجيد للموقع على بدء الأعمال بسلاسة وتقليل الاضطراب خلال التنفيذ."
      },
      {
        "tag": "المقاولون من الباطن",
        "title": "إدارة أعمال المقاولين من الباطن",
        "summary": "تنسيق نطاقات العمل وجداولها وفحص مخرجاتها ضمن برنامج المشروع.",
        "detailTitle": "نطاقات واضحة",
        "detailText": "تحديد حدود كل نطاق وواجهاته مع الأعمال الأخرى لتفادي التداخل والتأخير."
      }
    ]
  },
  "en": {
    "name": "Construction & Contracting",
    "modalLabel": "Construction & Contracting",
    "tagline": "From drawings to built facilities.",
    "aboutTitle": "Good construction starts with good preparation.",
    "aboutLead": "Construction and contracting turn drawings into completed works with quality, safety, and schedule discipline.",
    "aboutBody": "We review drawings and work programs, prepare resources and materials, then execute and monitor works on site according to approved quality and safety requirements. The scope adapts to each project, from buildings to civil works.",
    "approach": [
      {
        "title": "Prepare",
        "text": "Review drawings and ready the site and resources before starting."
      },
      {
        "title": "Build with discipline",
        "text": "Execute works to the program and to quality and safety standards."
      },
      {
        "title": "Inspect and hand over",
        "text": "Test works, close out comments, and hand over the project."
      }
    ],
    "projectsIntro": "Illustrative cases showing how construction and contracting contribute to different types of works.",
    "ctaTitle": "Have a Project That Needs Disciplined Delivery?",
    "ctaText": "Share your project details and scope, and we can discuss the most suitable delivery plan.",
    "ctaButton": "Discuss Delivering Your Project",
    "projects": [
      {
        "tag": "Buildings",
        "title": "Delivering a multi-use service building",
        "summary": "Delivering structure, architectural, and MEP works under a coordinated program.",
        "detailTitle": "Coordinating overlapping works",
        "detailText": "The example shows how on-site coordination between trades helps reduce clashes and rework."
      },
      {
        "tag": "Civil works",
        "title": "Civil works for service-site improvements",
        "summary": "Carrying out excavation, grading, and civil installations per approved drawings.",
        "detailTitle": "Sequencing works on site",
        "detailText": "The example relies on a clear work sequence and quality control at each stage."
      },
      {
        "tag": "Finishing",
        "title": "Finishing and fit-out before handover",
        "summary": "Completing finishing works, inspecting them, and correcting comments to ready the facility.",
        "detailTitle": "Readiness for handover",
        "detailText": "Works are checked against specifications and comment closure is documented ahead of handover."
      },
      {
        "tag": "Safety & quality",
        "title": "Safety and quality plan for a construction site",
        "summary": "Setting clear inspection and occupational-safety procedures and documenting them throughout works.",
        "detailTitle": "Everyday compliance",
        "detailText": "The example shows how daily briefings and checklists maintain a safe working environment."
      },
      {
        "tag": "Materials & supply",
        "title": "Coordinating material supply for a building project",
        "summary": "Linking site needs to delivery schedules to limit delays and keep materials to specification.",
        "detailTitle": "Supply at the right time",
        "detailText": "The example tracks orders, approvals, and deliveries in step with work progress."
      },
      {
        "tag": "Rehabilitation",
        "title": "Rehabilitating an existing facility",
        "summary": "Assessing current condition and carrying out rehabilitation while limiting operational impact.",
        "detailTitle": "Working in a live site",
        "detailText": "The example respects operational constraints and phases works to reduce disruption."
      }
    ],
    "extraProjects": [
      {
        "tag": "Site mobilization",
        "title": "Site setup and temporary facilities",
        "summary": "Organizing access, storage areas, and temporary services before main works begin.",
        "detailTitle": "An organized start",
        "detailText": "Good site setup helps works begin smoothly and reduces disruption during delivery."
      },
      {
        "tag": "Subcontractors",
        "title": "Managing subcontractor works",
        "summary": "Coordinating work scopes, schedules, and output checks within the project program.",
        "detailTitle": "Clear scopes",
        "detailText": "Defining each scope's boundaries and interfaces with other works to avoid overlap and delay."
      }
    ]
  }
};

/* ==================================================================
   03 — ALL SECTORS (used by the "Other sectors" grid)
================================================================== */

const ALL_SECTORS = [
  {
    "slug": "engineering-consultancy",
    "image": "engineering-consultancy.png",
    "ar": {
      "name": "الاستشارات الهندسية",
      "desc": "دراسات وتوصيات هندسية تدعم اتخاذ القرار."
    },
    "en": {
      "name": "Engineering Consultancy",
      "desc": "Engineering studies and recommendations that support decisions."
    }
  },
  {
    "slug": "project-management",
    "image": "project-management.png",
    "ar": {
      "name": "إدارة المشاريع",
      "desc": "تنسيق الموارد والمراحل لضمان تنفيذ منظم."
    },
    "en": {
      "name": "Project Management",
      "desc": "Coordinating people, resources, and schedules."
    }
  },
  {
    "slug": "construction-contracting",
    "image": "construction.png",
    "ar": {
      "name": "الإنشاءات والمقاولات",
      "desc": "حلول تنفيذية تربط المخططات بالواقع."
    },
    "en": {
      "name": "Construction & Contracting",
      "desc": "Turning plans into practical construction."
    }
  },
  {
    "slug": "infrastructure-energy",
    "image": "energy.png",
    "ar": {
      "name": "البنية التحتية والطاقة",
      "desc": "منظومات ومرافق تدعم استمرارية الخدمات."
    },
    "en": {
      "name": "Infrastructure & Energy",
      "desc": "Facilities and systems that support vital services."
    }
  },
  {
    "slug": "logistics-services",
    "image": "logistics.png",
    "ar": {
      "name": "الخدمات اللوجستية",
      "desc": "تنظيم التوريد والنقل لتيسير العمليات."
    },
    "en": {
      "name": "Logistics Services",
      "desc": "Coordinating supply, transport, and field operations."
    }
  },
  {
    "slug": "professional-training",
    "image": "professional-training.png",
    "ar": {
      "name": "التدريب المهني",
      "desc": "برامج تطور المهارات والجاهزية العملية."
    },
    "en": {
      "name": "Professional Training",
      "desc": "Building practical skills and workforce readiness."
    }
  }
];

/* ==================================================================
   04 — SHARED UI TEXT
================================================================== */

const UI = {
  "ar": {
    "breadcrumb": "مسار الصفحة",
    "home": "الرئيسية",
    "sectors": "القطاعات",
    "viewWork": "شاهد أعمالنا",
    "aboutKicker": "عن القطاع",
    "projectsKicker": "من أعمال القطاع",
    "projectsTitle": "مشاريعنا",
    "prev": "السابق",
    "next": "التالي",
    "goTo": "الانتقال إلى المشروع",
    "more": "المزيد من التفاصيل",
    "projectDetails": "تفاصيل المشروع",
    "viewAll": "عرض كل المشاريع",
    "note": "المحتوى المعروض تجريبي لاختبار التصميم والتفاعل.",
    "otherTitle": "القطاعات الأخرى",
    "otherSub": "خبرات تتكامل لتلبية احتياجات المشاريع.",
    "otherNav": "استكشف القطاعات الأخرى",
    "modalGridTitle": "جميع مشاريع القطاع",
    "modalDetailTitle": "تفاصيل مساهمة القطاع",
    "modalIntro": "تصفح المشاريع واختر «المزيد من التفاصيل» للاطلاع على مساهمة القطاع في كل مشروع.",
    "back": "رجوع",
    "closeDialog": "إغلاق النافذة",
    "backToTop": "العودة إلى البداية",
    "fullStory": "شاهد رحلة المشروع كاملة",
    "projectOf": "المشروع {n} من {total}"
  },
  "en": {
    "breadcrumb": "Breadcrumb",
    "home": "Home",
    "sectors": "Sectors",
    "viewWork": "View our work",
    "aboutKicker": "About the sector",
    "projectsKicker": "Selected sector work",
    "projectsTitle": "Our projects",
    "prev": "Previous",
    "next": "Next",
    "goTo": "Go to project",
    "more": "More details",
    "projectDetails": "Project details",
    "viewAll": "View all projects",
    "note": "All project content is illustrative for interface testing.",
    "otherTitle": "Other Sectors",
    "otherSub": "Complementary expertise across every project.",
    "otherNav": "Explore other sectors",
    "modalGridTitle": "All sector projects",
    "modalDetailTitle": "Sector contribution",
    "modalIntro": "Browse the projects and select “More details” to explore the sector contribution.",
    "back": "Back",
    "closeDialog": "Close dialog",
    "backToTop": "Back to top",
    "fullStory": "View the full project story",
    "projectOf": "Project {n} of {total}"
  }
};

/* ==================================================================
   05 — SMALL PIECES: links + icons
================================================================== */

function DefaultLink({ to, children, ...rest }) {
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  );
}

/** Same chevron as the original homepage icon */
function ArrowIcon({ direction = "right" }) {
  const d =
    direction === "left"
      ? "M15.5 5.5 9 12l6.5 6.5"
      : "M8.5 5.5 15 12l-6.5 6.5";

  return (
    <svg
      className="sc-ui-arrow"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}

function DownIcon() {
  return (
    <svg
      className="down-icon"
      viewBox="0 0 20 10"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2 2 10 7 18 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="el-chevron"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M15.5 5.5 9 12l6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ==================================================================
   06 — ROG CORNER ANIMATION
   4 independent SVG paths, 36px moving segment, path length measured
   per card, recalculated on resize.
================================================================== */

const ROG_SEGMENT_LENGTH = 36;

function RogFrame() {
  const frameRef = useRef(null);
  const svgRef = useRef(null);
  const pathRefs = useRef([]);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const svg = svgRef.current;
    if (!frame || !svg) return undefined;

    function update() {
      /* offsetWidth/Height ignore the carousel's scale() transform */
      const w = frame.offsetWidth;
      const h = frame.offsetHeight;
      if (w < 1 || h < 1) return;

      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

      const middle = w / 2;
      const edge = 2;
      const depth = 16;

      const defs = [
        `M ${middle} ${edge} H ${edge} V ${edge + depth}`,
        `M ${middle} ${edge} H ${w - edge} V ${edge + depth}`,
        `M ${middle} ${h - edge} H ${edge} V ${h - edge - depth}`,
        `M ${middle} ${h - edge} H ${w - edge} V ${h - edge - depth}`,
      ];

      pathRefs.current.forEach((path, i) => {
        if (!path) return;
        path.setAttribute("d", defs[i]);
        const length = path.getTotalLength();
        const finalOffset = -Math.max(0, length - ROG_SEGMENT_LENGTH);
        path.style.setProperty("--rog-end", `${finalOffset}px`);
      });
    }

    update();

    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(update);
      observer.observe(frame);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <span className="sc-rog-frame" aria-hidden="true" ref={frameRef}>
      <svg
        className="sc-rog-clean"
        aria-hidden="true"
        preserveAspectRatio="none"
        ref={svgRef}
      >
        {[0, 1, 2, 3].map((i) => (
          <path key={i} ref={(el) => (pathRefs.current[i] = el)} />
        ))}
      </svg>
    </span>
  );
}

/* ==================================================================
   07 — PROJECT CARD (used in the slider AND in the modal grid)
================================================================== */

function ProjectCard({
  project,
  forward,
  moreLabel,
  ariaLabel,
  onOpen,
  extraClass = "",
  tabIndex = 0,
  interactiveTabIndex = 0,
  blocked,
  dataRevealId,
}) {
  function activate(event) {
    /* ignore clicks on real links inside the card */
    if (event.target.closest("a[href]")) return;
    if (blocked && blocked()) return;
    event.preventDefault();
    onOpen(project.id);
  }

  function onKeyDown(event) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate(event);
    }
  }

  return (
    <article
      className={`sc-card${extraClass ? ` ${extraClass}` : ""}`}
      data-sc-project-id={project.id}
      data-reveal-id={dataRevealId}
      tabIndex={tabIndex}
      role="group"
      aria-label={ariaLabel}
      onClick={activate}
      onKeyDown={onKeyDown}
    >
      <div className="sc-card__image">
        <img
          src={IMG + project.image}
          alt={project.imageAlt || ""}
          loading="lazy"
        />
      </div>

      <div className="sc-card__body">
        <span className="sc-card__tag">{project.tag}</span>
        <h3 className="sc-card__title">{project.title}</h3>
        <p className="sc-card__summary">{project.summary}</p>
        <button
          className="sc-card__link"
          type="button"
          tabIndex={interactiveTabIndex}
        >
          {moreLabel} <ArrowIcon direction={forward} />
        </button>
      </div>

      <RogFrame />
    </article>
  );
}

/* ==================================================================
   08 — INFINITE PROJECT CAROUSEL (hook)

   Seamless rotation, no clones:
     NEXT: A B C D -> B C D A
     PREV: A B C D -> D A B C
   Clickable progress segments, swipe, arrow keys, reduced motion.
================================================================== */

const SLIDE_DURATION = 950;
const PROGRESS_DURATION = 720;

function useProjectCarousel({
  total,
  rtl,
  stageRef,
  viewportRef,
  railRef,
  reducedMotion,
}) {
  const [order, setOrder] = useState(() =>
    Array.from({ length: total }, (_, i) => i),
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(2);
  const [isCycle, setIsCycle] = useState(false);
  const [liveIndex, setLiveIndex] = useState(0);

  /* mutable engine state (does not trigger renders) */
  const engine = useRef({
    active: 0,
    busy: false,
    direction: 0,
    incoming: null,
    outgoing: null,
    fallbackTimer: null,
    pendingStep: 0,
    requested: null,
    pointerStart: null,
    suppressClick: false,
  }).current;

  const slideSign = rtl ? 1 : -1;

  const readVisible = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return Math.min(total, 2);
    const raw = getComputedStyle(stage).getPropertyValue("--sc-visible");
    return Math.min(total, parseInt(raw, 10) || 2);
  }, [stageRef, total]);

  const cardStep = useCallback(() => {
    const rail = railRef.current;
    const first = rail?.firstElementChild;
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    return first.offsetWidth + gap;
  }, [railRef]);

  const setPosition = useCallback(
    (distance) => {
      const rail = railRef.current;
      if (rail) rail.style.transform = `translate3d(${distance}px, 0, 0)`;
    },
    [railRef],
  );

  const rotateForward = () =>
    flushSync(() => setOrder((o) => [...o.slice(1), o[0]]));
  const rotateBackward = () =>
    flushSync(() => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]));

  /* ---------- progress helpers ---------- */

  function syncActive(completedCycle) {
    setActiveIndex(engine.active);

    if (engine.requested === null || engine.requested === engine.active) {
      setLiveIndex(engine.active);
    }

    if (completedCycle && !reducedMotion) {
      setIsCycle(true);
    }
  }

  function directionTo(target) {
    const ahead = (target - engine.active + total) % total;
    const behind = (engine.active - target + total) % total;
    return ahead <= behind ? 1 : -1;
  }

  function continueProgressNavigation() {
    if (engine.requested === null || engine.busy) return;

    if (engine.requested === engine.active) {
      engine.requested = null;
      syncActive(false);
      return;
    }

    move(directionTo(engine.requested), PROGRESS_DURATION);
  }

  /* ---------- finish one rotation ---------- */

  function finishMove() {
    if (!engine.busy) return;

    const rail = railRef.current;
    if (!rail) return;

    clearTimeout(engine.fallbackTimer);
    engine.fallbackTimer = null;

    rail.style.transition = "none";

    if (engine.direction === 1) rotateForward();

    setPosition(0);

    engine.incoming?.classList.remove("sc-is-entering");
    engine.outgoing?.classList.remove("sc-is-leaving");
    rail.classList.remove("sc-rail--moving");

    void rail.offsetWidth;

    engine.incoming = null;
    engine.outgoing = null;
    engine.busy = false;
    engine.direction = 0;

    requestAnimationFrame(() => {
      if (engine.busy) return;

      rail.style.transition = "";

      if (engine.pendingStep !== 0) {
        const step = engine.pendingStep;
        engine.pendingStep = 0;
        move(step, SLIDE_DURATION);
        return;
      }

      if (engine.requested !== null) continueProgressNavigation();
    });
  }

  /* ---------- move one project ---------- */

  function move(direction, duration = SLIDE_DURATION) {
    const rail = railRef.current;
    if (!rail || total <= 1) return;

    if (engine.busy) {
      engine.pendingStep = direction;
      return;
    }

    const oldIndex = engine.active;
    engine.active = (engine.active + direction + total) % total;

    const completedCycle =
      direction === 1 && oldIndex === total - 1 && engine.active === 0;

    syncActive(completedCycle);

    if (reducedMotion) {
      if (direction === 1) rotateForward();
      else rotateBackward();

      rail.style.transition = "none";
      setPosition(0);

      if (engine.requested !== null && engine.requested !== engine.active) {
        requestAnimationFrame(continueProgressNavigation);
      } else if (engine.requested !== null) {
        engine.requested = null;
        syncActive(false);
      }
      return;
    }

    engine.busy = true;
    engine.direction = direction;

    rail.classList.add("sc-rail--moving");
    rail.style.setProperty("--sc-card-time", `${duration}ms`);

    const distance = slideSign * cardStep();
    const count = readVisible();

    rail.style.transition = "none";

    if (direction === 1) {
      engine.outgoing = rail.children[0];
      engine.incoming = rail.children[count];

      setPosition(0);
      engine.incoming?.classList.add("sc-is-entering");
    } else {
      rotateBackward();

      engine.incoming = rail.children[0];
      setPosition(distance);
      engine.incoming?.classList.add("sc-is-entering");

      engine.outgoing = rail.children[count];
    }

    void rail.offsetWidth;

    requestAnimationFrame(() => {
      if (!engine.busy) return;

      engine.outgoing?.classList.add("sc-is-leaving");
      engine.incoming?.classList.remove("sc-is-entering");

      rail.style.transition = `transform ${duration}ms cubic-bezier(.4, 0, .2, 1)`;

      setPosition(direction === 1 ? distance : 0);

      engine.fallbackTimer = setTimeout(finishMove, duration + 220);
    });
  }

  /* ---------- public actions ---------- */

  function requestArrow(direction) {
    engine.requested = null;

    if (engine.busy) {
      engine.pendingStep = direction;
      return;
    }

    move(direction, SLIDE_DURATION);
  }

  function requestProject(index) {
    if (total <= 1) return;

    engine.requested = index;
    engine.pendingStep = 0;

    if (!engine.busy) continueProgressNavigation();
  }

  function step(nextward) {
    engine.requested = null;

    if (engine.busy) engine.pendingStep = nextward ? 1 : -1;
    else move(nextward ? 1 : -1);
  }

  /* ---------- DOM event props ---------- */

  const onTransitionEnd = (event) => {
    if (
      event.target === railRef.current &&
      event.propertyName === "transform"
    ) {
      finishMove();
    }
  };

  const onRailKeyDown = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();

    const nextward = rtl
      ? event.key === "ArrowLeft"
      : event.key === "ArrowRight";

    step(nextward);
  };

  const viewportProps = {
    onPointerDown(event) {
      if (event.pointerType === "mouse" || !event.isPrimary) return;
      engine.pointerStart = { x: event.clientX, y: event.clientY };
    },
    onPointerUp(event) {
      if (!engine.pointerStart) return;

      const dx = event.clientX - engine.pointerStart.x;
      const dy = event.clientY - engine.pointerStart.y;
      engine.pointerStart = null;

      if (Math.abs(dx) < 45 || Math.abs(dx) <= Math.abs(dy) * 1.2) return;

      const nextward = rtl ? dx > 0 : dx < 0;

      engine.suppressClick = true;
      step(nextward);

      setTimeout(() => {
        engine.suppressClick = false;
      }, 350);
    },
    onPointerCancel() {
      engine.pointerStart = null;
    },
    onClickCapture(event) {
      if (!engine.suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      engine.suppressClick = false;
    },
  };

  const isMoving = () =>
    Boolean(railRef.current?.classList.contains("sc-rail--moving"));

  /* ---------- measure + resize ---------- */

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const rail = railRef.current;
    if (!viewport || !rail) return undefined;

    function measure() {
      setVisible(readVisible());

      if (engine.busy) return;
      rail.style.transition = "none";
      setPosition(0);
    }

    measure();

    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(measure);
      observer.observe(viewport);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => () => {
      clearTimeout(engine.fallbackTimer);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    order,
    visible,
    activeIndex,
    liveIndex,
    isCycle,
    endCycle: () => setIsCycle(false),
    prev: () => requestArrow(-1),
    next: () => requestArrow(1),
    goTo: requestProject,
    onTransitionEnd,
    onRailKeyDown,
    viewportProps,
    isMoving,
  };
}

/* ==================================================================
   09 — ARROW PRESS FEEDBACK (slider arrows)
================================================================== */

function SliderArrow({ side, direction, label, disabled, onPress }) {
  const [pressed, setPressed] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleClick() {
    clearTimeout(timer.current);
    setPressed(true);
    timer.current = setTimeout(() => setPressed(false), 190);
    onPress();
  }

  return (
    <button
      className={`sc-slider-arrow sc-slider-arrow--${side}${
        pressed ? " is-pressed" : ""
      }`}
      type="button"
      data-arrow-direction={direction}
      aria-label={label}
      disabled={disabled}
      onClick={handleClick}
    >
      <ArrowIcon direction={direction} />
    </button>
  );
}

/* ==================================================================
   10 — PROJECT MODAL (grid of all projects + detail view)

   - Soft open / close, header shadow on scroll
   - Grid is mounted once and cached, scroll position restored
   - Cards reveal while scrolling
   - Focus trap, Escape to close, page is inert while open
================================================================== */

const CLOSE_DURATION = 470;

function ProjectModal({
  initial,
  onClosed,
  allProjects,
  projectsById,
  text,
  forward,
  backward,
  sectorLabel,
  Link,
  projectHref,
  reducedMotion,
  pageRef,
}) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("grid");
  const [detailId, setDetailId] = useState(null);
  const [fromGrid, setFromGrid] = useState(false);
  const [visited, setVisited] = useState(() => new Set());
  const [revealed, setRevealed] = useState(() => new Set());
  const [scrolled, setScrolled] = useState(false);

  const modalRef = useRef(null);
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const gridViewRef = useRef(null);
  const detailViewRef = useRef(null);
  const gridRef = useRef(null);
  const closeRef = useRef(null);

  const closing = useRef(false);
  const closeTimer = useRef(null);
  const previousFocus = useRef(null);
  const gridScrollTop = useRef(0);
  const restoreGrid = useRef(false);
  const justOpened = useRef(false);

  const canAnimateGrid =
    typeof window !== "undefined" &&
    "IntersectionObserver" in window &&
    !reducedMotion;

  /* ---------- open requests coming from the page ---------- */

  const requestKey = initial?.key;

  useEffect(() => {
    if (!initial) return;

    previousFocus.current = document.activeElement;
    closing.current = false;
    clearTimeout(closeTimer.current);

    justOpened.current = !mounted;

    if (initial.type === "detail") {
      setVisited((v) => new Set(v).add(initial.id));
      setDetailId(initial.id);
      setFromGrid(false);
      setView("detail");
    } else {
      gridScrollTop.current = 0;
      restoreGrid.current = false;
      setView("grid");
    }

    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey]);

  /* hidden -> visible, then add .is-open on the next frame */
  useLayoutEffect(() => {
    if (!mounted) return undefined;

    void modalRef.current?.offsetWidth;

    const id = requestAnimationFrame(() => {
      if (!closing.current) setIsOpen(true);
    });

    return () => cancelAnimationFrame(id);
  }, [mounted]);

  /* body + page state while the modal is shown */
  useEffect(() => {
    if (!mounted) return undefined;

    document.body.classList.add("sc-modal-open");
    const page = pageRef.current;
    if (page) page.inert = true;

    return () => {
      document.body.classList.remove("sc-modal-open");
      if (page) page.inert = false;
    };
  }, [mounted, pageRef]);

  /* ---------- close ---------- */

  function finalizeClose() {
    clearTimeout(closeTimer.current);
    closeTimer.current = null;

    setMounted(false);
    setIsOpen(false);
    closing.current = false;

    onClosed();

    const prev = previousFocus.current;
    if (prev && prev.isConnected) prev.focus({ preventScroll: true });
  }

  function closeModal() {
    if (!mounted || closing.current) return;

    closing.current = true;
    setIsOpen(false);

    if (reducedMotion) {
      finalizeClose();
      return;
    }

    closeTimer.current = setTimeout(finalizeClose, CLOSE_DURATION);
  }

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  /* ---------- views ---------- */

  function animateView(el) {
    if (!el) return;
    el.classList.remove("is-view-entering");
    if (reducedMotion) return;
    void el.offsetWidth;
    el.classList.add("is-view-entering");
  }

  function openDetail(id) {
    gridScrollTop.current = scrollRef.current?.scrollTop || 0;
    setVisited((v) => new Set(v).add(id));
    setDetailId(id);
    setFromGrid(true);
    setView("detail");
  }

  function backToGrid() {
    restoreGrid.current = true;
    setView("grid");
  }

  useLayoutEffect(() => {
    if (!mounted) return;

    const scroller = scrollRef.current;

    if (view === "grid") {
      if (scroller) {
        scroller.scrollTop = restoreGrid.current ? gridScrollTop.current : 0;
      }
      restoreGrid.current = false;
      animateView(gridViewRef.current);
    } else {
      if (scroller) scroller.scrollTop = 0;
      animateView(detailViewRef.current);
    }

    setScrolled((scroller?.scrollTop || 0) > 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, detailId, mounted]);

  useEffect(() => {
    if (mounted && !closing.current) {
      closeRef.current?.focus({ preventScroll: true });
    }
  }, [mounted, view, detailId]);

  /* ---------- grid reveal while scrolling ---------- */

  useEffect(() => {
    if (!canAnimateGrid || !mounted || view !== "grid") return undefined;

    const root = scrollRef.current;
    const grid = gridRef.current;
    if (!root || !grid) return undefined;

    const timers = [];

    const observer = new IntersectionObserver(
      (entries, obs) => {
        const ids = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              [...grid.children].indexOf(a.target) -
              [...grid.children].indexOf(b.target),
          );

        ids.forEach((entry, index) => {
          obs.unobserve(entry.target);
          const id = entry.target.dataset.revealId;

          timers.push(
            window.setTimeout(() => {
              setRevealed((r) => new Set(r).add(id));
            }, Math.min(index, 3) * 85),
          );
        });
      },
      { root, threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );

    /* first opening waits for the panel transition */
    const delay = justOpened.current ? 450 : 110;

    const startTimer = window.setTimeout(() => {
      justOpened.current = false;

      grid
        .querySelectorAll(".sc-grid-reveal:not(.is-revealed)")
        .forEach((card) => observer.observe(card));
    }, delay);

    return () => {
      clearTimeout(startTimer);
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, [canAnimateGrid, mounted, view]);

  /* ---------- Escape + focus trap ---------- */

  useEffect(() => {
    if (!mounted) return undefined;

    function onKeyDown(event) {
      if (closing.current) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = [
        ...panel.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ].filter(
        (el) => !el.closest("[hidden]") && el.getClientRects().length > 0,
      );

      if (!focusable.length) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  /* ---------- render ---------- */

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`sc-modal${isOpen ? " is-open" : ""}`}
      id="sc-project-modal"
      ref={modalRef}
      hidden={!mounted}
      aria-hidden={!mounted}
    >
      <div className="sc-modal__backdrop" onClick={closeModal} />

      <section
        className="sc-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sc-modal-title"
        tabIndex={-1}
        ref={panelRef}
      >
        <header className={`sc-modal__head${scrolled ? " is-scrolled" : ""}`}>
          <div>
            <p>{sectorLabel}</p>
            <h2 id="sc-modal-title">
              {view === "grid" ? text.modalGridTitle : text.modalDetailTitle}
            </h2>
          </div>

          <div className="sc-modal__actions">
            <button
              className="sc-modal__control sc-modal__back"
              type="button"
              hidden={view === "grid" || !fromGrid}
              onClick={backToGrid}
            >
              <ArrowIcon direction={backward} />
              <span>{text.back}</span>
            </button>

            <button
              className="sc-modal__control"
              type="button"
              aria-label={text.closeDialog}
              ref={closeRef}
              onClick={closeModal}
            >
              <svg
                className="sc-modal__close"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M6 6L18 18M18 6L6 18" />
              </svg>
            </button>
          </div>
        </header>

        <div
          className="sc-modal__scroll"
          ref={scrollRef}
          onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 5)}
        >
          {/* GRID VIEW */}
          <div
            className="sc-modal__view"
            hidden={view !== "grid"}
            ref={gridViewRef}
          >
            <p className="sc-modal__intro">{text.modalIntro}</p>

            <div className="sc-modal__cards" ref={gridRef}>
              {allProjects.map((project) => {
                const isRevealed = !canAnimateGrid || revealed.has(project.id);

                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    forward={forward}
                    moreLabel={text.more}
                    ariaLabel={`${text.projectDetails}: ${project.title}`}
                    onOpen={openDetail}
                    dataRevealId={project.id}
                    extraClass={`sc-card--grid${
                      canAnimateGrid ? " sc-grid-reveal" : ""
                    }${isRevealed ? " is-revealed" : ""}`}
                    tabIndex={isRevealed ? 0 : -1}
                    interactiveTabIndex={isRevealed ? 0 : -1}
                  />
                );
              })}
            </div>

            <button
              className="sc-modal__to-top"
              type="button"
              onClick={() =>
                scrollRef.current?.scrollTo({
                  top: 0,
                  behavior: reducedMotion ? "instant" : "smooth",
                })
              }
            >
              <svg
                className="sc-ui-arrow"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 15.5L12 9L19 15.5" />
              </svg>
              <span>{text.backToTop}</span>
            </button>
          </div>

          {/* DETAIL VIEW (each detail is built once, then cached) */}
          <div
            className="sc-modal__view"
            hidden={view !== "detail"}
            ref={detailViewRef}
          >
            <div>
              {[...visited].map((id) => {
                const project = projectsById.get(id);
                if (!project) return null;

                return (
                  <div
                    className="sc-modal__detail-instance"
                    key={id}
                    hidden={id !== detailId}
                  >
                    <article className="sc-detail">
                      <div className="sc-detail__hero">
                        <div className="sc-detail__head">
                          <span className="sc-card__tag">{project.tag}</span>
                          <h3>{project.title}</h3>
                          <p>{project.summary}</p>
                        </div>
                        <img
                          src={IMG + project.image}
                          alt={project.imageAlt || ""}
                        />
                      </div>

                      <div className="sc-detail__rich">
                        <h4>{project.detailTitle}</h4>
                        <p>{project.detailText}</p>

                        {project.gallery?.length ? (
                          <div className="sc-detail__gallery">
                            {project.gallery.map((src) => (
                              <img
                                key={src}
                                src={IMG + src}
                                alt=""
                                loading="lazy"
                              />
                            ))}
                          </div>
                        ) : null}
                      </div>

                      <div className="sc-detail__foot">
                        <Link className="sc-button" to={projectHref}>
                          {text.fullStory}
                          <ArrowIcon direction={forward} />
                        </Link>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}

/* ==================================================================
   11 — THE PAGE
================================================================== */

export default function ConstructionContracting({
  lang: langProp,
  Link = DefaultLink,
  routes: routesProp,
}) {
  /* language: prop first, then <html dir> */
  const lang =
    langProp ||
    (typeof document !== "undefined" &&
    document.documentElement.dir === "ltr"
      ? "en"
      : "ar");

  const rtl = lang === "ar";
  const forward = rtl ? "left" : "right";
  const backward = rtl ? "right" : "left";

  const routes = useMemo(
    () => ({ ...DEFAULT_ROUTES, ...(routesProp || {}) }),
    [routesProp],
  );

  const text = UI[lang];
  const content = SECTOR[lang];

  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  /* ---------- project data (language text + shared images) ---------- */

  const featured = useMemo(
    () =>
      SECTOR.projects.map((p, i) => ({ ...p, ...content.projects[i] })),
    [content],
  );

  const extras = useMemo(
    () =>
      SECTOR.extraProjects.map((p, i) => ({ ...p, ...content.extraProjects[i] })),
    [content],
  );

  const allProjects = useMemo(() => [...featured, ...extras], [featured, extras]);

  const projectsById = useMemo(
    () => new Map(allProjects.map((p) => [p.id, p])),
    [allProjects],
  );

  const otherSectors = ALL_SECTORS.filter((s) => s.slug !== SECTOR.slug);

  /* ---------- refs ---------- */

  const pageRef = useRef(null);
  const stageRef = useRef(null);
  const viewportRef = useRef(null);
  const railRef = useRef(null);

  const total = featured.length;

  const carousel = useProjectCarousel({
    total,
    rtl,
    stageRef,
    viewportRef,
    railRef,
    reducedMotion,
  });

  /* ---------- modal request ---------- */

  const [modalRequest, setModalRequest] = useState(null);
  const requestCounter = useRef(0);

  const openAll = () =>
    setModalRequest({ type: "grid", key: ++requestCounter.current });

  const openDetail = (id) =>
    setModalRequest({ type: "detail", id, key: ++requestCounter.current });

  /* ---------- body class used by the sector css ---------- */

  useEffect(() => {
    document.body.classList.add("sc-sector");
    return () => document.body.classList.remove("sc-sector");
  }, []);

  /* ---------- scroll reveal ---------- */

  const [motionReady, setMotionReady] = useState(false);

  useLayoutEffect(() => {
    if (!("IntersectionObserver" in window) || reducedMotion) return undefined;

    setMotionReady(true);

    const page = pageRef.current;
    if (!page) return undefined;

    const observer = new IntersectionObserver(
      (entries, current) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("sc-is-visible");
          current.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    page.querySelectorAll(".sc-reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [reducedMotion]);

  /* ---------- hero scroll link ---------- */

  function scrollToProjects(event) {
    event.preventDefault();
    document
      .getElementById("sc-projects")
      ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }

  /* ---------- render ---------- */

  const canLoop = total > 1;

  return (
    <>
      <main
        className={`sc-page${motionReady ? " sc-motion-ready" : ""}`}
        id="sector-page"
        ref={pageRef}
      >
        {/* 01 — HERO */}
        <section className="sc-hero" aria-labelledby="sc-hero-title">
          <img
            className="sc-hero__photo"
            src={IMG + SECTOR.heroImage}
            alt=""
            fetchPriority="high"
            decoding="async"
          />

          <div className="sc-hero__shade" aria-hidden="true" />
          <div className="sc-hero__ambient" aria-hidden="true" />
          <div className="sc-hero__glow" aria-hidden="true" />

          <div className="sc-hero__draft" aria-hidden="true">
            <span className="sc-hero__flow sc-hero__flow--h1" />
            <span className="sc-hero__flow sc-hero__flow--h2" />
            <span className="sc-hero__flow sc-hero__flow--v1" />
            <span className="sc-hero__flow sc-hero__flow--v2" />
          </div>

          <div className="container sc-hero__inner">
            <nav
              className="sc-hero__breadcrumbs"
              aria-label={text.breadcrumb}
            >
              <Link to={routes.home(lang)}>{text.home}</Link>
              <span aria-hidden="true">—</span>
              <Link to={routes.sectors(lang)}>{text.sectors}</Link>
              <span aria-hidden="true">—</span>
              <span aria-current="page">{content.name}</span>
            </nav>

            <div className="sc-hero__content">
              <span className="sc-hero__accent" aria-hidden="true" />
              <h1 className="sc-hero__title" id="sc-hero-title">
                {content.name}
              </h1>
              <p className="sc-hero__tagline">{content.tagline}</p>
            </div>
          </div>

          <a
            className="eh-hero__scroll sc-hero__scroll"
            href="#sc-projects"
            onClick={scrollToProjects}
          >
            <span>{text.viewWork}</span>
            <DownIcon />
          </a>
        </section>

        {/* 02 — ABOUT */}
        <section className="sc-about" aria-labelledby="sc-about-title">
          <div className="container">
            <div className="sc-about__intro">
              <div className="sc-reveal">
                <span className="sc-kicker">{text.aboutKicker}</span>
                <h2 id="sc-about-title">{content.aboutTitle}</h2>
              </div>

              <div className="sc-reveal">
                <p className="sc-about__lead">{content.aboutLead}</p>
                <p className="sc-about__body">{content.aboutBody}</p>
              </div>
            </div>

            <div className="sc-approach">
              {content.approach.map((item, i) => (
                <div className="sc-approach__item sc-reveal" key={item.title}>
                  <span className="sc-approach__num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — PROJECTS */}
        <section
          className="sc-projects"
          id="sc-projects"
          data-sc-carousel
          aria-labelledby="sc-projects-title"
        >
          <div className="container">
            <div className="sc-section-head sc-reveal">
              <div>
                <span className="sc-kicker">{text.projectsKicker}</span>
                <h2 id="sc-projects-title">{text.projectsTitle}</h2>
                <p>{content.projectsIntro}</p>
              </div>
            </div>

            <div className="sc-carousel-stage sc-reveal" ref={stageRef}>
              <SliderArrow
                side="prev"
                direction={backward}
                label={text.prev}
                disabled={!canLoop}
                onPress={carousel.prev}
              />

              <div
                className="sc-slider-viewport"
                ref={viewportRef}
                {...carousel.viewportProps}
              >
                <div
                  className="sc-rail sc-rail--loop"
                  id="sc-project-rail"
                  data-sc-rail
                  tabIndex={0}
                  aria-label={text.projectsTitle}
                  ref={railRef}
                  onTransitionEnd={carousel.onTransitionEnd}
                  onKeyDown={carousel.onRailKeyDown}
                >
                  {carousel.order.map((projectIndex, position) => {
                    const project = featured[projectIndex];
                    const available = position < carousel.visible;

                    return (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        forward={forward}
                        moreLabel={text.more}
                        ariaLabel={`${text.projectDetails}: ${project.title}`}
                        onOpen={openDetail}
                        blocked={carousel.isMoving}
                        tabIndex={available ? 0 : -1}
                        interactiveTabIndex={available ? 0 : -1}
                      />
                    );
                  })}
                </div>
              </div>

              <SliderArrow
                side="next"
                direction={forward}
                label={text.next}
                disabled={!canLoop}
                onPress={carousel.next}
              />
            </div>

            {/* clickable progress */}
            <div
              className={`sc-slider-progress${
                carousel.isCycle ? " is-cycle" : ""
              }`}
              onAnimationEnd={carousel.endCycle}
            >
              <div className="sc-slider-progress__track">
                {featured.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    className={`sc-slider-progress__segment${
                      index === carousel.activeIndex ? " is-active" : ""
                    }${index < carousel.activeIndex ? " is-past" : ""}`}
                    aria-current={
                      index === carousel.activeIndex ? "true" : undefined
                    }
                    aria-label={`${text.goTo} ${index + 1}: ${project.title}`}
                    onClick={() => carousel.goTo(index)}
                  />
                ))}
              </div>

              <span
                className="sc-slider-sr-only"
                aria-live="polite"
                aria-atomic="true"
              >
                {text.projectOf
                  .replace("{n}", carousel.liveIndex + 1)
                  .replace("{total}", total)}
              </span>
            </div>

            <div className="sc-projects__more sc-reveal">
              <button
                className="sc-button"
                type="button"
                id="sc-show-all"
                onClick={openAll}
              >
                {text.viewAll}
                <ArrowIcon direction={forward} />
              </button>
            </div>

            <p className="sc-projects__note">{text.note}</p>
          </div>
        </section>

        {/* 04 — OTHER SECTORS */}
        <section
          className="sc-other sc-other-gallery"
          id="sc-other"
          aria-labelledby="sc-other-title"
        >
          <div className="sc-other-gallery__inner">
            <header className="sc-other-gallery__head sc-reveal">
              <h2 id="sc-other-title">{text.otherTitle}</h2>
              <p>{text.otherSub}</p>
            </header>

            <nav
              className="sc-other-gallery__grid"
              aria-label={text.otherNav}
            >
              {otherSectors.map((sector) => (
                <Link
                  key={sector.slug}
                  className="sc-other-gallery__item sc-reveal"
                  to={routes.sector(sector.slug, lang)}
                >
                  <span className="sc-other-gallery__media">
                    <img
                      src={IMG + sector.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </span>

                  <span className="sc-other-gallery__info">
                    <span className="sc-other-gallery__copy">
                      <span className="sc-other-gallery__name">
                        {sector[lang].name}
                      </span>
                      <span className="sc-other-gallery__desc">
                        {sector[lang].desc}
                      </span>
                    </span>

                    <span className="sc-other-gallery__arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          d={
                            rtl
                              ? "M15.5 5.5L9 12L15.5 18.5"
                              : "M8.5 5.5L15 12L8.5 18.5"
                          }
                        />
                      </svg>
                    </span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </section>

        {/* 05 — CTA */}
        <section
          className="el-cta"
          id="contact-cta"
          aria-labelledby="el-cta-title"
        >
          <div className="container el-cta__inner">
            <h2 className="el-reveal-item" id="el-cta-title">
              {content.ctaTitle}
            </h2>
            <p className="el-reveal-item">{content.ctaText}</p>
            <a
              className="el-cta__link el-reveal-item"
              href={routes.contact(lang)}
            >
              <span>{content.ctaButton}</span>
              <ChevronIcon />
            </a>
          </div>
        </section>
      </main>

      {/* PROJECT MODAL (rendered into document.body) */}
      <ProjectModal
        initial={modalRequest}
        onClosed={() => setModalRequest(null)}
        allProjects={allProjects}
        projectsById={projectsById}
        text={text}
        forward={forward}
        backward={backward}
        sectorLabel={content.modalLabel}
        Link={Link}
        projectHref={routes.project(lang)}
        reducedMotion={reducedMotion}
        pageRef={pageRef}
      />
    </>
  );
}
