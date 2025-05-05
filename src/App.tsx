import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loading } from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";

const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./components/NotFound"));
const Root = lazy(() => import("./pages/root"));
const Home = lazy(() => import("./pages/Home"));
const MyUrls = lazy(() => import("./pages/MyUrls"));
const Saved = lazy(() => import("./pages/Saved"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="auth" element={<Register />} />
          <Route
            path="app/my-urls"
            element={
              <ProtectedRoute>
                <MyUrls />
              </ProtectedRoute>
            }
          />
          <Route
            path="app/saved"
            element={
              <ProtectedRoute>
                <Saved />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
