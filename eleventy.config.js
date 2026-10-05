import { load as loadYaml } from "js-yaml";

// All dates in the data files are plain calendar dates (YYYY-MM-DD).
// YAML reads them as midnight UTC, so every formatter below uses UTC
// to keep the day from slipping.
const fmt = (d, opts) =>
  new Date(d).toLocaleDateString("en-US", { timeZone: "UTC", ...opts });

const semesterOf = (d) => {
  const dt = new Date(d);
  const m = dt.getUTCMonth() + 1;
  const y = dt.getUTCFullYear();
  if (m <= 5) return `Spring ${y}`;
  if (m <= 8) return `Summer ${y}`;
  return `Fall ${y}`;
};

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml,yml", (contents) => loadYaml(contents));
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  eleventyConfig.addFilter("longDate", (d) =>
    fmt(d, { weekday: "long", month: "long", day: "numeric", year: "numeric" })
  );
  eleventyConfig.addFilter("shortDate", (d) => fmt(d, { month: "short", day: "numeric" }));
  eleventyConfig.addFilter("dayNum", (d) => fmt(d, { day: "numeric" }));
  eleventyConfig.addFilter("monthName", (d) => fmt(d, { month: "long", year: "numeric" }));
  eleventyConfig.addFilter("monthShort", (d) => fmt(d, { month: "short" }));
  eleventyConfig.addFilter("year", (d) => fmt(d, { year: "numeric" }));
  eleventyConfig.addFilter("weekday", (d) => fmt(d, { weekday: "long" }));
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("semester", semesterOf);

  // Events still to come (as of the build). The page script also hides
  // anything that has passed since the last build.
  eleventyConfig.addFilter("upcoming", (events = []) => {
    const today = new Date().toISOString().slice(0, 10);
    return events
      .filter((e) => new Date(e.date).toISOString().slice(0, 10) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  });

  // Upcoming events grouped by semester, soonest first.
  eleventyConfig.addFilter("upcomingBySemester", (events = []) => {
    const today = new Date().toISOString().slice(0, 10);
    const groups = [];
    events
      .filter((e) => new Date(e.date).toISOString().slice(0, 10) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach((e) => {
        const name = semesterOf(e.date);
        let g = groups.find((x) => x.name === name);
        if (!g) groups.push((g = { name, events: [] }));
        g.events.push(e);
      });
    return groups;
  });

  // Past events grouped by semester, newest first.
  eleventyConfig.addFilter("pastBySemester", (events = []) => {
    const today = new Date().toISOString().slice(0, 10);
    const past = events
      .filter((e) => new Date(e.date).toISOString().slice(0, 10) < today)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    const groups = [];
    for (const e of past) {
      const name = semesterOf(e.date);
      let g = groups.find((x) => x.name === name);
      if (!g) groups.push((g = { name, events: [] }));
      g.events.push(e);
    }
    return groups;
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
