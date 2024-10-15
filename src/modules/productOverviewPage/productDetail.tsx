import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { apiCall, Method } from "../utils/apiCall";
import { Product } from "../../interfaces/product";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Image } from "primereact/image";
import { Calendar } from "primereact/calendar";

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

  const gridItemContainerClass = "flex flex-col";
  const labelClass = `text-[var(--text-color-secondary)] mb-2 ml-0`;

  return (
    <Dialog
      visible={visible}
      onHide={() => onClose()}
      modal
      dismissableMask
      header={
        <div className="flex flex-col">
          <label className="text-base font-normal">Description</label>

          <input
            className="input-clear text-[var(--primary-color)]"
            value={product ? product.name : "New Article"}
          ></input>
        </div>
      }
      className="m-20"
    >
      <div className="grid grid-cols-3 gap-x-16 gap-y-5 max-w-screen-xl">
        <div className={gridItemContainerClass}>
          <label className={labelClass}>Number</label>
          <InputNumber value={product.id} />
        </div>
        <div className={gridItemContainerClass}>
          <label className={labelClass}>Category</label>
          <InputText value={product.category_name} />
        </div>
        <div className="row-span-6">
          <label className={labelClass}></label>
          <Image
            src="src/assets/resistor.png"
            preview
            width="300"
            className="mt-6"
          />
        </div>
        <div className={gridItemContainerClass}>
          <label className={labelClass}>Manufacturer</label>
          <InputText value={product.manufacture} />
        </div>
        <div className={gridItemContainerClass}>
          <label className={labelClass}>Manufacturer number</label>
          <InputText value={product.manufacture_number} />
        </div>
        <div className={gridItemContainerClass}>
          <label className={labelClass}>Storage place</label>
          <InputText value={"Box3 32-43"} />
        </div>
        <div className="flex gap-12 justify-between">
          <div className={gridItemContainerClass}>
            <label className={labelClass}>Created</label>
            <Calendar value={new Date(product.created_at)} />
          </div>
          <div className={gridItemContainerClass}>
            <label className={labelClass}>Updated</label>
            <Calendar value={new Date(product.created_at)} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
