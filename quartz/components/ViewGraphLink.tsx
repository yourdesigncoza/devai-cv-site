import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ViewGraphLink: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <button
      class={classNames(displayClass, "view-graph-link", "global-graph-icon")}
      aria-label="View graph"
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
        <circle cx="12" cy="5" r="2.2" />
        <circle cx="5" cy="19" r="2.2" />
        <circle cx="19" cy="19" r="2.2" />
        <line x1="11" y1="6.8" x2="6" y2="17.2" />
        <line x1="13" y1="6.8" x2="18" y2="17.2" />
        <line x1="7.2" y1="19" x2="16.8" y2="19" />
      </svg>
      <span>View Graph</span>
    </button>
  )
}

ViewGraphLink.css = `
.view-graph-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: transparent;
  border: 1px solid var(--lightgray);
  border-radius: 6px;
  padding: 0.4rem 0.75rem;
  cursor: pointer;
  color: var(--dark);
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  transition: border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease;
}
.view-graph-link:hover {
  border-color: var(--secondary);
  color: var(--secondary);
  background: var(--highlight);
}
.view-graph-link svg {
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
}
.view-graph-link span {
  line-height: 1;
}
@media all and (max-width: 640px) {
  .view-graph-link span {
    display: none;
  }
  .view-graph-link {
    padding: 0.4rem;
  }
}
`

export default (() => ViewGraphLink) satisfies QuartzComponentConstructor
