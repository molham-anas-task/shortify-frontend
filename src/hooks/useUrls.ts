import { useLoading } from "@/Context/Loading-provider";
import api from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUrls = () => {
  const { setIsLoading } = useLoading();

  const getUrls = useQuery({
    queryKey: ["urls"],
    queryFn: async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/links/user");
        return response.data;
      } catch (err: any) {
        const Msg = err?.response?.data?.error || "Error";
        throw Msg;
      } finally {
        setIsLoading(false);
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000),
  });

  const createUrl = useMutation({
    mutationFn: async (data: { originalUrl: string }) => {
      setIsLoading(true);

      try {
        const response = await api.post("/links/shorten", {
          originalUrl: data.originalUrl,
        });
        const short = await response.data;
        return short;
      } catch (err: any) {
        const Msg = err?.response?.data?.error || "Error";
        throw Msg;
      } finally {
        setIsLoading(false);
      }
    },
  });
  const deleteUrl = useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await api.delete(`/links/${id}`);
        const short = await response.data;
        return short;
      } catch (err: any) {
        const Msg = err?.response?.data?.error || "Error";
        throw Msg;
      }
    },
  });

  return { getUrls, createUrl, deleteUrl };
};
