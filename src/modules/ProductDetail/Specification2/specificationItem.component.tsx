import { Attribute, ProductAttribute, Unit } from "@/interfaces/product";
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { useState } from "react";

type Props = {
  attributeData: ProductAttribute;
  attributeSet: Attribute[];
  unitSet: Unit[];
  onContextMenu: (e) => void;
  onContextMenuSelectionChange: (e: ProductAttribute) => void;
  onRowReorder: (
    productAttribute: ProductAttribute,
    isOnUpper: boolean
  ) => void;
  onDrag: (productAttribute: ProductAttribute) => void;
};

function SpecificationItem({
  attributeData,
  attributeSet,
  unitSet,
  onContextMenu,
  onContextMenuSelectionChange,
  onRowReorder,
  onDrag,
}: Props) {
  const [attribute, setAttribute] = useState<ProductAttribute>(attributeData);
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

  const isUpperIndicator = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    if (y > (rect.bottom - rect.top) / 2) {
      return false;
    } else {
      return true;
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    clearIndicator();
    if (isUpperIndicator(e)) setUpperIndicatorActive(true);
    else setLowerIndicatorActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    clearIndicator();
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    clearIndicator();
    onRowReorder(attribute, isUpperIndicator(e));
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    onContextMenu(e);
    onContextMenuSelectionChange(attribute);
  };

  const clearIndicator = () => {
    setUpperIndicatorActive(false);
    setLowerIndicatorActive(false);
  };

  return (
    <motion.div
      layout
      layoutId={attribute.name}
      transition={{ duration: 0.75 }}
      draggable
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleOnDrop}
      onContextMenu={handleContextMenu}
      onDrag={() => onDrag(attribute)}
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
    </motion.div>
  );
}

export default SpecificationItem;
