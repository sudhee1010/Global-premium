import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
// import Products from "./pages/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/products" element={<Products />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;