import { BrowserRouter, Routes, Route } from "react-router-dom";
import BootSelector from "./components/BootSelector";
import Introduction from "./Coloracion/Introduction";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BootSelector />} />
        <Route path="/coloracion" element={<Introduction />} />
      </Routes>
    </BrowserRouter>
  );
}
