import { useContext, useState } from "react";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../store/auth";
import { useAppDispatch } from "../../hooks/hooks";
import { useAppSelector } from "../../hooks/hooks";
import { PrimeReactContext } from "primereact/api";
import { toggleDarkMode } from "../../store/theme";
import { InputSwitch } from "primereact/inputswitch";
import MenuItem from "./menuItem";

interface MenuItem {
  id: number;
  icon: string;
  title: string;
}

const menuItems: MenuItem[] = [
  {
    id: 0,
    icon: "pi-compass",
    title: "Dashboard",
  },
  {
    id: 1,
    icon: "pi-mapv",
    title: "Projects",
  },
  {
    id: 2,
    icon: "pi-list",
    title: "Products",
  },
  {
    id: 3,
    icon: "pi-id-card",
    title: "Suppliers",
  },
  {
    id: 4,
    icon: "pi-cog",
    title: "Settings",
  },
];

type Props = {
  isVisible: boolean;
  onMenubarClick: () => void;
};

export function Menubar({ isVisible, onMenubarClick }: Props) {
  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItem>(
    menuItems[0]
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { changeTheme } = useContext(PrimeReactContext);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const handleThemeChange = () => {
    dispatch(toggleDarkMode({ changeTheme }));
  };

  const handleLogoutClick = () => {
    dispatch(logOut());
    navigate("/");
  };

  const handleMenuItemClick = (id: number) => {
    setCurrentMenuItem(menuItems.filter((e) => e.id === id)[0]);
  };

  return (
    <Sidebar
      header={<h2 className="text-2xl ml-5">Menu</h2>}
      visible={isVisible}
      onHide={onMenubarClick}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col align-middle">
          {menuItems.map((e) => (
            <MenuItem
              key={e.id}
              id={e.id}
              onClick={handleMenuItemClick}
              icon={e.icon}
              title={e.title}
              isActive={e.id === currentMenuItem.id}
            />
          ))}
        </div>
        <div className="flex flex-col">
          <Button
            icon="pi pi-sign-out"
            className="justify-center gap-2 mx-5 justify-self-end"
            severity="secondary"
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
          <div className="flex gap-6 justify-center items-center mb-4 mt-8">
            <i
              className={isDarkMode ? "pi pi-moon" : "pi pi-sun"}
              style={{ fontSize: "1rem" }}
            ></i>
            <label>{isDarkMode ? "Dark Mode" : "Light Mode"}</label>
            <InputSwitch checked={isDarkMode} onChange={handleThemeChange} />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
