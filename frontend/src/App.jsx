import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import DsaSheet from "./pages/DsaSheet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DsaSheet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
