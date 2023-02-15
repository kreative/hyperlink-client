export interface IHyperlink {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  target: string;
  extension: string;
  clickCount: number;
  favicon: string;
  active: boolean;
  ghost: boolean;
  ksn?: number;
}
