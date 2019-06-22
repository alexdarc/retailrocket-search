export interface Product {
  Algorithm?: string;
  BuyUrl?: string;
  CategoryIds?: number[];
  CategoryNames?: string[];
  CategoryPathsToRoot?: number[][];
  Color?: string;
  Description?: string;
  GroupId?: string;
  ItemId: number;
  Model?: string;
  Name: string;
  OldPrice?: number;
  Params?: object;
  PictureUrl?: string;
  Price?: number;
  Regions?: string[];
  Size?: string;
  StockId?: string;
  TypePrefix?: string;
  Url?: string;
  Vendor?: string;
  Weight?: number;
}
