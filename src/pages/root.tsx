import Footer from "@/components/Footer";
import { Loading } from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { useLoading } from "@/Context/Loading-provider";
import { useTheme } from "@/Context/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();

const Root = () => {
  const { theme } = useTheme();
  const { isLoading } = useLoading();
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="relative">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          rtl={false}
          draggable
          theme={theme === "dark" ? "dark" : "light"}
        />
        <QueryClientProvider client={queryClient}>
          <div className="container mx-auto px-2">
            {isLoading ? <Loading /> : <Outlet />}
          </div>
        </QueryClientProvider>
      </div>
      <Footer />
    </div>
  );
};

export default Root;
