import "./sidebar.css"
import MenuLink from "../sidebar/MenuLink"
//תפריט צד לאזור האישי כולו
import { MdAccountTree,MdEdit, MdHandyman,MdOutlineCurrencyExchange } from "react-icons/md";
const Sidebar = () => {
  const menu=[
{
  title:"סקירה כללית על החשבון",
  path:"/dash/user/accountOverview",
  icon:<MdAccountTree />
},{
  title:"הסטוריית חיובים",
  path:"/dash/user/chargeHistory",
  icon:<MdOutlineCurrencyExchange/>
},{
  title:"עריכת פרופיל",
  path:"/dash/user/editProfile",
  icon:< MdHandyman/>
},{
  title:"שינוי סיסמה",
  path:"/dash/user/changePassword",
  icon:<MdEdit/>
}

  ]
const user={

}
  
  return (
    <div className="side-bar">
      {/* <div className="user-side-bar"></div> */}
   <ul className="menu-list">
  
    {menu.map(cat=>(

   <MenuLink item={cat} key={cat.title}/> 
  
    ))}
   
   </ul>
   
    </div>
  )
}

export default Sidebar