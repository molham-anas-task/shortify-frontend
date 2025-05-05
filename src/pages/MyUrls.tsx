import { useUrls } from "@/hooks/useUrls";
import { Url } from "@/types/main";
import { useSave } from "@/hooks/useSave";
import ErrorPage from "@/pages/error-page";
import LinkCard from "@/components/LinkCard";
import NullCard from "@/components/NullCard";
import { useNavigate } from "react-router-dom";
import { useSessionArray } from "@/hooks/useSessionArray";
const MyUrls = () => {
  const { getUrls, deleteUrl } = useUrls();
  const { addItem, removetem } = useSave();
  const [links, setLinks] = useSessionArray<Url>("Links", []);

  const navigate = useNavigate();

  const handleSave = async (id: string) => {
    const res = await addItem.mutateAsync(id);
    getUrls.refetch();
  };
  const handleUnSave = async (id: string) => {
    await removetem.mutateAsync(id);
    getUrls.refetch();
  };
  const handledeleteUrl = async (id: string) => {
    await deleteUrl.mutateAsync(id);
    setLinks((prev) => {
      const updatedLinks = prev.filter((link) => link.id !== id);
      return updatedLinks;
    });

    getUrls.refetch();
  };

  if (getUrls.error) return <ErrorPage />;
  return (
    <div className="container p-2 ">
      <div className="flex flex-col justify-between ">
        <h1 className="p-0 md:p-[0_1.7em] text-[22px] sm:text-[26px] md:text-[28px] font-extralight text-center">
          {" "}
          Your URLs
        </h1>
        {getUrls && getUrls?.data?.length > 0 ? (
          <div className=" my-8 space-y-4">
            {getUrls?.data?.map((link: Url) => (
              <div key={link.id}>
                <LinkCard
                  link={link}
                  handleSave={handleSave}
                  handleUnSave={handleUnSave}
                  handledeleteUrl={handledeleteUrl}
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
  );
};

export default MyUrls;
