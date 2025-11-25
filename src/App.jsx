import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Details from "./pages/Details";
import CreateTopic from "./pages/CreateTopic";
import EditTopic from "./pages/EditTopic";

function App() {
  return (
    <>
      <Navigation />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:topicId" element={<Details />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/create" element={<CreateTopic />} />
          <Route path="/edit/:topicId" element={<EditTopic />} />
        </Routes>
      </main>
    </>
  );
}

export default App;