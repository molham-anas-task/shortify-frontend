import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "@/schemas/loginSchema";
import { RegisterFormData } from "@/schemas/registerSchema";
import Cookies from "js-cookie";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { useLoading } from "@/Context/Loading-provider";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  userName: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: async (userData: LoginFormData) => {
      const { username, password } = userData;
      setIsLoading(true);

      try {
        const response = await api.post("/auth/login", {
          userName: username,
          password,
        });
        toast.success(response.data.message);
        Cookies.set("token", response.data.token, { expires: 7 });
        setUser(response.data.user);
        navigate("/");
        return response.data;
      } catch (err: any) {
        const Msg = err?.response?.data?.error || "Login Failed";
        toast.error(Msg);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const signup = useMutation({
    mutationFn: async (userData: RegisterFormData) => {
      setIsLoading(true);

      const { username, password } = userData;
      try {
        const response = await api.post("/auth/register", {
          userName: username,
          password,
        });
        toast.success(response.data.message);
        Cookies.set("token", response.data.token, { expires: 7 });
        setUser(response.data.user);
        navigate("/");
        return response.data;
      } catch (err: any) {
        const Msg = err?.response?.data?.error || "SignUp Failed";
        toast.error(Msg);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // useEffect(() => {
  //   const storedToken = Cookies.get("token");

  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, [token]);

  return { user, login, signup };
};
