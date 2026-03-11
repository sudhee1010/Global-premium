import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
// import Products from "./pages/Products";
import Products from "./pages/Products";
import Payments from "./pages/Payments";
import Customers from "./pages/Customers"
import Reports from "./pages/Reports"
import Reviews from"./pages/Reviews"
import Marketing from "./pages/Marketing";
import Orders from "./pages/Orders";
import Returns from "./pages/Returns";
import Settings from "./pages/Settings";
import VendorDashboard from "./pages/Vendors";
import VendorDetail from "./pages/VendorDetail";
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
          <Route path="/marketing" element={<Marketing/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/returns" element={<Returns/>}/>
           <Route path="/settings" element={<Settings/>}/>
           <Route path="/vendors"  element={<VendorDashboard/>}/>
           <Route path="/vendorsdetails"  element={<VendorDetail/>}/>
        
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;