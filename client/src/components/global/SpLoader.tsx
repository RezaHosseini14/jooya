import { Loader } from "rsuite";
import { TypeAttributes } from "rsuite/esm/internals/types";

function SpLoader({ size }: { size?: TypeAttributes.Size }) {
  return (
    <div className="grid place-content-center">
      <Loader size={size} center content="درحال بارگذاری ..." vertical />
    </div>
  );
}

export default SpLoader;
