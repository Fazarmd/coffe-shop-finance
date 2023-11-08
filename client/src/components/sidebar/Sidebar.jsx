import React from "react";
import { TbMenu2, TbReport, TbReportMoney, TbReplace, TbReportAnalytics, TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import mowLogo from "../../assets/mow.png";

const Sidebar = () => {
  const menus = [
    { name: "Revenue", link: "/", icon: TbReport },
    { name: "Transaction", link: "/transactions", icon: TbReplace },
    { name: "Expenses", link: "/", icon: TbReportMoney },
    { name: "Analysis", link: "/", icon: TbReportAnalytics },
    { name: "Logout", link: "/", icon: TbLogout, margin: true },
  ];
  return (
    <div className="flex gap-6">
      <div className="bg-[#0e0e0e] min-h-screen w-72 text-gray-100 px-4">
        <div className="py-3 flex items-center justify-between ">
          <a href="http://localhost:5173/" target="_blank">
            <img src={mowLogo} alt="Mowkopi logo" />
          </a>
        </div>
        <div className="mt-16 flex flex-col gap-4 relative">
          {/* menampilkan nama dan icon menu sidebar yang telah di inialisasi di "menus" */}
          {menus?.map((menu, i) => (
            <Link to={menu?.link} key={i} className={` ${menu?.margin && "mt-5"} group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`} onClick={() => setCurrentMenu(menu.name)}>
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2>{menu?.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
