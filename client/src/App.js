import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SiteLayout from "./components/layouts/site/SiteLayout"
import DashLayout from "./components/layouts/dash/DashLayout"
function App() {
  return (
    <Router>
      <Routes>
        {/*ראשי למערכת route */}
        <Route path="/" element={<SiteLayout />}>
          {/*האינדקס שלו*/}
          <Route index element={<h1>site</h1>} />
          {/* בתוך הראוט של האתר  */}
          <Route path="/dash" element={<DashLayout />}>
            {/*  ועודnavbar, sitebar האינדקס שלו שמכיל את כל ה*/}
            <Route index element={<h1>DashBoard</h1>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
