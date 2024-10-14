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
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";

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
    icon: "pi-map",
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
    onMenubarClick();
  };

  return (
    <Sidebar
      header={
        <div className="flex w-full justify-center">
          <div className="flex flex-col items-center">
            <Avatar
              className="justify-self-center"
              image="/themes/avatar.png"
              size="xlarge"
              shape="circle"
            />
            <label className="mt-3">Lukas Zimmermann</label>
            <label className="text-[var(--text-color-secondary)] text-sm">
              Software Engineer
            </label>
          </div>
        </div>
      }
      visible={isVisible}
      onHide={onMenubarClick}
    >
      <div className="flex flex-col h-full justify-between mt-5">
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
        <div className="flex flex-col mb-8">
          <MenuItem
            id={99}
            title="Logout"
            icon="pi-sign-out"
            onClick={handleLogoutClick}
          />
          <div className="flex gap-3 items-center ml-5 mt-4">
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
