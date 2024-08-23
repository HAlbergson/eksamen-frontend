import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import EventPage from "./pages/EventPage";
import DisciplinePage from "./pages/DisciplinePage";
import CalenderPage from "./pages/CalenderPage";

import "./index.css";
import TrackPage from "./pages/TrackPage";

function App() {
  return (
    <>
      <main>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Routes>
            <Route path="/events" element={<EventPage />} />
          </Routes>
          <Routes>
            <Route path="/tracks" element={<TrackPage />} />
          </Routes>
          <Routes>
            <Route path="/disciplines" element={<DisciplinePage />} />
          </Routes>
          <Routes>
            <Route path="/calender" element={<CalenderPage />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
