import { Enum } from "cc"

export const GameConstant = {
    Line_lenght : 100, 
}

export enum PoolType {
    None = 0,
    Road = 1,
    River = 2, 
    Track = 3,
    Tree = 4,
    Log = 5,
    Car = 6,
    Truck = 7,
    Train = 8,
    Grass = 9,
    Rock = 10,
    LotusLeaf = 11,
    Apple = 12
}

Enum(PoolType);