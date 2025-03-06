import { Events, EmbedViewOptions, Unsubscribe } from "./types";

export declare class Residently {
  constructor();

  /**
   * Embeds a Residently view inside the specified container element.
   * 
   * @param options Options to configure the embedded view
   */
  embedView(options: EmbedViewOptions): void;

  /**
   * Registers an event listener for specific events.
   * 
   * @param event The event type (e.g., "listingClicked")
   * @param callback The callback to execute when the event is triggered
   * @returns Unbind listener from event.
   */
  on<E extends keyof Events>(event: E, callback: Events[E]): Unsubscribe;
}