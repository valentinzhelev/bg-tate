import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

import PrivateGuard from "./guards/PrivateGuard";
import GuestGuard from "./guards/GuestGuard";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Popular from "./pages/Popular";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Details from "./pages/Details";
import CreateTopic from "./pages/CreateTopic";
import EditTopic from "./pages/EditTopic";
import About from "./pages/About";
import Rules from "./pages/Rules";
import MyTopics from "./pages/MyTopics";
import NotFound from "./pages/NotFound";

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
          <Route path="/popular" element={<Popular />} />
          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<Rules />} />

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

          <Route
            path="/my-topics"
            element={
              <PrivateGuard>
                <MyTopics />
              </PrivateGuard>
            }
          />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;