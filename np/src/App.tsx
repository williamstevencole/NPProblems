import { BrowserRouter, Routes, Route } from "react-router-dom";
import BootSelector from "./components/BootSelector";
import Knapsack from "./Knapsack/knapsack";
import Introduction from "./Coloracion/Introduction";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BootSelector />} />
        <Route path="/coloracion" element={<Introduction />} />
         <Route path="/knapsack" element={<Knapsack />} />
      </Routes>
    </BrowserRouter>
  );
}
