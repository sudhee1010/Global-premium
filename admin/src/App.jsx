import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
// import Products from "./pages/Products";
import Products from "./pages/Products";
import Payments from "./pages/Payments";
import Customers from "./pages/Customers"
import Reports from "./pages/Reports"
import Reviews from"./pages/Reviews"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/customers" element={<Customers/>}/>
          <Route path="/reports" element={<Reports/>}/>
          <Route path="/reviews" element={<Reviews/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;