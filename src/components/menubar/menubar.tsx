import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { logOut } from "../../store/authSlice";

type Props = {
  isVisible: boolean;
  onMenubarClick: () => void;
};

export function Menubar({ isVisible, onMenubarClick }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        <Button
          icon="pi pi-sign-out"
          className="justify-center gap-2 mx-5 justify-self-end"
          severity="secondary"
          onClick={handleLogoutClick}
        >
          Logout
        </Button>
      </div>
    </Sidebar>
  );
}
