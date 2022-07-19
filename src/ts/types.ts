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
