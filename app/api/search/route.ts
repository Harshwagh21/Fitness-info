import { createSearchAPI } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

function joinUrl(base: string, slugs: string[]) {
  const path = slugs.join("/");
  return path ? `${base}/${path}` : base;
}

export const { GET } = createSearchAPI("simple", {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: "english",
  search: {
    properties: ["title", "description", "content", "keywords"],
  },
  indexes: async () => {
    const pages = source.getPages();
    const docsIndexes = await Promise.all(
      pages.map(async (page) => {
        const content = await page.data.getText("processed");
        return {
          url: joinUrl("/docs", page.slugs),
          title: page.data.title,
          breadcrumbs: ["Docs"],
          description: page.data.description ?? "",
          content,
          keywords: `${page.data.title} ${page.slugs.join(" ")}`,
        };
      }),
    );

    const toolIndexes = [
      {
        url: "/tools?tool=bmi",
        title: "BMI Calculator",
        breadcrumbs: ["Tools"],
        description: "Body mass index from height and weight.",
        content:
          "BMI calculator. Compute body mass index using metric or imperial units, with standard BMI categories.",
        keywords: "bmi BMI body mass index calculator tools calorie",
      },
      {
        url: "/tools?tool=bmr",
        title: "BMR Calculator",
        breadcrumbs: ["Tools"],
        description: "Basal metabolic rate (Mifflin–St Jeor).",
        content:
          "BMR calculator. Estimate basal metabolic rate using Mifflin–St Jeor formula. Metric or imperial inputs.",
        keywords: "bmr BMR basal metabolic rate calculator mifflin st jeor tools calorie",
      },
      {
        url: "/tools?tool=tdee",
        title: "TDEE Calculator",
        breadcrumbs: ["Tools"],
        description: "Total daily energy expenditure (BMR × activity).",
        content:
          "TDEE calculator. Estimate total daily energy expenditure from BMR and activity level. Metric or imperial inputs.",
        keywords: "tdee TDEE total daily energy expenditure calculator activity tools calorie",
      },
    ];

    return [...docsIndexes, ...toolIndexes];
  },
});
