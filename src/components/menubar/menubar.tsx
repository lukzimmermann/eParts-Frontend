import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { useAppSelector } from "../../hooks/hooks";
import { logOut } from "../../store/authSlice";
import { InputSwitch } from "primereact/inputswitch";
import { darkModeOff, darkModeOn } from "../../store/theme";
import { useContext } from "react";
import { PrimeReactContext } from "primereact/api";

type Props = {
  isVisible: boolean;
  onMenubarClick: () => void;
};

export function Menubar({ isVisible, onMenubarClick }: Props) {
  const { changeTheme } = useContext(PrimeReactContext);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleThemeChange = () => {
    if (isDarkMode) {
      dispatch(darkModeOff());
      changeTheme(
        "/themes/lara-dark/theme.css",
        "/themes/lara-light/theme.css",
        "theme-link"
      );
    } else {
      dispatch(darkModeOn());
      changeTheme(
        "/themes/lara-light/theme.css",
        "/themes/lara-dark/theme.css",
        "theme-link"
      );
    }
  };

  const handleLogoutClick = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <Sidebar
      header={<h2 className="text-2xl ml-5">Menu</h2>}
      visible={isVisible}
      onHide={onMenubarClick}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col">
          <Button text>Products</Button>
          <Button text>Suppliers</Button>
          <Button text>Settings</Button>
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
          <div className="flex gap-6 justify-center align-middle mb-4 mt-8">
            <i
              className={isDarkMode ? "pi pi-moon" : "pi pi-sun"}
              style={{ fontSize: "1.5rem" }}
            ></i>
            <label>{isDarkMode ? "Dark Mode" : "Light Mode"}</label>
            <InputSwitch checked={isDarkMode} onChange={handleThemeChange} />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
