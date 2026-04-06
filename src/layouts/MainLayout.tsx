import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div
      style={{
        display: "flex",
        gap: 0,
        padding: 0,
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          width: "100%",
        }}
      >
        <div style={{ padding: "20px", width: "100%", boxSizing: "border-box" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
