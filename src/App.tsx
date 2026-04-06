import { BrowserRouter, Routes, Route } from "react-router-dom";
import Billing from "./pages/Billing";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Billing />} />
          {/* <Route path="/purchases" element={<Purchases />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
