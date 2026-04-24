document.addEventListener("nav", () => {
  const toggle = document.querySelector<HTMLButtonElement>(".hamburger-toggle")
  const drawer = document.querySelector<HTMLElement>(".hamburger-drawer")
  const backdrop = document.querySelector<HTMLElement>(".hamburger-drawer-backdrop")
  const closeBtn = document.querySelector<HTMLButtonElement>(".hamburger-drawer-close")

  if (!toggle || !drawer || !backdrop) return

  const openDrawer = () => {
    drawer.classList.add("open")
    backdrop.classList.add("open")
    toggle.setAttribute("aria-expanded", "true")
    drawer.setAttribute("aria-hidden", "false")
    document.body.style.overflow = "hidden"
  }

  const closeDrawer = () => {
    drawer.classList.remove("open")
    backdrop.classList.remove("open")
    toggle.setAttribute("aria-expanded", "false")
    drawer.setAttribute("aria-hidden", "true")
    document.body.style.overflow = ""
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer()
    }
  }

  toggle.addEventListener("click", openDrawer)
  backdrop.addEventListener("click", closeDrawer)
  closeBtn?.addEventListener("click", closeDrawer)
  document.addEventListener("keydown", onKey)

  window.addCleanup(() => {
    toggle.removeEventListener("click", openDrawer)
    backdrop.removeEventListener("click", closeDrawer)
    closeBtn?.removeEventListener("click", closeDrawer)
    document.removeEventListener("keydown", onKey)
    document.body.style.overflow = ""
  })
})
