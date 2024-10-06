import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { apiCall, Method } from "../utils/apiCall";

export const ProductOverview = () => {
  const [products, setProducts] = useState<any>(undefined);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await apiCall<any>(Method.GET, "/product/", undefined);
    setProducts(response.data);
  };

  return (
    <div className="m-10">
      <DataTable
        value={products}
        tableStyle={{ minWidth: "100rem" }}
        paginator
        rows={25}
        rowsPerPageOptions={[25, 50, 100, 200]}
        scrollable
        scrollHeight="76vh"
        resizableColumns
      >
        <Column field="id" header="Id"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category_name" header="Category"></Column>
        <Column field="manufacture" header="Manufacture"></Column>
        <Column field="manufacture_number" header="Manufacture Number"></Column>
        <Column field="minimum_quantity" header="min. Quantity"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  );
};
