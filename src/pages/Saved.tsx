import { useUrls } from "@/hooks/useUrls";
import { Url } from "@/types/main";
import { useSave } from "@/hooks/useSave";
import ErrorPage from "@/pages/error-page";
import LinkCard from "@/components/LinkCard";
import NullCard from "@/components/NullCard";
import { useNavigate } from "react-router-dom";
import { useSessionArray } from "@/hooks/useSessionArray";
import { toast } from "react-toastify";
const Saved = () => {
  const { deleteUrl } = useUrls();
  const { getSaved, removetem } = useSave();
  const [links, setLinks] = useSessionArray<Url>("Links", []);

  const navigate = useNavigate();

  const handleUnSave = async (id: string) => {
    try {
      await removetem.mutateAsync(id);
      getSaved.refetch();
    } catch (error: any) {
      toast.error(error || "Error");
    }
  };
  const handledeleteUrl = async (id: string) => {
    try {
      await deleteUrl.mutateAsync(id);
      setLinks((prev) => {
        const updatedLinks = prev.filter((link) => link.id !== id);
        return updatedLinks;
      });

      getSaved.refetch();
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  if (getSaved.error) return <ErrorPage />;

  return (
    <div className="container p-2 ">
      <div className="flex flex-col justify-between ">
        <h1 className="p-0 md:p-[0_1.7em] text-[22px] sm:text-[26px] md:text-[28px] font-extralight text-center">
          {" "}
          Your Saved URLs
        </h1>
        <div>
          {getSaved && getSaved?.data?.length > 0 ? (
            <div className=" my-8 space-y-4">
              {getSaved?.data?.map((link: Url) => (
                <div key={link.id}>
                  <LinkCard
                    link={link}
                    handleUnSave={handleUnSave}
                    handledeleteUrl={handledeleteUrl}
                    isSavePage={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="my-8">
              <NullCard
                handleClick={() => navigate("/")}
                title="Ready to create your links?"
                btnTxt="Get Started"
                isIcon={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Saved;
