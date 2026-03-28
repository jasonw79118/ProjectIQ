import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Customers from "./pages/Customers";
import Jobs from "./pages/Jobs";
import Claims from "./pages/Claims";
import Calendar from "./pages/Calendar";
import Documents from "./pages/Documents";
import Invoices from "./pages/Invoices";
import Settings from "./pages/Settings";
import "./index.css";

function App() {
  return (
    <BrowserRouter basename="/ProjectIQ/">
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
