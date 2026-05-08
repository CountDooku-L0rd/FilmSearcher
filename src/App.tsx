import "primereact/resources/themes/mira/theme.css";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import Auth from "./pages/Auth/Auth";
import Register from "./pages/Register/Register";
import MainPage from "./pages/MainPage/MainPage";
import { useGetMeQuery } from "./store/api/authApi";
import { useAppDispatch } from "./hooks/storeHooks";
import { setCredentials } from "./store/AuthSlice";
import { useEffect } from "react";

function App() {
  const token = localStorage.getItem("accessToken");
  const { data: user, isLoading } = useGetMeQuery(undefined, {
    skip: !token,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/', { replace: true });
  },[user, token])

  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2>Загрузка...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  } else {
    dispatch(setCredentials({ user }))
    return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
}

export default App;
