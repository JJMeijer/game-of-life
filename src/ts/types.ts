export interface Cell {
    active: boolean;
    x: number;
    y: number;
    w: number;
    h: number;
}

export type Row = Cell[];
export type Data = Row[];
