import useClickOutsidee from "@/hooks/useClickOutside";
import { Attribute, ProductAttribute, Unit } from "@/interfaces/product";
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";

type Props = {
  attribute: ProductAttribute;
  attributeSet: Attribute[];
  unitSet: Unit[];
  isEdit: boolean;
  onContextMenu: (e) => void;
  onContextMenuSelectionChange: (e: ProductAttribute) => void;
  onRowReorder: (
    productAttribute: ProductAttribute,
    isOnUpper: boolean
  ) => void;
  onDrag: (productAttribute: ProductAttribute) => void;
  onEditCancel: () => void;
};

function SpecificationItem(props: Props) {
  const {
    attribute,
    attributeSet,
    unitSet,
    onContextMenu,
    onContextMenuSelectionChange,
    onRowReorder,
    onDrag,
    isEdit,
    onEditCancel,
  } = props;

  const [upperIndicatorActive, setUpperIndicatorActive] =
    useState<boolean>(false);
  const [lowerIndicatorActive, setLowerIndicatorActive] =
    useState<boolean>(false);
  const [selectedAttributeName, setSelectedAttributeName] = useState<Attribute>(
    attributeSet.find((e) => e.name === attribute.name)
  );
  const [selectedAttributeUnit, setSelectedAttributeUnit] = useState<Unit>(
    unitSet.find((e) => e.name === attribute.unit_name)
  );
  const mainContainerRef = useRef(null);
  // useClickOutsidee(mainContainerRef, () => onEditCancel());

  const getEditOptions = () => {
    return (
      <div className="-m-1">
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
          onClick={onEditCancel}
        />
      </div>
    );
  };

  const handleEditSaveClick = () => {};

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

  const getAttributeName = () => {
    if (!isEdit) {
      return (
        <label
          className={
            attribute.isTitle ? "mt-4 text-[var(--text-color-secondary)]" : ""
          }
        >
          {attribute.name}
        </label>
      );
    }
    return (
      <Dropdown
        className="-ml-2"
        placeholder="Select a attribute name"
        value={selectedAttributeName}
        options={attributeSet}
        optionLabel="name"
        onChange={(e) => setSelectedAttributeName(e.value)}
      />
    );
  };

  const getAttributeValue = () => {
    if (!isEdit) {
      return (
        <>
          {attribute.numeric_value ? (
            <label>{`${attribute.numeric_value} ${attribute.unit_name}`}</label>
          ) : (
            <label>{attribute.text_value}</label>
          )}
          {isEdit ? getEditOptions() : null}
        </>
      );
    }
    if (attribute.numeric_value) {
      return (
        <div className="flex gap-2">
          <InputNumber
            value={attribute.numeric_value}
            inputStyle={{ width: "5rem", textAlign: "right" }}
          />
          <Dropdown
            value={selectedAttributeUnit}
            options={unitSet.filter(
              (e) => selectedAttributeName.unit_id === e.parent_id
            )}
            optionLabel="name"
            onChange={(e) => setSelectedAttributeUnit(e.value)}
          />
          {isEdit ? getEditOptions() : null}
        </div>
      );
    } else {
      return <InputText value={attribute.text_value} />;
    }
  };

  return (
    <motion.div
      ref={mainContainerRef}
      layout
      layoutId={attribute.name}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleOnDrop}
      onContextMenu={handleContextMenu}
      onDrag={() => onDrag(attribute)}
      draggable
    >
      <div
        className={
          upperIndicatorActive
            ? "h-0.5 bg-[var(--primary-color)] opacity-100 -mt-0.5"
            : "h-px bg-[var(--surface-d)] opacity-0 -mt-px"
        }
      />
      <div className="flex justify-between hover:bg-[var(--surface-hover)] transition-all py-2 px-2 text-[var(--text-color)] cursor-pointer">
        {getAttributeName()}
        {getAttributeValue()}
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
function useClickOutside(overlayRef: any, arg1: () => void) {
  throw new Error("Function not implemented.");
}
