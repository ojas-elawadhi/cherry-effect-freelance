import sourceArticles from "./articles-source.json";

const articleDetails = {
  "entering-uk-electric-vehicle-market": {
    shortTitle: "Entering the UK Electric Vehicle Market",
    category: "Market Entry",
    description:
      "A strategic read of the opportunity, regulation, buyer behaviour, and risks shaping the UK EV market for international manufacturers.",
    year: "2020",
    publishedYear: "2020",
    author: "Charvi Madan",
    readTime: "10 min read",
  },
  "how-firms-compete-across-borders": {
    shortTitle: "How Firms Compete Across Borders",
    category: "International Strategy",
    description:
      "A practical guide to the institution-based view, OLI framework, and integration-responsiveness choices behind international growth.",
    year: "2021",
    publishedYear: "2021",
    author: "The Cherry Effect",
    readTime: "12 min read",
  },
  "building-home-fitness-studio-india": {
    shortTitle: "Building a Home Fitness Studio Business in India",
    category: "New Ventures",
    description:
      "A feasibility study covering demand, competition, business-model design, and the launch case for an at-home fitness service in India.",
    year: "2021",
    publishedYear: "2021",
    author: "Tapan Kumar Awasthy",
    readTime: "14 min read",
  },
  "weathering-the-storm-of-covid-19": {
    shortTitle: "Weathering the Storm of COVID-19",
    category: "Strategic Case Study",
    description:
      "A case study of how IHCL and Taj Hotels responded to the pandemic through operational resilience, brand trust, and strategic adaptation.",
    year: "2020",
    publishedYear: "2020",
    author: "The Cherry Effect",
    readTime: "11 min read",
  },
};

const referenceStarts = {
  "entering-uk-electric-vehicle-market": [
    "Cateora,",
    "Bedingfield,",
    "Carrington,",
    "Deloitte.",
    "House of Commons.",
    "International Energy Agency.",
    "Kumar,",
    "Morton,",
    "Schwanen,",
  ],
  "how-firms-compete-across-borders": [
    "Akter,",
    "Alaydi,",
    "Bartlett,",
    "Brewster,",
    "Buccieri,",
    "Dunning,",
    "Forbes,",
    "Nithisathian,",
    "Peng,",
    "Pícha,",
    "Rugman,",
    "Singh,",
    "Tanriverdi,",
    "Todorov,",
    "Velikorossov,",
    "Yamazaki,",
  ],
  "building-home-fitness-studio-india": [
    "Alsos,",
    "Anderer,",
    "Bracko,",
    "Burns,",
    "Casadesus-Masanell,",
    "Crowther,",
    "Daniel,",
    "Dar,",
    "David,",
    "Dobbs,",
    "Dooly,",
    "Elkatawneh,",
    "Eroğlu,",
    "Falardeau,",
    "Gite,",
    "Gruber,",
    "Health Club Management.",
    "Jain,",
    "Kaur,",
    "Kritikos,",
    "Leape,",
    "Ligozat,",
    "Lowry,",
    "Lufkin,",
    "Magretta,",
    "Mishra,",
    "Ojasalo,",
    "Ovans,",
    "Piñeiro-Otero,",
    "Pokorná,",
    "Kanchana,",
    "Reynolds,",
    "Rogers,",
    "Roos,",
    "Shepherd,",
    "Singh,",
    "Slávik,",
    "Sudhir,",
    "Thabit,",
    "The Wisconsin Economic Development Corporation.",
    "Vora,",
    "Woodruff,",
    "York,",
  ],
  "weathering-the-storm-of-covid-19": [
    "Chanwani,",
    "Gandhi,",
    "Hotelivate.",
    "Indian Brand Equity Foundation.",
    "IHCL.",
    "Kumar,",
    "Lall,",
    "Express Food & Hospitality.",
    "Patel,",
    "UK Essays.",
  ],
};

