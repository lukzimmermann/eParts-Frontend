import { Meta, StoryObj } from "@storybook/react";
import ProductSpecification from "./specification.component";

const meta: Meta<typeof ProductSpecification> = {
  title: "Product Specification",
  component: ProductSpecification,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProductSpecification>;

const dataSet = [
  {
    id: 1,
    parent_id: null,
    name: "Wiederstand",
    numeric_value: 150,
    text_value: null,
    unit_base_id: 1,
    unit_id: 1,
    unit_name: "Ohm",
  },
  {
    id: 22,
    parent_id: null,
    name: "Kapazität",
    numeric_value: 10,
    text_value: null,
    unit_base_id: 22,
    unit_id: 25,
    unit_name: "nF",
  },
  {
    id: 2,
    parent_id: null,
    name: "Toleranz",
    numeric_value: 1,
    text_value: null,
    unit_base_id: 7,
    unit_id: 7,
    unit_name: "%",
  },
  {
    id: 17,
    parent_id: null,
    name: "Leistung",
    numeric_value: 0.125,
    text_value: null,
    unit_base_id: 9,
    unit_id: 9,
    unit_name: "W",
  },
];

const attributeSet = [
  {
    id: 1,
    parent_id: null,
    unit_id: 1,
    name: "Wiederstand",
  },
  {
    id: 2,
    parent_id: null,
    unit_id: 7,
    name: "Toleranz",
  },
  {
    id: 3,
    parent_id: null,
    unit_id: 5,
    name: "Durchlass-Spannung",
  },
  {
    id: 4,
    parent_id: null,
    unit_id: 11,
    name: "Strom",
  },
  {
    id: 5,
    parent_id: null,
    unit_id: 5,
    name: "min. Spannung",
  },
  {
    id: 6,
    parent_id: null,
    unit_id: 5,
    name: "max. Spannung",
  },
  {
    id: 7,
    parent_id: null,
    unit_id: 5,
    name: "Spannung",
  },
  {
    id: 8,
    parent_id: null,
    unit_id: 11,
    name: "min. Strom",
  },
  {
    id: 9,
    parent_id: null,
    unit_id: 11,
    name: "max. Strom",
  },
  {
    id: 10,
    parent_id: null,
    unit_id: 14,
    name: "Raster",
  },
  {
    id: 11,
    parent_id: null,
    unit_id: 5,
    name: "Steuerspannung",
  },
  {
    id: 12,
    parent_id: null,
    unit_id: 11,
    name: "Schaltstrom",
  },
  {
    id: 13,
    parent_id: null,
    unit_id: 5,
    name: "Schaltspannung",
  },
  {
    id: 14,
    parent_id: null,
    unit_id: 18,
    name: "Frequenz",
  },
  {
    id: 15,
    parent_id: null,
    unit_id: 18,
    name: "min. Frequenz",
  },
  {
    id: 16,
    parent_id: null,
    unit_id: 18,
    name: "max. Frequenz",
  },
  {
    id: 17,
    parent_id: null,
    unit_id: 9,
    name: "Leistung",
  },
  {
    id: 18,
    parent_id: null,
    unit_id: 9,
    name: "min. Leistung",
  },
  {
    id: 19,
    parent_id: null,
    unit_id: 9,
    name: "max. Leistung",
  },
  {
    id: 20,
    parent_id: null,
    unit_id: 9,
    name: "Schaltleistung",
  },
  {
    id: 21,
    parent_id: null,
    unit_id: 11,
    name: "Kollektorstrom",
  },
  {
    id: 22,
    parent_id: null,
    unit_id: 22,
    name: "Kapazität",
  },
];

const unitSet = [
  {
    id: 1,
    parent_id: 1,
    name: "Ohm",
    factor: 1,
  },
  {
    id: 2,
    parent_id: 1,
    name: "kOhm",
    factor: 1000,
  },
  {
    id: 3,
    parent_id: 1,
    name: "MOhm",
    factor: 1000000,
  },
  {
    id: 4,
    parent_id: 5,
    name: "mV",
    factor: 0.001,
  },
  {
    id: 5,
    parent_id: 5,
    name: "V",
    factor: 1,
  },
  {
    id: 6,
    parent_id: 5,
    name: "kV",
    factor: 1000,
  },
  {
    id: 7,
    parent_id: 7,
    name: "%",
    factor: 1,
  },
  {
    id: 8,
    parent_id: 9,
    name: "mW",
    factor: 0.001,
  },
  {
    id: 9,
    parent_id: 9,
    name: "W",
    factor: 1,
  },
  {
    id: 10,
    parent_id: 9,
    name: "kW",
    factor: 1000,
  },
  {
    id: 11,
    parent_id: 11,
    name: "A",
    factor: 1,
  },
  {
    id: 12,
    parent_id: 11,
    name: "mA",
    factor: 0.001,
  },
  {
    id: 13,
    parent_id: 11,
    name: "uA",
    factor: 0.000001,
  },
  {
    id: 14,
    parent_id: 14,
    name: "m",
    factor: 1,
  },
  {
    id: 15,
    parent_id: 14,
    name: "mm",
    factor: 0.001,
  },
  {
    id: 16,
    parent_id: 14,
    name: "um",
    factor: 0.000001,
  },
  {
    id: 17,
    parent_id: 14,
    name: "km",
    factor: 1000,
  },
  {
    id: 18,
    parent_id: 18,
    name: "Hz",
    factor: 1,
  },
  {
    id: 19,
    parent_id: 18,
    name: "kHz",
    factor: 1000,
  },
  {
    id: 20,
    parent_id: 18,
    name: "Mhz",
    factor: 1000000,
  },
  {
    id: 21,
    parent_id: 18,
    name: "GHz",
    factor: 1000000000,
  },
  {
    id: 22,
    parent_id: 22,
    name: "F",
    factor: 1,
  },
  {
    id: 23,
    parent_id: 22,
    name: "mF",
    factor: 0.001,
  },
  {
    id: 24,
    parent_id: 22,
    name: "uF",
    factor: 0.000001,
  },
  {
    id: 25,
    parent_id: 22,
    name: "nF",
    factor: 1e-9,
  },
  {
    id: 26,
    parent_id: 22,
    name: "pF",
    factor: 1e-12,
  },
];

export const Standard: Story = {
  args: {
    title: "Specification",
    dataSet: dataSet,
    attributeSet: attributeSet,
    unitSet: unitSet,
  },
};
