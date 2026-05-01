const DIAGRAM_SELECTOR = '.vp-doc .d2-diagram'
const ZOOM_CLASS = 'leaf-diagram-zoom'

let lastFocusedElement: HTMLElement | null = null

function enhanceDiagrams() {
  document.querySelectorAll<HTMLElement>(DIAGRAM_SELECTOR).forEach((diagram) => {
    if (diagram.dataset.zoomReady === 'true') return

    diagram.dataset.zoomReady = 'true'
    diagram.tabIndex = 0
    diagram.role = 'button'
    diagram.title = 'Open larger diagram'
    diagram.setAttribute('aria-label', 'Open larger diagram')
  })
}

function closeZoom() {
  document.querySelector(`.${ZOOM_CLASS}`)?.remove()
  document.body.classList.remove('leaf-diagram-zoom-open')
  lastFocusedElement?.focus()
  lastFocusedElement = null
}

function openZoom(diagram: HTMLElement) {
  closeZoom()

  lastFocusedElement = document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null

  const overlay = document.createElement('div')
  overlay.className = ZOOM_CLASS
  overlay.setAttribute('role', 'dialog')
  overlay.setAttribute('aria-modal', 'true')
  overlay.setAttribute('aria-label', 'Expanded diagram')

  const panel = document.createElement('div')
  panel.className = `${ZOOM_CLASS}__panel`

  const closeButton = document.createElement('button')
  closeButton.className = `${ZOOM_CLASS}__close`
  closeButton.type = 'button'
  closeButton.textContent = 'Close'
  closeButton.addEventListener('click', closeZoom)

  const content = document.createElement('div')
  content.className = `${ZOOM_CLASS}__content`
  content.innerHTML = diagram.innerHTML

  panel.append(closeButton, content)
  overlay.append(panel)
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeZoom()
  })

  document.body.append(overlay)
  document.body.classList.add('leaf-diagram-zoom-open')
  closeButton.focus()
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target instanceof Element ? event.target : null
  const diagram = target?.closest<HTMLElement>(DIAGRAM_SELECTOR)

  if (!diagram) return

  event.preventDefault()
  openZoom(diagram)
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeZoom()
    return
  }

  const target = event.target instanceof Element ? event.target : null
  const diagram = target?.closest<HTMLElement>(DIAGRAM_SELECTOR)
  if (!diagram || (event.key !== 'Enter' && event.key !== ' ')) return

  event.preventDefault()
  openZoom(diagram)
}

function initDiagramZoom() {
  enhanceDiagrams()

  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onDocumentKeydown)

  const observer = new MutationObserver(enhanceDiagrams)
  observer.observe(document.body, { childList: true, subtree: true })
}

if (typeof window !== 'undefined' && !(window as any).__leafDiagramZoomReady) {
  ;(window as any).__leafDiagramZoomReady = true

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDiagramZoom, { once: true })
  } else {
    initDiagramZoom()
  }
}
