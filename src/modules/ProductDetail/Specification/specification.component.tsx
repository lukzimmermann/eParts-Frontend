import { Column, ColumnEditorOptions, ColumnEvent } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { ContextMenu } from "primereact/contextmenu";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { Attribute, ProductAttribute, Unit } from "@/interfaces/product";
import { InputText } from "primereact/inputtext";

type Props = {
  title: string;
  dataSet: ProductAttribute[];
  attributeSet: Attribute[];
  unitSet: Unit[];
};

function ProductSpecification({
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

  const attributeNameEditor = (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        placeholder="Select a attribute"
        options={attributes.filter((a) => !data.some((b) => a.name === b.name))}
        optionLabel="name"
        onChange={(e) => options.editorCallback!(e.value)}
        onBlur={() => options.editorCallback!(options.value)}
      />
    );
  };

  const attributeValueEditor = (options: ColumnEditorOptions) => {
    if (options.rowData.text_value) {
      return (
        <InputText
          type="text"
          value={options.rowData.text_value}
          onChange={(e) => options.editorCallback(e.target.value)}
          onKeyDown={(e) => e.stopPropagation()}
        />
      );
    } else {
      return (
        <InputNumber
          type="text"
          maxFractionDigits={12}
          value={options.rowData.numeric_value}
          onChange={(e) => options.editorCallback!(e.value)}
          onKeyDown={(e) => e.stopPropagation()}
        />
      );
    }
  };
  const attributeUnitEditor = (options: ColumnEditorOptions) => {
    console.log(options);
    return (
      <Dropdown
        value={units.find((e) => options.rowData.unit_name === e.name)}
        options={units.filter(
          (e) => options.rowData.unit_base_id === e.parent_id
        )}
        optionLabel="name"
        onChange={(e) => options.editorCallback!(e.value)}
        onBlur={() => options.editorCallback!(options.value)}
      />
    );
  };

  const onAttributeNameComplete = (e: ColumnEvent) => {
    if (!e.newValue.id) {
      return;
    }

    setData(
      data.map((a) =>
        a.name === e.rowData.name
          ? {
              ...a,
              id: e.newValue.id,
              name: e.newValue.name,
              parent_id: e.newValue.parent_id,
              unit_base_id: e.newValue.unit_id,
              unit_id: e.newValue.unit_id,
              unit_name: units.find((u) => u.id === e.newValue.unit_id)?.name,
            }
          : a
      )
    );
  };

  const onAttributeValueComplete = (e: ColumnEvent) => {
    if (e.rowData.text_value) {
      setData(
        data.map((a) =>
          a.name === e.rowData.name
            ? {
                ...a,
                text_value: e.rowData.text_value,
              }
            : a
        )
      );
    } else {
      setData(
        data.map((a) =>
          a.name === e.rowData.name
            ? {
                ...a,
                numeric_value: e.rowData.numeric_vale,
              }
            : a
        )
      );
    }
  };

  const onAttributeUnitComplete = (e: ColumnEvent) => {
    const oldUnit = units.find((u) => u.name === e.rowData.unit_name);
    const newUnit = units.find((u) => u.name === e.newValue.name);
    if (!oldUnit || !newUnit) {
      return;
    }
    setData(
      data.map((a) =>
        a.name === e.rowData.name
          ? {
              ...a,
              unit_id: e.newValue.id,
              unit_name: e.newValue.name,
              numeric_value: parseFloat(
                ((a.numeric_value * oldUnit.factor) / newUnit.factor).toFixed(
                  12
                )
              ),
            }
          : a
      )
    );
  };

  const menuModel = [
    {
      label: "Add new attribute",
      icon: "pi pi-fw pi-plus",
      command: (e) => addAttribute(e, true),
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

  const addAttribute = (e, isContextSource) => {
    if (isContextSource) contextMenuRef.current.hide(e);
    else overlayPanelRef.current.toggle(e);

    const existNewAttribute = data.find(
      (item) => item.name === "New Attribute"
    );

    if (!existNewAttribute) {
      setData([
        ...data,
        {
          id: null,
          parent_id: null,
          name: "New Attribute",
          numeric_value: null,
          text_value: null,
          unit_base_id: null,
          unit_id: null,
          unit_name: null,
          position: 100,
        },
      ]);
    } else {
      console.log("No action, currently a new attribute exists");
    }
  };

  const handleOnReorderRow = (e) => {
    e.value.forEach((item, index) => {
      item.position = index;
    });
    console.log(e);
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
      <DataTable
        value={data}
        showHeaders={false}
        size="small"
        editMode="cell"
        reorderableRows
        onContextMenu={(e) => contextMenuRef.current.show(e.originalEvent)}
        contextMenuSelection={selectedAttribute}
        onRowReorder={(e) => handleOnReorderRow(e)}
        onContextMenuSelectionChange={(e) => setSelectedAttribute(e.value)}
      >
        <Column
          key="name"
          columnKey="name"
          header="Name"
          field="name"
          editor={(options) => attributeNameEditor(options)}
          onCellEditComplete={onAttributeNameComplete}
        ></Column>
        <Column
          key="numeric_value"
          columnKey="numeric_value"
          header="Value"
          body={(rowData) =>
            rowData.text_value != null
              ? rowData.text_value
              : rowData.numeric_value
          }
          editor={(options) => attributeValueEditor(options)}
          onCellEditComplete={onAttributeValueComplete}
          align="right"
        ></Column>
        <Column
          key="unit_name"
          columnKey="unit_name"
          header="Unit"
          body={(rowData) =>
            rowData.unit_name != "NO_UNIT" ? rowData.unit_name : null
          }
          editor={(options) =>
            options.rowData.unit_name != "NO_UNIT"
              ? attributeUnitEditor(options)
              : null
          }
          onCellEditComplete={onAttributeUnitComplete}
          align="left"
          style={{ width: "1rem" }}
        ></Column>
      </DataTable>
    </div>
  );
}

export default ProductSpecification;
