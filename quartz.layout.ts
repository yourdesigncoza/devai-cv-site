import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.ViewGraphLink(),
    Component.Search(),
    Component.HamburgerNav(),
  ],
  // Graph renders here on every page so the global-graph modal markup is always
  // in the DOM. Its rail UI (title + local-graph container) is CSS-hidden in
  // custom.scss; the position:fixed .global-graph-outer modal remains usable
  // and is triggered by the header's ViewGraphLink (class "global-graph-icon").
  //
  // globalGraph.opacityScale: labels fade via (transform.k * opacityScale - 1) / 3.75
  // in graph.inline.ts. Default opacityScale=1 means labels are invisible at
  // initial zoom (transform.k=1) — you have to zoom in past 2x to see names.
  // Bumping to 5 makes labels fully visible on load without needing to zoom.
  afterBody: [
    Component.Graph({
      globalGraph: {
        opacityScale: 5,
      },
    }),
  ],
  footer: Component.Footer({ links: {} }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [],
  right: [Component.DesktopOnly(Component.TableOfContents()), Component.Backlinks()],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [],
  right: [],
}
