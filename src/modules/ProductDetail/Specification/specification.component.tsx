import { Column, ColumnEditorOptions } from "primereact/column";
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
  const [currentEditingAttribute, setCurrentEditingAttribute] =
    useState<Attribute | null>();
  const [editingRows, setEditingRows] = useState({});
  const contextMenuRef = useRef<ContextMenu>(null);
  const overlayPanelRef = useRef(null);
  const valueEditorRef = useRef(null);
  const dataTableRef = useRef(null);

  const menuModel = [
    {
      label: "Add new attribute",
      icon: "pi pi-fw pi-plus",
      command: (e) => addAttribute(e, true),
    },
    {
      label: "Edit attribute",
      icon: "pi pi-fw pi-pencil",
      command: () => {
        setCurrentEditingAttribute(selectedAttribute);
        setEditingRows({ ...{ [`${selectedAttribute.id}`]: true } });
      },
    },
    {
      label: "Delete attribute",
      icon: "pi pi-fw pi-times",
      command: () => deleteAttribute(),
    },
  ];

  const attributeNameEditor = (options: ColumnEditorOptions) => {
    if (valueEditorRef.current)
      valueEditorRef.current.editor = attributeValueEditor(options);
    return (
      <Dropdown
        value={attributes.find((e) => options.rowData.name === e.name)}
        //options={attributes.filter((a) => !data.some((b) => a.name === b.name))}
        options={attributes}
        optionLabel="name"
        onChange={(e) => options.editorCallback!(e.value.name)}
        onBlur={() => options.editorCallback!(options.value)}
      />
    );
  };

  const attributeValueEditor = (options: ColumnEditorOptions) => {
    if (options.rowData.text_value) {
      return (
        <div className="flex gap-2 justify-end items-center">
          <InputText
            type="text"
            value={options.rowData.text_value}
            onChange={(e) => options.editorCallback(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
          />
          {getEditOptions()}
        </div>
      );
    } else {
      return (
        <div className="flex gap-2 justify-end items-center">
          <InputNumber
            inputStyle={{ width: "6rem", textAlign: "right" }}
            type="text"
            maxFractionDigits={12}
            value={options.rowData.numeric_value}
            onChange={(e) => options.editorCallback!(e.value)}
            onKeyDown={(e) => e.stopPropagation()}
          />
          <Dropdown
            value={units.find((e) => options.rowData.unit_name === e.name)}
            options={units.filter(
              (e) => options.rowData.unit_base_id === e.parent_id
            )}
            optionLabel="name"
            onChange={(e) => options.editorCallback!(e.value)}
            onBlur={() => options.editorCallback!(options.value)}
          />
          {getEditOptions()}
        </div>
      );
    }
  };

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

  const handleEditSaveClick = () => {
    console.log(currentEditingAttribute);
    handleEditCancelClick();
  };

  const handleEditCancelClick = () => {
    setEditingRows({});
  };

  const deleteAttribute = () => {
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
      setEditingRows({ ...{ [`-1`]: true } });
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

  const onRowEditComplete = (e: any) => {
    console.log("EditComplete", e);
  };

  const onRowEditChange = (e: any) => {
    console.log(e);
    setEditingRows(e.data);
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
        ref={dataTableRef}
        value={data}
        showHeaders={false}
        size="small"
        editMode="row"
        editingRows={editingRows}
        dataKey="id"
        onRowEditCancel={() => console.log("hello")}
        onRowEditChange={onRowEditChange}
        onRowEditComplete={onRowEditComplete}
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
        />
        <Column
          ref={valueEditorRef}
          key="numeric_value"
          columnKey="numeric_value"
          header="Value"
          body={(rowData) => createValueBody(rowData)}
          editor={(options) => attributeValueEditor(options)}
          align="right"
        />
      </DataTable>
    </div>
  );
}

export default ProductSpecification;
