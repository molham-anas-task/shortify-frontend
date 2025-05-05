import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UrlFormData, urlSchema } from "@/schemas/urlSchema";
import { toast } from "react-toastify";
import { FormData, Url } from "@/types/main";
import { useUrls } from "@/hooks/useUrls";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import {
  ChevronRight,
  CodeXml,
  Link,
  MousePointerClick,
  QrCode,
} from "lucide-react";
import { useLoading } from "@/Context/Loading-provider";
import { useSessionArray } from "@/hooks/useSessionArray";
import { useSave } from "@/hooks/useSave";
import LinkCard from "./LinkCard";
import NullCard from "./NullCard";

export const LinkForm: React.FC = () => {
  const { createUrl } = useUrls();
  const { addItem, removetem } = useSave();
  const { setIsLoading } = useLoading();
  const UrlForm = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      originalUrl: "",
    },
    mode: "onChange",
  });
  const [links, setLinks] = useSessionArray<Url>("Links", []);
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const short = await createUrl.mutateAsync(data);
      const newLink: Url = {
        id: short.id,
        originalUrl: short.originalUrl,
        shortUrl: short.shortUrl,
        isSaved: short.isSaved,
        shortCode: short.shortCode || "",
        clickCount: short.clickCount,
      };

      setLinks((prev) => {
        const updatedLinks = prev.some((link) => link.id === newLink.id)
          ? prev
          : [newLink, ...prev];
        console.log("Updated Links inside setLinks:", updatedLinks);
        return updatedLinks;
      });
      toast.success("URL Added Successfully");
    } catch (error: any) {
      const Msg = error?.response?.data?.error || "Failed to shorten URL";
      toast.error(Msg);
    } finally {
      setIsLoading(false);
    }
  };
  const handleReGenerate = () => {
    setLinks([]);
    UrlForm.reset();
  };
  const handleUpdateLink = (id: string, updatedData: Partial<Url>) => {
    setLinks((prev) => {
      const updatedLinks = prev.map((link) =>
        link.id === id ? { ...link, ...updatedData } : link
      );
      return updatedLinks;
    });
  };
  const handleSave = async (id: string) => {
    try {
      await addItem.mutateAsync(id);
      handleUpdateLink(id, { isSaved: true });
    } catch (error: any) {
      toast.error(error || "Error");
    }
  };
  const handleUnSave = async (id: string) => {
    try {
      await removetem.mutateAsync(id);
      handleUpdateLink(id, { isSaved: false });
    } catch (error: any) {
      toast.error(error || "Error");
    }
  };
  return (
    <div className="p-2">
      <div className="container">
        <h1 className="p-0 md:p-[0_1.7em] text-[24px] sm:text-[28px] md:text-[32px] font-extralight text-center">
          {" "}
          URL Shortener & QR code generator
        </h1>
        <Form {...UrlForm}>
          <div className="flex justify-center items-center my-8 gap-[16px] ">
            <CodeXml
              className="sm-box bg-[var(--sidebar-border)] hidden lg:block"
              width={48}
              height={48}
            />
            <Link
              className="md-box  bg-[#ded8d8] dark:bg-[#565353] hidden md:block"
              width={72}
              height={72}
            />
            <form
              onSubmit={UrlForm.handleSubmit(onSubmit)}
              className="flex-1 relative flex  justify-between items-center  border-[10px] rounded-[10px] !bg-[var(--secondary)] border-[var(--secondary)] px-0 md:px-[10px_30px] py-[10px]"
            >
              <FormField
                control={UrlForm.control}
                name="originalUrl"
                render={({ field }) => (
                  <FormItem className="flex-1 md:mr-[15px] w-full ">
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Type or paste a link (URL)"
                        className="p-[10px] flex !bg-transparent border-none focus-visible:ring-0 focus-visible:outline-none text-[14px] relative"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute bottom-0 left-4 text-[12px]" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-fit flex items-center justify-center gap-1 color-[#5d5d5d] p-[14.5px_30px] leading-[23px]"
              >
                Shorten
                <ChevronRight />
              </Button>
            </form>
            <QrCode
              className="md-box  bg-[#ded8d8] dark:bg-[#565353] hidden md:block"
              width={72}
              height={72}
            />
            <MousePointerClick
              className="sm-box bg-[var(--sidebar-border)] hidden lg:block"
              width={48}
              height={48}
            />
          </div>
        </Form>

        {links.length > 0 && (
          <div className=" my-8 space-y-4">
            {links.map((link) => (
              <div key={link.id}>
                <LinkCard
                  link={link}
                  handleSave={handleSave}
                  handleUnSave={handleUnSave}
                  isClicks={false}
                  isTrash={false}
                />
              </div>
            ))}
            <NullCard
              handleClick={handleReGenerate}
              title="Ready to create your more links?"
              btnTxt="ReGenerate"
            />
          </div>
        )}
      </div>
    </div>
  );
};
