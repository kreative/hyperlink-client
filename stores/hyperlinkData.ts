import { atom } from "jotai";
import { IHyperlink } from "../types/IHyperlink";

const hyperlinkData = atom({} as IHyperlink);

export { hyperlinkData };
