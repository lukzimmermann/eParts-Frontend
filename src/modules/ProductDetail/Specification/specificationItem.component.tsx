import useClickOutside from "@/hooks/useClickOutside";
import { Attribute, ProductAttribute, Unit } from "@/interfaces/product";
import { motion } from "framer-motion";
import { article } from "framer-motion/client";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";

type Props = {
  attribute: ProductAttribute;
  attributes: ProductAttribute[];
  attributeSet: Attribute[];
  unitSet: Unit[];
  isEdit: boolean;
  onContextMenu: (e) => void;
  onContextMenuSelectionChange: (e: ProductAttribute) => void;
  onRowReorder: (productAttribute: ProductAttribute, isOnUpper: boolean) => void;
  onDrag: (productAttribute: ProductAttribute) => void;
  onEditComplete: (oldData: ProductAttribute, newData) => void;
  onEditCancel: () => void;
};

function SpecificationItem({
  attribute,
  attributes,
  attributeSet,
  unitSet,
  onContextMenu,
  onContextMenuSelectionChange,
  onRowReorder,
  onDrag,
  isEdit,
  onEditComplete,
  onEditCancel,
}: Props) {
  const [upperIndicatorActive, setUpperIndicatorActive] = useState<boolean>(false);
  const [lowerIndicatorActive, setLowerIndicatorActive] = useState<boolean>(false);
  const [selectedAttributeName, setSelectedAttributeName] = useState<Attribute>(
    attributeSet.find((e) => e.name === attribute.name)
  );
  const [numericValue, setNumericValue] = useState<number>(attribute.numeric_value);
  const [textValue, setTextValue] = useState<string>(attribute.text_value);
  const [selectedAttributeUnit, setSelectedAttributeUnit] = useState<Unit>(
    unitSet.find((e) => e.name === attribute.unit_name)
  );
  const mainContainerRef = useRef(null);

  // Context Menu
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
        <Button icon="pi pi-times" rounded outlined text severity="secondary" size="large" onClick={onEditCancel} />
      </div>
    );
  };

  const handleEditSaveClick = () => {
    const newData: ProductAttribute = {
      id: selectedAttributeName.id,
      parent_id: selectedAttributeName.parent_id,
      is_title: attributeSet.find((e) => e.name === selectedAttributeName.name).is_title,
      is_numeric: false,
      name: selectedAttributeName.name,
      numeric_value: numericValue ? numericValue : null,
      text_value: textValue ? textValue : null,
      unit_id: selectedAttributeUnit ? selectedAttributeUnit.id : null,
      unit_base_id: selectedAttributeUnit ? selectedAttributeUnit.parent_id : null,
      unit_name: selectedAttributeUnit ? selectedAttributeUnit.name : null,
      position: attribute.position,
    };

    onEditComplete(attribute, newData);
  };

  // Handle Drag&Drop
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

  const isUpperIndicator = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    if (y > (rect.bottom - rect.top) / 2) {
      return false;
    } else {
      return true;
    }
  };

  const clearIndicator = () => {
    setUpperIndicatorActive(false);
    setLowerIndicatorActive(false);
  };

  // UI Elements
  const getAttributeName = () => {
    if (!isEdit) return getAttributeNameDisplay();
    else return getAttributeNameEditor();
  };

  const getAttributeNameDisplay = () => {
    return (
      <label className={attribute.is_title ? "mt-4 text-[var(--text-color-secondary)]" : ""}>{attribute.name}</label>
    );
  };

  const getAttributeNameEditor = () => {
    const handleAttributeNameChanged = (e) => {
      setSelectedAttributeName(e.value);
      setSelectedAttributeUnit(unitSet.find((unit) => unit.id === e.value.unit_base_id));
    };

    return (
      <Dropdown
        className="-ml-2"
        placeholder="Select a attribute name"
        filter
        value={selectedAttributeName ? selectedAttributeName : ""}
        options={
          selectedAttributeName
            ? attributeSet.filter((a) =>
                a.name === selectedAttributeName.name ? a.name : !attributes.some((b) => a.name === b.name)
              )
            : attributeSet.filter((a) => !attributes.some((b) => a.name === b.name))
        }
        optionLabel="name"
        onChange={(e) => {
          handleAttributeNameChanged(e);
        }}
      />
    );
  };

  const getAttributeValue = () => {
    if (!isEdit) {
      return getAttributeValueDisplay();
    } else {
      console.log(numericValue, textValue);
      if (selectedAttributeName) {
        if (selectedAttributeName.is_numeric && !selectedAttributeName.is_title) {
          return getAttributeNumericValueEditor();
        } else if (!selectedAttributeName.is_numeric && !selectedAttributeName.is_title) {
          return getAttributeTextValueEditor();
        }
      }
      return getEditOptions();
    }
  };

  const getAttributeValueDisplay = () => {
    return (
      <>
        {attribute.numeric_value ? (
          <label>{`${attribute.numeric_value} ${attribute.unit_id ? attribute.unit_name : ""}`}</label>
        ) : (
          <label>{attribute.text_value}</label>
        )}
        {isEdit ? getEditOptions() : null}
      </>
    );
  };

  const getAttributeNumericValueEditor = () => {
    return (
      <div className="flex gap-2">
        <InputNumber
          draggable={false}
          maxFractionDigits={100}
          value={numericValue}
          inputStyle={{ width: "5rem", textAlign: "right" }}
          onChange={(e) => setNumericValue(e.value)}
        />
        {selectedAttributeName.unit_base_id ? (
          <Dropdown
            value={selectedAttributeUnit}
            options={unitSet.filter((e) => selectedAttributeName.unit_base_id === e.parent_id)}
            optionLabel="name"
            onChange={(e) => setSelectedAttributeUnit(e.value)}
          />
        ) : null}
        {isEdit ? getEditOptions() : null}
      </div>
    );
  };

  const getAttributeTextValueEditor = () => {
    return (
      <div className="flex gap-2">
        <InputText value={textValue} onChange={(e) => setTextValue(e.target.value)} />
        {isEdit ? getEditOptions() : null}
      </div>
    );
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
      draggable={isEdit ? false : true}
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
