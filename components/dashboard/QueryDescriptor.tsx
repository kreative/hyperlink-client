import { useAtom } from "jotai";

import { queryDescriptorState } from "../../stores/queryDescriptorState";

export default function QueryDescriptor(): JSX.Element {
  const [queryDescription] = useAtom(queryDescriptorState);

  return (
    <div className="text-right">
      <span className="text-sm text-gray-500 pb-2 pr-2 inline-block align-bottom">
        {queryDescription}
      </span>
    </div>
  );
}
