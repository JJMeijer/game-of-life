export interface Cell {
    active: boolean;
    x: number;
    y: number;
    w: number;
    h: number;
    row: number;
    col: number;
}

export interface Row {
    [key: string]: Cell;
}

export interface Data {
    [key: string]: Row;
}

export interface Transitions {
    live: Cell[];
    die: Cell[];
}

interface EventDataCoordinates {
    rowIndex: number;
    colIndex: number;
}

type EventDataEmpty = undefined;

export type EventData = EventDataCoordinates | EventDataEmpty;

export interface SubscriberCallback {
    (data?: EventData): void;
}

export interface SubscriberDictionary {
    [key: string]: SubscriberCallback[];
}
