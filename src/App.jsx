import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";

import PrivateGuard from "./guards/PrivateGuard";
import GuestGuard from "./guards/GuestGuard";

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
          {/* Публични страници */}
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:topicId" element={<Details />} />

          {/* Само за гости */}
          <Route
            path="/login"
            element={
              <GuestGuard>
                <Login />
              </GuestGuard>
            }
          />

          <Route
            path="/register"
            element={
              <GuestGuard>
                <Register />
              </GuestGuard>
            }
          />

          {/* Само за логнати */}
          <Route
            path="/create"
            element={
              <PrivateGuard>
                <CreateTopic />
              </PrivateGuard>
            }
          />

          <Route
            path="/edit/:topicId"
            element={
              <PrivateGuard>
                <EditTopic />
              </PrivateGuard>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;