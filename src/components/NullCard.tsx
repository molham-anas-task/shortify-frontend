import { Card } from "./ui/card";
import { MousePointerClick, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

const NullCard = ({
  title,
  handleClick,
  btnTxt,
  isIcon = true,
}: {
  title: string;
  handleClick?: () => void;
  btnTxt?: string;
  isIcon?: boolean;
}) => {
  return (
    <Card className="p-0 flex-row">
      <div className="flex justify-center items-center bg-[#ded8d8] dark:bg-[#565353] p-[15px] rounded-[10px_0_0_10px]">
        <MousePointerClick className="m-0 mx-3" width={35} height={35} />
      </div>
      <div className="flex-1 py-4 pr-4 flex items-center justify-between ">
        <p>{title}</p>

        <Button
          onClick={handleClick}
          className="w-fit flex items-center justify-center gap-1 color-[#5d5d5d] p-[14.5px_30px] leading-[23px] cursor-pointer"
        >
          {btnTxt}
          {isIcon && <RefreshCcw />}
        </Button>
      </div>
    </Card>
  );
};

export default NullCard;
