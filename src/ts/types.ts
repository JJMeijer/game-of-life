import { Cell } from "./grid/data";

export interface InitialCellInfo {
    size: number;
    xCells: number;
    yCells: number;
}

export interface Row {
    [key: string]: Cell;
}

export interface Data {
    [key: string]: Row;
}

interface EventDataCoordinates {
    offsetX: number;
    offsetY: number;
}
interface EventDataSpeed {
    speed: number;
}

interface EventDataSize {
    size: number;
}

type EventDataEmpty = undefined;

export type EventData = EventDataCoordinates | EventDataSpeed | EventDataSize | EventDataEmpty;

export interface SubscriberCallback {
    (data?: EventData): void;
}

export interface SubscriberDictionary {
    [key: string]: SubscriberCallback[];
}
