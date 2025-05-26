import { BrowserRouter, Routes, Route } from "react-router-dom";
import BootSelector from "./components/BootSelector";
import GraphBuilder from "./Coloracion/GraphBuilder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BootSelector />} />
        <Route path="/coloracion" element={<GraphBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}
