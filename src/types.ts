export type Unsubscribe = () => void

export interface Events {
  listingClicked: (listingId: string) => void
  enquirySubmitted: (listingId: string) => void
  viewingBooked: (listingId: string) => void
}

export interface EmbedViewOptions {
  view: "collection" | "listing"
  container: HTMLElement
  listingId?: string
  collectionToken?: string
}