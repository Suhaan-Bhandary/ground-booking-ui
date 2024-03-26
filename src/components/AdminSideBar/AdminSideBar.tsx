import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { GrNotes } from "react-icons/gr";
import { MdCalendarMonth, MdOutlineSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import AdminSideBarLink from "../AdminSideBarLink/AdminSideBarLink";
import Logout from "../Logout/Logout";
import styles from "./AdminSideBar.module.css";

const sideBarLinks = [
  {
    title: "Dashboard",
    Icon: MdOutlineSpaceDashboard,
    link: "/admin",
  },
  {
    title: "Events",
    Icon: MdCalendarMonth,
    link: "/admin/events",
  },
  {
    title: "Registrations",
    Icon: GrNotes,
    link: "/admin/registrations",
  },
  {
    title: "Users",
    Icon: FaUsers,
    link: "/admin/users",
  },
];

function SideNavbar() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen((state) => !state);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  return (
    <>
      <nav
        className={`${styles.SideNavbar} ${
          isSideBarOpen ? styles.sideNavbarOpen : ""
        }`}
      >
        <div className={styles.logo}>
          <div className={styles.logoContainer}>
            <FiMenu className={styles.menuIcon} onClick={toggleSidebar} />
            <Link to="/">
              <span className={styles.logoName}>Ground Booking</span>
            </Link>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.logo}>
            <FiMenu className={styles.menuIcon} onClick={toggleSidebar} />
            <span className={styles.logoName}>Ground Booking</span>
          </div>

          <div className={styles.sidebarContent}>
            <ul className={styles.lists}>
              {sideBarLinks?.map(({ title, Icon, link }) => (
                <AdminSideBarLink
                  path={link}
                  key={title}
                  className={styles.list}
                  activeClassName={styles.activeList}
                  onClickCallback={closeSideBar}
                >
                  <Icon className={styles.navIcon} />
                  <span className={styles.link}>{title}</span>
                </AdminSideBarLink>
              ))}
            </ul>

            <div className={styles.bottomContent}>
              <li className={styles.list}>
                <Link to="/" className={styles.navLink}>
                  <AiOutlineHome className={styles.navIcon} />
                  <span className={styles.link}>Home</span>
                </Link>
              </li>
              <li className={styles.list}>
                <Logout className={styles.navLink}>
                  <>
                    <BiLogOut className={styles.navIcon} />
                    <span className={styles.link}>Logout</span>
                  </>
                </Logout>
              </li>
            </div>
          </div>
        </div>
      </nav>

      <section
        role="button"
        tabIndex={0}
        className={styles.overlay}
        onClick={closeSideBar}
        onKeyDown={closeSideBar}
      />
    </>
  );
}

export default SideNavbar;
