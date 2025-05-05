import { useLoading } from "@/Context/Loading-provider";
import api from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSave = () => {
  const { setIsLoading } = useLoading();

  const getSaved = useQuery({
    queryKey: ["Saved"],
    queryFn: async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/saved");
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

  const addItem = useMutation({
    mutationFn: async (id: string) => {
      setIsLoading(true);

      try {
        const response = await api.post(`/saved/${id}`);
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
  const removetem = useMutation({
    mutationFn: async (id: string) => {
      setIsLoading(true);

      try {
        const response = await api.delete(`/saved/${id}`);
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

  return { getSaved, addItem, removetem };
};
