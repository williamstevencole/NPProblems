import { BrowserRouter, Routes, Route } from "react-router-dom";
import BootSelector from "./components/BootSelector";
import GraphBuilder from "./Coloracion/GraphBuilder";
import Knapsack from "./Knapsack/knapsack";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BootSelector />} />
        <Route path="/coloracion" element={<GraphBuilder />} />
        <Route path="/knapsack" element={<Knapsack />} />
      </Routes>
    </BrowserRouter>
  );
}
