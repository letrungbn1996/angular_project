export interface FilterButton {
  type: Filter;
  content: string;
  isActive: boolean;
}

export enum Filter {
  All,
  Active,
  Completed,
}
