import { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { ContextMenu } from "primereact/contextmenu";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { Attribute, ProductAttribute, Unit } from "@/interfaces/product";
import { InputText } from "primereact/inputtext";
import SpecificationItem from "./specificationItem.component";

type Props = {
  title: string;
  dataSet: ProductAttribute[];
  attributeSet: Attribute[];
  unitSet: Unit[];
};

function ProductSpecification2({
  title,
  dataSet,
  attributeSet,
  unitSet,
}: Props) {
  const [data, setData] = useState<ProductAttribute[]>(
    dataSet.sort((a, b) => a.position - b.position)
  );
  const [attributes] = useState<Attribute[]>(attributeSet);
  const [units] = useState<Unit[]>(unitSet);
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(
    null
  );

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
      command: () => {},
    },
    {
      label: "Delete attribute",
      icon: "pi pi-fw pi-times",
      command: () => deleteAttribute(),
    },
  ];

  const deleteAttribute = () => {
    console.log(data);
    console.log(selectedAttribute);
    console.log(data.filter((e) => !(e.name === selectedAttribute.name)));
    setData(data.filter((e) => !(e.name === selectedAttribute.name)));
  };

  const addAttribute = (e, isContextSource: boolean) => {
    if (isContextSource) contextMenuRef.current.hide(e);
    else overlayPanelRef.current.toggle(e);

    const existNewAttribute = data.find(
      (item) => item.name === "New Attribute"
    );

    if (!existNewAttribute) {
      const newProductAttribute: ProductAttribute = {
        id: -1,
        parent_id: null,
        name: "New Attribute",
        numeric_value: null,
        text_value: null,
        unit_base_id: null,
        unit_id: null,
        unit_name: null,
        position: 100,
      };

      setData((prevData: ProductAttribute[]) => [
        ...prevData,
        newProductAttribute,
      ]);
    }
  };

  const createValueBody = (rowData) => {
    if (rowData.text_value) {
      return rowData.text_value;
    } else {
      return `${rowData.numeric_value} ${rowData.unit_name}`;
    }
  };

  const handleOnReorderRow = (e) => {
    e.value.forEach((item, index) => {
      item.position = index;
    });
    setData(e.value.sort((a, b) => a.position - b.position));
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <label className="text-[var(--text-color-secondary)] text-xl ml-1 select-none">
          {title}
        </label>
        <Button
          icon="pi pi-ellipsis-v"
          rounded
          text
          style={{ height: "2rem", width: "2rem" }}
          severity="secondary"
          onClick={(e) => overlayPanelRef.current.toggle(e)}
        />
        <OverlayPanel
          ref={overlayPanelRef}
          className="overlaypanel-content-p-0"
        >
          <div className="flex flex-col">
            <Button
              className="text-[var(--text-color)] m-0"
              text
              onClick={(e) => addAttribute(e, false)}
            >
              Add new attribute
            </Button>
          </div>
        </OverlayPanel>
      </div>
      <div className="h-px bg-[var(--text-color-secondary)] mt-2 mb-1" />
      <ContextMenu
        model={menuModel}
        ref={contextMenuRef}
        onHide={() => setSelectedAttribute(null)}
      />
      <div>
        {data.map((e) => (
          <SpecificationItem
            attributeData={e}
            attributeSet={attributeSet}
            unitSet={unitSet}
            onContextMenu={(e) => contextMenuRef.current.show(e)}
            onContextMenuSelectionChange={(e) => setSelectedAttribute(e)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductSpecification2;
