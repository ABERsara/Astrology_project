import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import SiteLayout from "./components/layouts/site/SiteLayout"
import DashLayout from "./components/layouts/dash/DashLayout"
import EditProfile from "./features/user/editProfile/EditProfile";
import AccountOverview from "./features/user/accountOverview/AccountOverview";
import ChargeHistory from "./features/user/chargeHistory/ChargeHistory";
import ChangePassword from "./features/user/changePassword/ChangePassword";
import UploadDiagnosis from "./features/manager/uploadDiagnosis/UploadDiagnosis";
import ViewUsers from "./features/manager/viewUsers/ViewUsers"
import ViewBlogs from "./features/blogs/viewBlogs/ViewBlogs";
import ViewSingleBlog from "./features/blogs/viewSingleBlog/ViewSingleBlog";
import AddBlog from "./features/blogs/addBlog/AddBlog";
import EditBlog from "./features/blogs/editBlog/EditBlog";
import DeleteBlog from "./features/blogs/deleteBlog/DeleteBlog";
import HomePage from "./features/homePage/HomePage";
import RegisterUser from "./features/user/registration/RegisterUser";
import PrivateZone from "./features/user/privateZone/PrivateZone";
import LoginPage from "./features/auth/login/LoginPage";
function App() {
  return (
    <Router>
      <Routes>
        {/*ראשי למערכת route */}
        <Route path="/" element={<SiteLayout />}>
          {/*האינדקס שלו*/}
          <Route index element={<HomePage/>} />
          <Route path="register" element={<RegisterUser/>}/>
          <Route path="login" element={<LoginPage/>}/>
          {/* בתוך הראוט של האתר  */}
          <Route path="/dash" element={<DashLayout />}>
            {/*  ועודnavbar, sidebar האינדקס שלו שמכיל את כל ה*/}
            <Route index element={<h1>DashBoard</h1>} />
            <Route path="api/blogs" element={<Outlet />}>
              <Route path="view" element={<ViewBlogs />} />
              <Route path="add" element={<AddBlog />} />
              <Route path="edit" element={<EditBlog />} />
              <Route path="delete" element={<DeleteBlog />} />
              <Route path=":blogId" element={<ViewSingleBlog />} />
            </Route>
            <Route path="manager" element={<Outlet />}>
              <Route index element={<ViewUsers />} />
              <Route path="uploadDiagnosis" element={<UploadDiagnosis />} />
              <Route path="viewUsers" element={<ViewUsers />} />
              <Route path="viewSingleBlogs" element={<ViewSingleBlog />} />
              <Route path="deleteBlog" element={<DeleteBlog />} />
            </Route>
            <Route path="user" element={<Outlet />}>
              <Route index element={<PrivateZone/>} />
              <Route path="editProfile" element={<EditProfile />} />
              <Route path="chargeHistory" element={<ChargeHistory />} />
              <Route path="accountOverview" element={<AccountOverview />} />
              <Route path="changePassword" element={<ChangePassword />} />
              <Route path="viewSingleBlogs" element={<ViewSingleBlog />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
