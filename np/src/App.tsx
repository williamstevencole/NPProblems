import { BrowserRouter, Routes, Route } from "react-router-dom";
import BootSelector from "./components/BootSelector";
import GraphBuilder from "./Coloracion/GraphBuilder";
import Info from "./Coloracion/info";

import geekforgeeks from "./assets/images/geekforgeeks.png";

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
