import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

type Props = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: Props) {
  return (
    <div className="h-20 flex align-middle justify-between bg-[linear-gradient(90deg,var(--header-color-gradient-1),var(--header-color-gradient-2),var(--header-color-gradient-1))]">
      <Button
        icon="pi pi-bars"
        text
        className="m-2 justify-self-start"
        size="large"
        style={{ color: "var(--text-color)" }}
        onClick={onMenuClick}
      />
      <div className="self-center">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search"> </InputIcon>
          <InputText placeholder="Search" />
        </IconField>
      </div>
      <div />
    </div>
  );
}
