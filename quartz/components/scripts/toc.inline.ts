// [Patched by graphify-overhaul 2026-04-24]
// Quartz's original logic used an IntersectionObserver that marked every
// heading whose top was above the viewport bottom as .in-view — producing
// cumulative highlights where every section you had already scrolled past
// stayed active. Replaced with a single-active-section tracker that follows
// the standard docs-site scrollspy pattern: exactly one ToC entry is marked
// .in-view at a time, corresponding to the section currently being read.

const READ_THRESHOLD = 150 // px from viewport top — "you are reading this section"

let trackedHeadings: HTMLElement[] = []
let rafPending = false

function updateActiveSection() {
  rafPending = false
  // Fallback: before scrolling, highlight the first heading so the ToC never
  // appears with zero active items on page load.
  let activeId: string | null = trackedHeadings[0]?.id ?? null
  for (const h of trackedHeadings) {
    if (h.getBoundingClientRect().top <= READ_THRESHOLD) {
      activeId = h.id
    } else {
      break
    }
  }
  for (const a of document.querySelectorAll("a.in-view")) {
    a.classList.remove("in-view")
  }
  if (activeId) {
    for (const a of document.querySelectorAll(`a[data-for="${activeId}"]`)) {
      a.classList.add("in-view")
    }
  }
}

function scheduleUpdate() {
  if (rafPending) return
  rafPending = true
  requestAnimationFrame(updateActiveSection)
}

function toggleToc(this: HTMLElement) {
  this.classList.toggle("collapsed")
  this.setAttribute(
    "aria-expanded",
    this.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )
  const content = this.nextElementSibling as HTMLElement | undefined
  if (!content) return
  content.classList.toggle("collapsed")
}

function setupToc() {
  for (const toc of document.getElementsByClassName("toc")) {
    const button = toc.querySelector(".toc-header")
    const content = toc.querySelector(".toc-content")
    if (!button || !content) return
    button.addEventListener("click", toggleToc)
    window.addCleanup(() => button.removeEventListener("click", toggleToc))
  }
}

document.addEventListener("nav", () => {
  setupToc()

  trackedHeadings = Array.from(
    document.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]"),
  )
  updateActiveSection()

  window.addEventListener("scroll", scheduleUpdate, { passive: true })
  window.addEventListener("resize", scheduleUpdate, { passive: true })

  window.addCleanup(() => {
    window.removeEventListener("scroll", scheduleUpdate)
    window.removeEventListener("resize", scheduleUpdate)
  })
})
