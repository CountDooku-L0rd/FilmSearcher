import "primereact/resources/themes/mira/theme.css";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import Auth from "./pages/Auth/Auth";
import Register from "./pages/Registration/Registration";
import MainPage from "./pages/MainPage/MainPage";
import CustomToaster from "./components/shared/CustomToaster/CustomToaster";
import RoutingLoad from "./components/RoutingLoad/RoutingLoad";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks";
import { useEffect, useRef } from "react";
import { useMeMutation } from "./hooks/useMeMutation";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);
  const hasChecked = useRef(false);

  const me = useMeMutation(dispatch, navigate);

  useEffect(() => {
    if (token && !isAuthenticated && !hasChecked.current) {
      hasChecked.current = true;
      me.mutate();
    }
  }, [token, isAuthenticated]);

  if (token && me.isPending) {
    return <RoutingLoad />;
  }

  return (
    <>
      <CustomToaster />
      <Routes>
        <Route
          path="/MainPage"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/mainPage" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
