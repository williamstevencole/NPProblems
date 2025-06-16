import { BrowserRouter, Routes, Route } from "react-router-dom";
import BootSelector from "./components/BootSelector";
import Knapsack from "./Knapsack/knapsack";
import SubsetSum from "./Subset Sum/SubsetSum";
import Introduction from "./Coloracion/Introduction";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BootSelector />} />
        <Route path="/coloracion" element={<Introduction />} />
         <Route path="/knapsack" element={<Knapsack />} />
         <Route path="/subsetsum" element={<SubsetSum />} />
      </Routes>
    </BrowserRouter>
  );
}
