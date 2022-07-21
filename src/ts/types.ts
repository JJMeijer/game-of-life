import { Cell } from "./grid/data";

export interface Row {
    [key: string]: Cell;
}

export interface Data {
    [key: string]: Row;
}

interface EventDataCoordinates {
    rowIndex: number;
    colIndex: number;
}
interface EventDataSpeed {
    speed: number;
}

type EventDataEmpty = undefined;

export type EventData = EventDataCoordinates | EventDataSpeed | EventDataEmpty;

export interface SubscriberCallback {
    (data?: EventData): void;
}

export interface SubscriberDictionary {
    [key: string]: SubscriberCallback[];
}
