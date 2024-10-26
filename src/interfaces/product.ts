export interface Product {
  id: number; // ID of the product (integer)
  created_at: string; // Creation date (string in date-time format)
  updated_at: string; // Last update date (string in date-time format)
  name: string; // Name of the product (string)
  category_id: number; // Category ID (integer)
  category_name: string; // Name of the category (string)
  manufacture: string; // Manufacturer (string)
  manufacture_number: string; // Manufacturer number (string)
  minimum_quantity: number; // Minimum quantity (number)
  quantity: number | null; // Quantity (number or null)
  suppliers: Supplier[] | null; // List of suppliers (array of objects or null)
  attributes: ProductAttribute[] | null; // List of attributes (array of objects or null)
  documents: Document[] | null; // List of documents (array of objects or null)
}

export interface ProductAttribute {
  id: number; // ID of the attribute (integer)
  parent_id: number | null; // Parent ID (integer or null)
  name: string; // Name of the attribute (string)
  numeric_value: number; // Numeric value of the attribute (number)
  text_value: string | null; // Text value of the attribute (string or null)
  unit_id: number; // Unit ID (integer)
  unit_base_id: number;
  unit_name: string; // Unit name (string)
}

export interface Attribute {
  id: number;
  parent_id: number | null;
  unit_id: number;
  name: string;
}

export interface Unit {
  id: number;
  parent_id: number;
  name: string;
  factor: number;
}

export interface Document {
  description: string; // Description of the document (string)
  type: string; // Type of the document (string)
  url: string; // URL of the document (string)
}

export interface Price {
  quantity: number; // Quantity associated with this price (number)
  price: number; // Price of the product (number)
}

export interface SupplierProduct {
  number: string; // Product number (string)
  product_page: string; // URL or page link to the product (string)
  price: Price[] | null; // Array of PriceDto objects or null
}

export interface Supplier {
  id: number; // Supplier ID (integer)
  name: string; // Supplier name (string)
  product_detail: SupplierProduct | null; // Additional product details (object or null)
}
