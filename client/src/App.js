import { BrowserRouter as Router, Routes, Route,Outlet } from "react-router-dom";
import SiteLayout from "./components/layouts/site/SiteLayout"
import DashLayout from "./components/layouts/dash/DashLayout"
import EditProfile from "./features/user/editProfile/EditProfile";
import AccountOverview from "./features/user/accountOverview/AccountOverview";
import ChargeHistory from "./features/user/chargeHistory/ChargeHistory";
import ChangePassword from "./features/user/changePassword/ChangePassword"
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
            {/*  ועודnavbar, sidebar האינדקס שלו שמכיל את כל ה*/}
            <Route index element={<h1>DashBoard</h1>} />
            <Route path="user" element={<Outlet/>}>
              {/* <Route index element={<UsersList/>}/> */}
              <Route path="editProfile" element={<EditProfile/>}/> 
              <Route path="chargeHistory" element={<ChargeHistory/>}/> 
               <Route path="accountOverview" element={<AccountOverview/>}/> 
              <Route path="changePassword" element={<ChangePassword/>}/>  
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
