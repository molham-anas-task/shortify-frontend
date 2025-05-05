import Spinner from "./ui/spinner";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-[70vh]">
      <Spinner />
    </div>
  );
};
