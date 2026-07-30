import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytics from "./pages/analytics";
import Login from "./pages/login";
import Register from "./pages/register";
import MyLibrary from "./pages/library";
import SearchMusic from "./pages/search";


export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/search" element={<SearchMusic />} />

        <Route path="/library" element={<MyLibrary />} />

        <Route path="/analytics" element={<Analytics />} />

      </Routes>

    </BrowserRouter>

  );
}
