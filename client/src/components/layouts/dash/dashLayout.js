import { Outlet } from "react-router-dom"
import Navbar from "../../navbar/Navbar"
import Sitebar from "../../sitebar/Sitebar"
import Footer from "../../footer/Footer"
import "./dash-layout.css"
//ממשק מנהל
const DashLayout = () => {
  return (
    <div className="container">
       <div className="menu"> 
       {/* התפריט בצד */}
       <Sitebar/> 
       </div>
       <div className="content">
        {/* התפריט העליון */}
        <Navbar/>
        {/* תוכן האתר */}
        <Outlet/>
        {/* תפריט תחתון */}
        <Footer/>
        </div> 
    </div>
  )
}

export default DashLayout