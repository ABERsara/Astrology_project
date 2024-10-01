import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import SiteLayout from "./components/layouts/site/SiteLayout"
import DashLayout from "./components/layouts/dash/DashLayout"
import EditProfile from "./features/user/editProfile/EditProfile";
import AccountOverview from "./features/user/accountOverview/AccountOverview";
import ChargeHistory from "./features/user/chargeHistory/ChargeHistory";
import ChangePassword from "./features/user/changePassword/ChangePassword";
import UploadDiagnosis from "./features/diagnosis/uploadDiagnosis/UploadDiagnosis";
import ViewUsers from "./features/admin/viewUsers/ViewUsers"
import ViewBlogs from "./features/blogs/viewBlogs/ViewBlogs";
import ViewSingleBlog from "./features/blogs/viewSingleBlog/ViewSingleBlog";
import AddBlog from "./features/blogs/addBlog/AddBlog";
import EditBlog from "./features/blogs/editBlog/EditBlog";
import DeleteBlog from "./features/blogs/deleteBlog/DeleteBlog";
import HomePage from "./components/homePage/HomePage"
import PrivateZone from "./features/user/privateZone/PrivateZone";
import ViewSingleUser from "./features/admin/viewSingleUser/ViewSingleUser"
import RequireAuth from "./features/auth/RequireAuth";
import CheckLoginNotRequired from "./features/auth/CheckLoginNotRequired";
import AboutSection from "./components/aboutSection/AboutSection";
import AboutAstro from "./components/aboutAstro/AboutAstro";
function App() {
  return (
    <Router>
      <Routes>
        {/* נתיב ראשי של האתר */}
        <Route path="/" element={<SiteLayout />}>
          {/* דף כניסה, דף ראשי */}
          <Route index element={<HomePage />} />
          
          <Route element={<CheckLoginNotRequired />}>
            {/* נתיב ראשי של אזור ה-Dashboard */}
            <Route path="dash" element={<DashLayout />}>
            <Route index element={<Outlet />} />
            <Route path="about" element={<AboutSection />} />
          <Route path="astro" element={<AboutAstro />} />
              <Route element={<RequireAuth allowPermission={["Admin", "User"]} />}>

                {/* בלוגים - מקוננים תחת dash */}
                <Route path="blogs" element={<Outlet />}>
                  <Route index element={<ViewBlogs />} />
                  <Route path="add" element={<AddBlog />} />
                  <Route path="edit" element={<EditBlog />} />
                  <Route path="delete" element={<DeleteBlog />} />
                  <Route path=":blogId" element={<ViewSingleBlog />} />
                </Route>

                {/* אזור אישי של המשתמש */}
                <Route path="user" element={<Outlet />}>
                  <Route index element={<PrivateZone />} />
                  <Route path="editProfile" element={<EditProfile />} />
                  <Route path="chargeHistory" element={<ChargeHistory />} />
                  <Route path="accountOverview" element={<AccountOverview />} />
                  <Route path="changePassword" element={<ChangePassword />} />
                </Route>


                {/* ניהול אבחונים */}
                <Route path="diagnosis" element={<Outlet />}>
                  <Route index element={<h1>כרגע לא ברור לי מה לשים פה</h1>} />
                  <Route path="upload" element={<UploadDiagnosis />} />
                </Route>
                <Route element={<RequireAuth allowPermission={["Admin"]} />}>

                  {/* ניהול משתמשים - גם תחת ה-dashboard */}
                  <Route path="manage/users" element={<Outlet />}>
                    <Route index element={<ViewUsers />} />
                    <Route path=":userId" element={<ViewSingleUser />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
