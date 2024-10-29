import { Attribute, ProductAttribute, Unit } from "@/interfaces/product";
import { Button } from "primereact/button";
import { useState } from "react";

type Props = {
  attributeData: ProductAttribute;
  attributeSet: Attribute[];
  unitSet: Unit[];
  onContextMenu: (e) => void;
  onContextMenuSelectionChange: (e: ProductAttribute) => void;
};

function SpecificationItem({
  attributeData,
  attributeSet,
  unitSet,
  onContextMenu,
  onContextMenuSelectionChange,
}: Props) {
  const [attribute, setAttribute] = useState<ProductAttribute>(attributeData);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [upperIndicatorActive, setUpperIndicatorActive] =
    useState<boolean>(false);
  const [lowerIndicatorActive, setLowerIndicatorActive] =
    useState<boolean>(false);

  const getEditOptions = () => {
    return (
      <div>
        <Button
          icon="pi pi-check"
          rounded
          outlined
          text
          severity="success"
          size="large"
          onClick={handleEditSaveClick}
        />
        <Button
          icon="pi pi-times"
          rounded
          outlined
          text
          severity="secondary"
          size="large"
          onClick={handleEditCancelClick}
        />
      </div>
    );
  };

  const handleEditSaveClick = () => {};

  const handleEditCancelClick = () => {};

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragLeave();
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    if (y > (rect.bottom - rect.top) / 2) {
      setLowerIndicatorActive(true);
    } else {
      setUpperIndicatorActive(true);
    }
  };
  const handleDragLeave = () => {
    setUpperIndicatorActive(false);
    setLowerIndicatorActive(false);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    onContextMenu(e);
    onContextMenuSelectionChange(attribute);
  };

  return (
    <div
      draggable
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={() => console.log("dropped")}
      onContextMenu={handleContextMenu}
    >
      <div
        className={
          upperIndicatorActive
            ? "h-0.5 bg-[var(--primary-color)] opacity-100 -mt-0.5"
            : "h-px bg-[var(--surface-d)] opacity-0 -mt-px"
        }
      />
      <div className="flex justify-between hover:bg-[var(--surface-hover)] transition-all py-2 px-2 text-[var(--text-color)] cursor-pointer">
        <label>{attribute.name}</label>
        {attribute.numeric_value ? (
          <label>{`${attribute.numeric_value} ${attribute.unit_name}`}</label>
        ) : (
          <label>{attribute.text_value}</label>
        )}
      </div>
      <div
        className={
          lowerIndicatorActive
            ? "h-0.5 bg-[var(--primary-color)] opacity-100 -mt-0.5"
            : "h-px bg-[var(--surface-d)] -mt-px"
        }
      />
    </div>
  );
}

export default SpecificationItem;
