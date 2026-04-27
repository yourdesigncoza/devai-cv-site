import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { concatenateResources } from "../util/resources"
import Explorer from "./Explorer"
// @ts-ignore
import hamburgerNavScript from "./scripts/hamburgerNav.inline"

const hamburgerNavCss = `
.hamburger-nav {
  display: inline-flex;
  align-items: center;
}

.hamburger-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--lightgray);
  border-radius: 6px;
  padding: 0.4rem;
  cursor: pointer;
  color: var(--dark);
  transition: border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease;
}
.hamburger-toggle:hover {
  border-color: var(--secondary);
  color: var(--secondary);
  background: var(--highlight);
}
.hamburger-toggle svg {
  width: 1.1rem;
  height: 1.1rem;
}

.hamburger-drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(23, 19, 33, 0.35);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0s linear 0.2s;
  z-index: 99;
}
.hamburger-drawer-backdrop.open {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.2s ease;
}

.hamburger-drawer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 320px;
  max-width: 85vw;
  background: #ffffff;
  transform: translateX(-100%);
  transition: transform 0.25s ease;
  z-index: 100;
  overflow-y: auto;
  padding: 1.25rem 1.5rem 2rem 1.5rem;
  box-shadow: 2px 0 20px rgba(23, 19, 33, 0.08);
  box-sizing: border-box;
}
.hamburger-drawer.open {
  transform: translateX(0);
}

.hamburger-drawer-head {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.hamburger-drawer-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--lightgray);
  border-radius: 6px;
  padding: 0.35rem;
  cursor: pointer;
  color: var(--dark);
  transition: border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease;
}
.hamburger-drawer-close:hover {
  border-color: var(--secondary);
  color: var(--secondary);
  background: var(--highlight);
}
.hamburger-drawer-close svg {
  width: 1.1rem;
  height: 1.1rem;
}

.hamburger-drawer-content {
  /* Scope for the Explorer component rendered inside. */
}
.hamburger-drawer-content .explorer {
  padding: 0;
}
.hamburger-drawer-content button.mobile-explorer {
  display: none !important;
}
.hamburger-drawer-content button.desktop-explorer {
  display: flex !important;
}
.hamburger-drawer-content .explorer-content {
  position: static !important;
  transform: none !important;
  visibility: visible !important;
  width: auto !important;
  max-width: none !important;
  height: auto !important;
  max-height: none !important;
  padding: 0.5rem 0 0 0 !important;
  background-color: transparent !important;
  overflow-y: visible !important;
}
.hamburger-drawer-content .explorer-ul li {
  padding: 0.15rem 0;
}
`

export default (() => {
  const ExplorerComponent = Explorer({ useSavedState: false, folderDefaultState: "collapsed" })

  const HamburgerNav: QuartzComponent = (props: QuartzComponentProps) => {
    return (
      <div class={classNames(props.displayClass, "hamburger-nav")}>
        <button
          class="hamburger-toggle"
          aria-label="Open menu"
          aria-expanded="false"
          aria-controls="hamburger-drawer"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
        <div class="hamburger-drawer-backdrop" aria-hidden="true"></div>
        <aside
          class="hamburger-drawer"
          id="hamburger-drawer"
          aria-hidden="true"
          aria-label="Site navigation"
        >
          <div class="hamburger-drawer-head">
            <button
              class="hamburger-drawer-close"
              aria-label="Close menu"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
          <div class="hamburger-drawer-content">
            <ExplorerComponent {...props} />
          </div>
        </aside>
      </div>
    )
  }

  HamburgerNav.css = concatenateResources(ExplorerComponent.css, hamburgerNavCss)
  HamburgerNav.afterDOMLoaded = concatenateResources(
    ExplorerComponent.afterDOMLoaded,
    hamburgerNavScript,
  )
  HamburgerNav.beforeDOMLoaded = ExplorerComponent.beforeDOMLoaded

  return HamburgerNav
}) satisfies QuartzComponentConstructor
