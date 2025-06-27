import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteTitle, SiteDescription } from "../data/site.json";

export async function GET(context) {
  const projects = await getCollection("projects");
  return rss({
    title: siteTitle,
    description: SiteDescription,
    site: context.site,
    items: projects.map((project) => ({
      ...project.data,
      link: `/portfolio/projects/${project.id}/`,
    })),
  });
}
