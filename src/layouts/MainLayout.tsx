import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div
      style={{
        alignContent: "left",
        display: "flex",
        gap: 20,
        padding: 5,
        height: "100vh",
        width: "100%",
      }}
    >
      <Sidebar />
      <Outlet />
    </div>
  );
}
