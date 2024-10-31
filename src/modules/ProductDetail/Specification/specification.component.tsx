import { useRef, useState } from "react";
import { ContextMenu } from "primereact/contextmenu";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { Attribute, ProductAttribute, Unit } from "@/interfaces/product";
import SpecificationItem from "./specificationItem.component";

const NEW_ITEM_ID = -1;

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
  const [dragAttribute, setDragAttribute] = useState<ProductAttribute>(null);
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(null);
  const [editAttribute, setEditAttribute] = useState<Attribute | null>(null);

  const contextMenuRef = useRef<ContextMenu>(null);
  const overlayPanelRef = useRef(null);

  const contextMenuModel = [
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

  const addAttribute = (e, isContextSource: boolean) => {
    if (isContextSource) contextMenuRef.current.hide(e);
    else overlayPanelRef.current.toggle(e);

    const existNewAttribute = data.find((item) => item.id === NEW_ITEM_ID);

    if (!existNewAttribute) {
      const newProductAttribute: ProductAttribute = {
        id: NEW_ITEM_ID,
        is_title: false,
        is_numeric: false,
        parent_id: null,
        name: null,
        numeric_value: null,
        text_value: null,
        unit_base_id: null,
        unit_id: null,
        unit_name: null,
        position: 100000,
      };

      setData((prevData: ProductAttribute[]) => [...prevData, newProductAttribute]);
      setSelectedAttribute(newProductAttribute);
      setEditAttribute(newProductAttribute);
    }
  };

  const deleteAttribute = () => {
    setData(data.filter((e) => !(e.name === selectedAttribute.name)));
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

  const handleEditCancel = () => {
    setData(data.filter((e) => e.id !== NEW_ITEM_ID));
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
      <ContextMenu model={contextMenuModel} ref={contextMenuRef} onHide={() => setSelectedAttribute(null)} />
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
            onEditCancel={() => handleEditCancel()}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductSpecification;
