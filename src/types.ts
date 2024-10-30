export interface Position {
  row: number;
  col: number;
}

export interface Ship {
  size: number;
  positions: Position[];
}

// src/types.ts
export interface Position {
  row: number;
  col: number;
}

export interface Ship {
  size: number;
  positions: Position[];
}

export type Cell = "hit" | "miss" | null;
export type Phase = "menu" | "placement" | "playing";
