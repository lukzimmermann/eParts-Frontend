import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

type Props = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: Props) {
  return (
    <div
      className="h-20 flex align-middle justify-between"
      style={{ background: "var(--surface-overlay)" }}
    >
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
