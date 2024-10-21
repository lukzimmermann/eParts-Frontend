import { Column, ColumnEditorOptions, ColumnEvent } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { apiCall, Method } from "../utils/apiCall";
import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

type Props = {
  title: string;
  dataSet: any;
};

function ProductSpecification({ title, dataSet }: Props) {
  const [data, setData] = useState<any>(dataSet);
  const [attributes, setAttributes] = useState<any>(undefined);
  const [units, setUnits] = useState<any>(undefined);

  useEffect(() => {
    getAttributes();
    getUnits();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const getAttributes = async () => {
    const response = await apiCall<any>(
      Method.GET,
      `/product/attributes`,
      undefined
    );
    setAttributes(response.data);
  };

  const getUnits = async () => {
    const response = await apiCall<any>(
      Method.GET,
      `/product/units`,
      undefined
    );
    setUnits(response.data);
  };

  const attributeValueEditor = (options: ColumnEditorOptions) => {
    return (
      <InputNumber
        type="text"
        maxFractionDigits={100}
        value={options.value}
        onChange={(e) => options.editorCallback!(e.value)}
      />
    );
  };

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

  const attributeUnitEditor = (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        value={units.find((e) => options.value === e.name)}
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
    setData(
      data.map((a) =>
        a.name === e.rowData.name
          ? {
              ...a,
              numeric_value: e.newValue,
            }
          : a
      )
    );
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

  return (
    <div>
      <label className="text-[var(--text-color-secondary)] text-xl ml-1">
        {title}
      </label>
      <div className="h-px bg-[var(--text-color-secondary)] mt-2 mb-1" />
      <DataTable value={data} showHeaders={false} size="small" editMode="cell">
        <Column
          key="name"
          header="Name"
          field="name"
          editor={(options) => attributeNameEditor(options)}
          onCellEditComplete={onAttributeNameComplete}
        ></Column>
        <Column
          key="numeric_value"
          header="Value"
          field="numeric_value"
          editor={(options) => attributeValueEditor(options)}
          onCellEditComplete={onAttributeValueComplete}
          align="right"
        ></Column>
        <Column
          key="unit_name"
          header="Unit"
          field="unit_name"
          editor={(options) => attributeUnitEditor(options)}
          onCellEditComplete={onAttributeUnitComplete}
          align="left"
          style={{ width: "1rem" }}
        ></Column>
      </DataTable>
    </div>
  );
}

export default ProductSpecification;
