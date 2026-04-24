import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <span class="page-title-icon" aria-hidden="true">
          <svg viewBox="0 0 36 32" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 28 4 L 6 28 M 17 16 L 30 28"
              stroke="currentColor"
              stroke-width="5"
              stroke-linecap="round"
              fill="none"
            />
          </svg>
        </span>
        <span class="page-title-text">{title}</span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
  font-family: var(--titleFont);
}
.page-title a,
.page-title a:hover {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  text-decoration: none;
  color: var(--dark) !important;
  font-weight: 700 !important;
}
.page-title-icon {
  display: inline-flex;
  align-items: center;
  color: #2d5bff;
  width: 1.5em;
  height: 1.5em;
  flex-shrink: 0;
}
.page-title-icon svg {
  width: 100%;
  height: 100%;
}
.page-title-text {
  color: inherit;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
