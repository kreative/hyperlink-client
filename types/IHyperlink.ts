export interface IHyperlink {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  target: string;
  extension: string;
  clickCount: number;
  favicon: string;
  titleTag: string;
  public: boolean;
  active: boolean;
  ghost: boolean;
  ksn?: number;
}
