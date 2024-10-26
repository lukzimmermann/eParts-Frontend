import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/hooks";
import { PrimeReactContext } from "primereact/api";
import { Header } from "@/components/header/header";
import { Menubar } from "@/components/menubar/menubar";
import { useContext, useEffect, useState } from "react";
import { darkModeOn, darkModeOff } from "@/store/theme";
import { LoginPage } from "@/modules/LoginPage/login.page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use BrowserRouter here
import { ProductOverview } from "@/modules/ProductOverviewPage/productOverview.page";

function App() {
  const dispatch = useDispatch();
  const { changeTheme } = useContext(PrimeReactContext);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const [menubarVisible, setMenubarVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      dispatch(darkModeOn({ changeTheme }));
    } else {
      dispatch(darkModeOff({ changeTheme }));
    }
  }, []);

  useEffect(() => {
    setMenubarVisible(false);
  }, [isLoggedIn]);

  const handleMenuClick = () => {
    if (menubarVisible) setMenubarVisible(false);
    else setMenubarVisible(true);
  };

  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <div>
            <Menubar
              isVisible={menubarVisible}
              onMenubarClick={handleMenuClick}
            ></Menubar>
            <Header onMenuClick={handleMenuClick} />
            <Routes>
              <Route index element={<ProductOverview />} />
              <Route path="*" element={<ProductOverview />} />
            </Routes>
          </div>
        ) : (
          <LoginPage />
        )}
      </div>
    </Router>
  );
}

export default App;
