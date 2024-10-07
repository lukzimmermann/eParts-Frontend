import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { logIn } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { apiCall, Method } from "../utils/apiCall";
import { useAppDispatch } from "../../hooks/hooks";

export function LoginPage() {
  const [username, setUsername] = useState<string>(undefined);
  const [password, setPassword] = useState<string>(undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLoginClick = async () => {
    const payload = {
      username: username,
      password: password,
    };

    const response = await apiCall<any>(Method.POST, "auth/login", payload);

    if (response.data.message === "Login successful") {
      dispatch(logIn());
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card header={<h1 className="text-center text-3xl mt-6">Sign In</h1>}>
        <div className="flex flex-col">
          <label className="mb-1 ml-1">E-Mail</label>
          <IconField className="mb-3" iconPosition="left">
            <InputIcon className="pi pi-envelope ml-0.5"> </InputIcon>
            <InputText onChange={(e) => setUsername(e.target.value)} />
          </IconField>
          <label className="mb-1 ml-1">Password</label>
          <IconField className="mb-2" iconPosition="left">
            <InputIcon className="pi pi-shield ml-0.5"> </InputIcon>
            <InputText
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </IconField>

          <a className="mb-9 mr-1 text-xs text-right underline">
            Forgot Password?
          </a>
          <Button className="justify-center" rounded onClick={handleLoginClick}>
            Login
          </Button>
          <div className="flex justify-center mt-10">
            <label className="text-xs mr-1">Don't have an Account?</label>
            <a className="text-xs underline">Sign up</a>
          </div>
        </div>
      </Card>
    </div>
  );
}
