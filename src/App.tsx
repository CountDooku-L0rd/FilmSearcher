import "primereact/resources/themes/mira/theme.css";
import { Navigate, Route, Routes } from "react-router";
import Auth from "./pages/Auth/Auth";
import Register from "./pages/Registration/Registration";
import MainPage from "./pages/MainPage/MainPage";
import { useGetMeQuery } from "./store/api/authApi/authApi";
import CustomToaster from "./components/shared/CustomToaster/CustomToaster";
import RoutingLoad from "./components/RoutingLoad/RoutingLoad";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const token = localStorage.getItem("accessToken");
  const { data: user, isLoading } = useGetMeQuery(undefined, {
    skip: !token,
  });

  if (isLoading) {
    return <RoutingLoad />;
  }

  return (
    <>
      <CustomToaster />
      <Routes>
        <Route
          path="/MainPage"
          element={
            <ProtectedRoute isAuthenticated={!!user}>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
