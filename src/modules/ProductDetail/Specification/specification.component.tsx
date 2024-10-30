import { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { ContextMenu } from "primereact/contextmenu";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { Attribute, ProductAttribute, Unit } from "@/interfaces/product";
import { InputText } from "primereact/inputtext";
import SpecificationItem from "./specificationItem.component";
import { motion } from "framer-motion";

type Props = {
  title: string;
  dataSet: ProductAttribute[];
  attributeSet: Attribute[];
  unitSet: Unit[];
};

function ProductSpecification({ title, dataSet, attributeSet, unitSet }: Props) {
  const [data, setData] = useState<ProductAttribute[]>(
    dataSet.sort((a, b) => a.position - b.position).map((e, index) => ({ ...e, position: index }))
  );
  const [attributes] = useState<Attribute[]>(attributeSet);
  const [units] = useState<Unit[]>(unitSet);
  const [dragAttribute, setDragAttribute] = useState<ProductAttribute>(null);
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(null);
  const [editAttribute, setEditAttribute] = useState<Attribute | null>(null);

  const contextMenuRef = useRef<ContextMenu>(null);
  const overlayPanelRef = useRef(null);

  const menuModel = [
    {
      label: "Add new attribute",
      icon: "pi pi-fw pi-plus",
      command: (e) => addAttribute(e, true),
    },
    {
      label: "Edit attribute",
      icon: "pi pi-fw pi-pencil",
      command: (e) => {
        console.log(setEditAttribute(selectedAttribute));
      },
    },
    {
      label: "Delete attribute",
      icon: "pi pi-fw pi-times",
      command: () => deleteAttribute(),
    },
  ];

  const deleteAttribute = () => {
    setData(data.filter((e) => !(e.name === selectedAttribute.name)));
  };

  const addAttribute = (e, isContextSource: boolean) => {
    if (isContextSource) contextMenuRef.current.hide(e);
    else overlayPanelRef.current.toggle(e);

    const existNewAttribute = data.find((item) => item.name === "New Attribute");

    if (!existNewAttribute) {
      const newProductAttribute: ProductAttribute = {
        id: -1,
        isTitle: false,
        parent_id: null,
        name: "New Attribute",
        numeric_value: null,
        text_value: null,
        unit_base_id: null,
        unit_id: null,
        unit_name: null,
        position: 100000,
      };

      setData((prevData: ProductAttribute[]) => [...prevData, newProductAttribute]);
    }
  };

  const handleRowReorder = (dropAttribute: ProductAttribute, isUpper: boolean) => {
    if (dropAttribute.name === dragAttribute.name) return;

    const updatedData = data.map((item) => {
      if (item.id === dragAttribute.id) {
        return {
          ...item,
          position: isUpper ? dropAttribute.position - 0.5 : dropAttribute.position + 0.5,
        };
      }
      return item;
    });

    const reorderedData = updatedData
      .sort((a, b) => a.position - b.position)
      .map((item, index) => ({ ...item, position: index }));

    setData(reorderedData);
  };

  const handleEditComplete = (oldData, newData) => {
    console.log(oldData, newData);

    setData(
      data.map((e) => {
        if (e.name === oldData.name) {
          return newData;
        }
        return e;
      })
    );

    setEditAttribute(null);
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <label className="text-[var(--text-color-secondary)] text-xl ml-1 select-none">{title}</label>
        <Button
          icon="pi pi-ellipsis-v"
          rounded
          text
          style={{ height: "2rem", width: "2rem" }}
          severity="secondary"
          onClick={(e) => overlayPanelRef.current.toggle(e)}
        />
        <OverlayPanel ref={overlayPanelRef} className="overlaypanel-content-p-0">
          <div className="flex flex-col">
            <Button className="text-[var(--text-color)] m-0" text onClick={(e) => addAttribute(e, false)}>
              Add new attribute
            </Button>
          </div>
        </OverlayPanel>
      </div>
      <div className="h-px bg-[var(--text-color-secondary)] mt-2 mb-1" />
      <ContextMenu model={menuModel} ref={contextMenuRef} onHide={() => setSelectedAttribute(null)} />
      <div>
        {data.map((attribute) => (
          <SpecificationItem
            key={attribute.name}
            attribute={attribute}
            attributes={data}
            attributeSet={attributeSet}
            unitSet={unitSet}
            isEdit={attribute.name === editAttribute?.name ? true : false}
            onContextMenu={(e) => contextMenuRef.current.show(e)}
            onContextMenuSelectionChange={(e) => setSelectedAttribute(e)}
            onRowReorder={(attribute, isUpper) => handleRowReorder(attribute, isUpper)}
            onDrag={(e) => setDragAttribute(e)}
            onEditComplete={(oldData, newData) => handleEditComplete(oldData, newData)}
            onEditCancel={() => setEditAttribute(null)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductSpecification;
