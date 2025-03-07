import { Events, Unsubscribe, EmbedViewOptions } from './types'
export class Residently {
  private iframe?: HTMLIFrameElement

  private events: { [E in keyof Events]?: Events[E][] } = {}

  constructor() {
    // eslint-disable-next-line no-console
    console.log("Residently SDK initialised");
  }

  embedView(options: EmbedViewOptions): void {
    const { container, view, collectionToken, listingId } = options

    // Validate inputs
    if (view === 'collection' && !collectionToken) {
      throw new Error(
        "A collectionToken is required for the 'collection' view."
      )
    }

    if (view === 'listing' && !listingId) {
      throw new Error("A listingId is required for the 'listing' view.")
    }

    // Construct the iframe URL
    const iframeSrc = this.buildIframeUrl(view, collectionToken, listingId)

    // Create and append the iframe
    this.iframe = document.createElement('iframe')
    this.iframe.src = iframeSrc
    this.iframe.style.width = '100%'
    this.iframe.style.height = '100%'
    this.iframe.style.border = 'none'

    // Clear container and append iframe
    container.innerHTML = ''
    container.appendChild(this.iframe)

    // Set up postMessage listener for iframe communication
    window.addEventListener('message', event => this.handleMessage(event))
  }

  on<K extends keyof Events>(event: K, callback: Events[K]): Unsubscribe {
    ;(this.events[event] ||= [] as Events[K][]).push(callback)
    return () => {
      this.events[event] = this.events[event]?.filter(i => callback !== i)
    }
  }

  private emit<K extends keyof Events>(event: K, arg: string): void {
    const callbacks = (this.events[event] || []) as Events[K][]
    callbacks.forEach(callback => callback(arg))
  }

  private buildIframeUrl(
    view: EmbedViewOptions['view'],
    collectionToken?: string,
    listingId?: string
  ): string {
    const baseUrl = 'https://api.residently.com/embed' // Replace with the actual Residently API URL
    const params = new URLSearchParams()

    params.set('view', view)
    if (collectionToken) {
      params.set('collection_token', collectionToken)
    }

    if (listingId) {
      params.set('listing_id', listingId)
    }

    return `${baseUrl}?${params.toString()}`;
  }

  private handleMessage(event: MessageEvent): void {
    // Validate event origin (optional, replace with Residently's actual domain)
    if (event.origin !== 'https://api.residently.com') {
      console.warn('Untrusted message origin:', event.origin)
      return
    }

    const messageData = event.data

    // Emit "listingClicked" event when message from iframe contains listing data
    if (messageData?.type === 'listingClicked' && messageData?.listingId) {
      this.emit('listingClicked', messageData.listingId)
    }
  }
}
