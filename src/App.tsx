import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use BrowserRouter here

import { useContext, useEffect, useState } from "react";
import { PrimeReactContext } from "primereact/api";
import { LoginPage } from "./modules/loginPage/login.page";
import { Menubar } from "./components/menubar/menubar";
import { Header } from "./components/header/header";
import { ProductOverview } from "./modules/productOverviewPage/productOverview.page";
import { useAppSelector } from "./hooks/hooks";

function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [menubarVisible, setMenubarVisible] = useState<boolean>(false);
  const ctx = useContext(PrimeReactContext);

  useEffect(() => {
    setMenubarVisible(false);
  }, [isLoggedIn]);

  useEffect(() => {
    if (ctx) {
      // Add your context-related logic here
    }
  }, [ctx]);

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
