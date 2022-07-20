import { EventData, SubscriberCallback, SubscriberDictionary } from "./types";

class EventBus {
    private readonly subscriberDictionary: SubscriberDictionary = {};

    subscribe(eventName: string, eventCallback: SubscriberCallback): void {
        const callBackArray = this.subscriberDictionary[eventName] || [];
        callBackArray.push(eventCallback);

        this.subscriberDictionary[eventName] = callBackArray;
    }

    publish(eventName: string, eventData?: EventData): void {
        const callBackArray = this.subscriberDictionary[eventName];

        if (callBackArray) {
            callBackArray.forEach((callback) => {
                callback(eventData);
            });
        }
    }
}

export const eventBus = new EventBus();
