import { IHyperlink } from "@/types/IHyperlink";

const HyperlinkItem: React.FC<{ hyperlink: IHyperlink }> = ({
  hyperlink,
}): JSX.Element => {
  return (
    <li key={hyperlink.id}>
      <h1>{hyperlink.extension}</h1>
    </li>
  )
};

export default HyperlinkItem;
