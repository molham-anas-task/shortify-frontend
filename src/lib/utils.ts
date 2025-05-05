import { Url } from "@/types/main";
import { clsx, type ClassValue } from "clsx";
import { Bounce, toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const handleCopy = async (link: Url) => {
  try {
    await navigator.clipboard.writeText(link?.shortUrl ?? "");
    toast.success("Copied", {
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      transition: Bounce,
    });
  } catch {
    toast.error("Error", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
};

export const handleShare = async (link: Url) => {
  if (navigator.share) {
    try {
      const fullUrl = link?.shortUrl.startsWith("http")
        ? link.shortUrl
        : `https://${link.shortUrl}`;
      await navigator.share({
        title: "Short Url",
        url: fullUrl,
      });
    } catch (error) {
      toast.error("Error", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }
};
