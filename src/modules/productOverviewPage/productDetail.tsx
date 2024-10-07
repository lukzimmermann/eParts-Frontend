import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { apiCall, Method } from "../utils/apiCall";
import { Product } from "../../interfaces/product";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Image } from "primereact/image";

type Props = {
  productId: number | null;
  visible: boolean;
  onClose: () => void;
};

function initializeFormData() {
  return {
    id: 0,
    created_at: "",
    updated_at: "",
    name: "",
    category_id: 0,
    category_name: "",
    manufacture: "",
    manufacture_number: "",
    minimum_quantity: 0,
    quantity: null,
    suppliers: null,
    attributes: null,
    documents: null,
  };
}

export function ProductDetail({ productId, visible, onClose }: Props) {
  const [product, setProduct] = useState<Product>(initializeFormData());

  useEffect(() => {
    if (productId) getProduct();
  }, [visible]);

  const getProduct = async () => {
    const response = await apiCall<Product>(
      Method.GET,
      `/product/${productId}`,
      undefined
    );
    setProduct(response.data);
  };

  const gridItemContainerStyle = () => {
    return "flex flex-col";
  };

  return (
    <Dialog
      visible={visible}
      onHide={() => onClose()}
      modal
      header={product ? product.name : "New Article"}
    >
      <div className="grid grid-cols-3 gap-x-16 gap-y-5">
        <div className={gridItemContainerStyle()}>
          <label className="mb-1 ml-1">Product ID</label>
          <InputNumber value={product.id} />
        </div>
        <div className={gridItemContainerStyle()}>
          <label className="mb-1 ml-1">Category</label>
          <InputText value={product.category_name} />
        </div>
        <div className="row-span-3">
          <label className="mb-1 ml-1"></label>
          <Image src="src/assets/resistor.png" preview />
        </div>
        <div className={gridItemContainerStyle()}>
          <label className="mb-1 ml-1">Description</label>
          <InputText value={product.name} />
        </div>
        <div className={gridItemContainerStyle()}>
          <label className="mb-1 ml-1">Supplier</label>
          <InputText value={product.name} />
        </div>
        <div className={gridItemContainerStyle()}>
          <label className="mb-1 ml-1">Product ID</label>
          <InputNumber value={product.id} />
        </div>
        <div className={gridItemContainerStyle()}>
          <label className="mb-1 ml-1">Product ID</label>
          <InputNumber value={product.id} />
        </div>
        <div className={gridItemContainerStyle()}>
          <label className="mb-1 ml-1">Product ID</label>
          <InputNumber value={product.id} />
        </div>
        <div className={gridItemContainerStyle()}>
          <label className="mb-1 ml-1">Product ID</label>
          <InputNumber value={product.id} />
        </div>
      </div>
    </Dialog>
  );
}
