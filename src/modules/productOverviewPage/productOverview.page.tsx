import { Column } from "primereact/column";
import { DataTable, DataTableValue } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { apiCall, Method } from "../utils/apiCall";
import { ProductDetail } from "./productDetail";
import { Product } from "../../interfaces/product";

export const ProductOverview = () => {
  const [products, setProducts] = useState<any>(undefined);
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<number>(undefined);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    //if (!detailVisible) setSelectedProductId(undefined);
  }, [detailVisible]);

  const getProducts = async () => {
    const response = await apiCall<any>(Method.GET, "/product/", undefined);
    setProducts(response.data);
  };

  const handleOnRowClick = (e) => {
    setSelectedProductId(e.data.id);
    console.log(selectedProductId);
    setDetailVisible(true);
  };

  return (
    <div
      className="m-10 p-4 rounded-2xl
                 bg-[linear-gradient(180deg,var(--background-color-gradient-2)_10%,var(--background-color-gradient-2)_10%,var(--background-color-gradient-1)_100%)]"
    >
      <ProductDetail
        productId={selectedProductId}
        onClose={() => setDetailVisible(false)}
        visible={detailVisible}
      />
      <DataTable
        tableClassName=""
        value={products}
        tableStyle={{ minWidth: "100rem" }}
        paginator
        rows={25}
        rowsPerPageOptions={[25, 50, 100, 200]}
        scrollable
        scrollHeight="73vh"
        resizableColumns
        columnResizeMode="expand"
        onRowClick={(e) => handleOnRowClick(e)}
      >
        <Column field="id" header="Id"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category_name" header="Category"></Column>
        <Column field="manufacture" header="Manufacture"></Column>
        <Column field="manufacture_number" header="Manufacture Number"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  );
};