function normaliseText(text) {
  return text
    .replaceAll("—", "-")
    .replaceAll("£350– 400", "£350–400")
    .replaceAll("car- rental", "car-rental")
    .replaceAll("integration– responsiveness", "integration–responsiveness");
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function splitLabelledText(text, labels, ariaLabel) {
  const starts = labels.map((label) => text.indexOf(label));

  return {
    type: "list",
    ariaLabel,
    items: labels.map((label, index) => {
      const afterLabel = starts[index] + label.length;
      const separator = text[afterLabel] === "." ? "." : "";
      const contentStart = afterLabel + separator.length;
      const contentEnd = starts[index + 1] ?? text.length;

      return {
        label,
        separator,
        text: text.slice(contentStart, contentEnd).trim(),
      };
    }),
  };
}

function splitReferences(text, slug) {
  const starts = referenceStarts[slug].map((marker, index, markers) => {
    const searchFrom = index === 0 ? 0 : text.indexOf(markers[index - 1]) + 1;
    return text.indexOf(marker, searchFrom);
  });

  return starts.map((start, index) => {
    const end = starts[index + 1] ?? text.length;
    return text.slice(start, end).trim();
  });
}

function makeTable(slug, block) {
  if (slug === "building-home-fitness-studio-india") {
    return {
      type: "table",
      caption: "Home fitness survey results",
      headers: ["Question", "Result"],
      rows: [
        ["Bought workout equipment during lockdown", "73% yes / 27% no"],
        [
          "Biggest priority when choosing a gym",
          "Accessibility 45%, Personal training 25%, Equipment type 20%, Transformation 10%",
        ],
        ["Would prefer a home gym setup", "60% home / 40% gym"],
        ["Consider a home fitness studio a luxury", "42% yes / 58% no"],
        [
          "Willing to pay £2,000+ (₹200,000+) for a home setup",
          "33% yes / 67% no",
        ],
      ],
    };
  }

  if (
    slug === "weathering-the-storm-of-covid-19" &&
    block.rows[0].startsWith("Strengths")
  ) {
    return {
      type: "table",
      caption: "IHCL SWOT analysis",
      headers: ["Dimension", "Findings"],
      rows: [
        [
          "Strengths",
          "Brand loyalty; Credibility; Strong reputation; Intellectual property and protected assets",
        ],
        [
          "Weaknesses",
          "High-cost service; Less-established brand name internationally; High dependency on the luxury market",
        ],
        [
          "Opportunities",
          "Rapid growth in domestic tourism; Rising incomes; Entry into new market segments",
        ],
        ["Threats", "Increasing competition; Terrorism; Outbound tourism"],
      ],
    };
  }

  if (slug === "weathering-the-storm-of-covid-19") {
    return {
      type: "table",
      caption: "IHCL strategy comparison",
      headers: [
        "Goals and criteria",
        "S1: Mid-scale expansion",
        "S2: Related services",
      ],
      rows: [
        ["Short-run profitability (4 years)", "$42MM", "$28MM"],
        ["Long-run profitability (5–10 years)", "High", "Low"],
        ["Market share (by year 5)", "34%", "22%"],
        ["Impact on employees", "No layoffs", "No change"],
      ],
    };
  }

  return block;
}

function structureBlocks(sourceArticle) {
  const { slug } = sourceArticle;
  const blocks = sourceArticle.blocks.flatMap((sourceBlock) => {
    const block = sourceBlock.text
      ? { ...sourceBlock, text: normaliseText(sourceBlock.text) }
      : sourceBlock;

    if (block.type === "table") {
      return [makeTable(slug, block)];
    }

    if (
      slug === "how-firms-compete-across-borders" &&
      block.text === "Deciding where to operate: the OLI framework"
    ) {
      return [{ ...block, type: "heading", level: 3 }];
    }

    if (
      slug === "how-firms-compete-across-borders" &&
      block.text.startsWith("Ownership advantage.")
    ) {
      return [
        splitLabelledText(
          block.text,
          [
            "Ownership advantage",
            "Location advantage",
            "Internalisation advantage",
          ],
          "The three OLI advantages",
        ),
      ];
    }

    const strategyHeading =
      "Deciding how to compete: corporate strategy and the I-R framework";
    if (
      slug === "how-firms-compete-across-borders" &&
      block.text.startsWith(strategyHeading)
    ) {
      return [
        { type: "heading", text: strategyHeading, level: 3 },
        {
          type: "paragraph",
          text: block.text.slice(strategyHeading.length).trim(),
        },
      ];
    }

    if (
      slug === "how-firms-compete-across-borders" &&
      block.text.startsWith("International strategy (low integration")
    ) {
      return [
        splitLabelledText(
          block.text,
          [
            "International strategy (low integration, low responsiveness)",
            "Multinational strategy (low integration, high responsiveness)",
            "Global strategy (high integration, low responsiveness)",
            "Transnational strategy (high integration, high responsiveness)",
          ],
          "Integration-responsiveness strategies",
        ),
      ];
    }

    const valueHeading = "The value proposition and marketing mix";
    if (
      slug === "building-home-fitness-studio-india" &&
      block.text.startsWith(valueHeading)
    ) {
      return [
        { type: "heading", text: valueHeading, level: 3 },
        {
          type: "paragraph",
          text: block.text.slice(valueHeading.length).trim(),
        },
      ];
    }

    if (
      slug === "weathering-the-storm-of-covid-19" &&
      block.text.startsWith("Restructure.")
    ) {
      return [
        splitLabelledText(
          block.text,
          ["Restructure", "Reimagine", "Reengineer"],
          "The three pillars of IHCL Aspiration 2022",
        ),
      ];
    }

    return [block];
  });

  let referencesIndex = blocks.findIndex(
    (block) => block.type === "heading" && block.text === "References",
  );

  if (referencesIndex === -1) {
    referencesIndex = blocks.length - 1;
  }

  const hasReferencesHeading = blocks[referencesIndex].text === "References";
  const contentBlocks = blocks.slice(0, referencesIndex);
  const referenceBlocks = hasReferencesHeading
    ? blocks.slice(referencesIndex + 1)
    : blocks.slice(referencesIndex);
  const referenceText = referenceBlocks
    .map((block) => block.text)
    .filter(Boolean)
    .join(" ");
  const structuredBlocks = [
    ...contentBlocks,
    { type: "heading", text: "References", level: 2 },
    {
      type: "references",
      items: splitReferences(referenceText, slug),
    },
  ];

  return structuredBlocks.map((block) => {
    if (block.type !== "heading") {
      return block;
    }

    return {
      ...block,
      level: block.level ?? 2,
      id: slugifyHeading(block.text),
    };
  });
}

export const articles = sourceArticles.map((sourceArticle) => {
  const blocks = structureBlocks(sourceArticle);
  const metadata = articleDetails[sourceArticle.slug];
  const wordCount = [
    sourceArticle.title,
    ...sourceArticle.blocks.map((block) =>
      block.text ? block.text : block.rows?.join(" ") ?? "",
    ),
  ]
    .join(" ")
    .trim()
    .split(/\s+/).length;

  return {
    ...sourceArticle,
    ...metadata,
    href: `/article/${sourceArticle.slug}`,
    standfirst: metadata.description,
    blocks,
    wordCount,
    toc: blocks
      .filter((block) => block.type === "heading")
      .map(({ id, level, text }) => ({ id, level, text })),
  };
});

export const articleCards = articles.map(
  ({
    slug,
    title,
    shortTitle,
    category,
    description,
    href,
    year,
    readTime,
  }) => ({
    slug,
    title,
    shortTitle,
    category,
    description,
    href,
    year,
    readTime,
  }),
);

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}

export function getNextArticle(slug) {
  const articleIndex = articles.findIndex((article) => article.slug === slug);
  return articles[(articleIndex + 1) % articles.length];
}
