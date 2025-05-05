import { FC, useRef } from "react";
import { Card } from "./ui/card";
import {
  Copy,
  Heart,
  Link,
  MousePointerClick,
  QrCode,
  Share2,
  Trash2,
} from "lucide-react";
import { handleCopy, handleShare } from "@/lib/utils";
import { CardProps } from "@/types/main";
import { Button } from "./ui/button";
import QRCode from "react-qr-code";

const LinkCard: FC<CardProps> = ({
  link,
  handleUnSave,
  handledeleteUrl,
  isTrash = true,
  isClicks = true,
  isSavePage = false,
  handleSave,
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const handleDownload = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "qr-code.png";
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };
  return (
    <Card className="p-0 flex-row" key={link.id}>
      <div className="flex justify-center items-center bg-[#ded8d8] dark:bg-[#565353] p-[10px] md:p-[15px] rounded-[10px_0_0_10px]">
        {" "}
        <Link className="m-0 mx-3 w-[25px] md:w-[35px] h-[25px] md:h-[35px]" />
      </div>
      <div className="flex-1 py-2 md:py-4 pr-2 md:pr-4  flex flex-col justify-between gap-2 md:gap-4 ">
        <div className="flex justify-between items-center">
          <div>
            {" "}
            <p className="text-[14px] font-semibold text-[var(--muted-foreground)]">
              Your shorted link
            </p>
            <div className="flex items-center gap-4">
              <a
                href={
                  link?.shortUrl.startsWith("http")
                    ? link.shortUrl
                    : `https://${link?.shortUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[14px]"
              >
                {link?.shortCode}
              </a>
              <button
                onClick={() => handleCopy(link)}
                className="cursor-pointer"
              >
                <Copy className="w-[15px] md:w-[20px] " />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => handleShare(link)}
              className="cursor-pointer"
            >
              <Share2 className="w-[15px] md:w-[20px] " />
            </button>
            {isSavePage ? (
              <button
                className="cursor-pointer"
                onClick={() => handleUnSave(link.id)}
              >
                <Heart
                  className="w-[15px] md:w-[20px] "
                  fill="red"
                  stroke="red"
                />
              </button>
            ) : link.isSaved ? (
              <button
                className="cursor-pointer"
                onClick={() => handleUnSave(link.id)}
              >
                <Heart
                  className="w-[15px] md:w-[20px] "
                  fill="red"
                  stroke="red"
                />
              </button>
            ) : (
              <button
                className="cursor-pointer"
                onClick={() => handleSave(link.id)}
              >
                <Heart className="w-[15px] md:w-[20px] " />
              </button>
            )}

            {isTrash && (
              <button
                className="cursor-pointer"
                onClick={() => handledeleteUrl(link.id)}
              >
                <Trash2 className="w-[15px] md:w-[20px] " />
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center flex-col md:flex-row gap-3 md:gap-0">
          <div className="flex justify-between md:justify-start items-center gap-2 md:gap-5 w-full md:w-fit">
            <div>
              <p className="text-[14px] font-semibold text-[var(--muted-foreground)]">
                Destination URL
              </p>
              <div className="flex items-center gap-2 md:gap-4 break-all mr-9">
                <a
                  href={link?.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-[14px] font-extraligh "
                >
                  {link?.originalUrl}
                </a>
              </div>
            </div>
            
          </div>
          <div className="flex justify-between md:justify-start items-center gap-2 md:gap-5 w-full md:w-fit">
            {isClicks && (
                <div className="flex  items-center justify-center flex-col ">
                  <p className="text-[14px] font-semibold text-[var(--muted-foreground)]">Clicks</p> 
                  <div className="flex items-center gap-2">
                    <MousePointerClick className="w-[15px] md:w-[20px] " />
                    <p className="text-[14px] font-extralight">
                      {link?.clickCount}
                    </p>
                  </div>
                </div>
              )}
            <Button
              onClick={handleDownload}
              className="w-fit md:w-fit flex items-center justify-center gap-1 color-[#5d5d5d] p-[14.5px_30px] leading-[23px] cursor-pointer"
            >
              Download
              <QrCode />
            </Button>
            <div className="hidden" ref={qrRef}>
              <QRCode value={link?.shortUrl ?? ""} size={75} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LinkCard;
