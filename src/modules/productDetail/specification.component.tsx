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
    console.log(units);
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
    return <InputNumber type="text" value={options.value} />;
  };

  const attributeNameEditor = (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        value={attributes.find((e) => options.value === e.name)}
        options={attributes}
        optionLabel="name"
        onChange={(e) => options.editorCallback!(e.value)}
      />
    );
  };

  const attributeUnitEditor = (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        value={units.find((e) => options.value === e.name)}
        options={units.filter((e) => options.rowData.unit_id === e.parent_id)}
        optionLabel="name"
        onChange={(e) => options.editorCallback!(e.value)}
      />
    );
  };

  const onAttributeNameComplete = (e: ColumnEvent) => {
    const { newValue, rowData } = e;
    const { unit_id, id, parent_id, name } = newValue;

    const unitName = units.find((u) => u.id === unit_id)?.name;

    setData(
      data.map((a) =>
        a.name === rowData.name
          ? {
              ...a,
              id,
              parent_id,
              name,
              unit_id,
              unit_name: unitName,
            }
          : a
      )
    );
  };

  const onAttributeUnitComplete = (e: ColumnEvent) => {
    const oldUnit = units.find((u) => u.name === e.rowData.unit_name);
    const newUnit = units.find((u) => u.name === e.newValue.name);

    console.log(oldUnit.name, oldUnit.factor);
    console.log(newUnit.name, newUnit.factor);

    setData(
      data.map((a) =>
        a.name === e.rowData.name
          ? {
              ...a,
              unit_name: e.newValue.name,
              numeric_value:
                (a.numeric_value * oldUnit.factor) / newUnit.factor,
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
