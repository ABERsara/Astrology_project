import { Outlet } from "react-router-dom"
import Navbar from "../../navbar/Navbar"
import Sidebar from "../../sidebar/Sidebar"
import Footer from "../../footer/Footer"
import "./dash-layout.css"
//ממשק מנהל
const DashLayout = () => {
  return (
    <div className="container">
       {/* התפריט העליון */}
       <Navbar/>
      
       <div className="content">
       <div className="menu"> 
       {/* התפריט בצד */}
       <Sidebar/> 
       </div>
       <div className="display">
        {/* תוכן האתר */}
        <Outlet/>
        </div>
        </div> 
         {/* תפריט תחתון */}
         <Footer/>
    </div>
  )
}

export default DashLayout