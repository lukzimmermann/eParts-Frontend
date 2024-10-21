import { Meta, StoryObj } from "@storybook/react";
import ProductSpecification from "./Specification.component";

const meta: Meta<typeof ProductSpecification> = {
  title: "Product Specification",
  component: ProductSpecification,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProductSpecification>;

const data = [
  {
    id: 1,
    parent_id: null,
    name: "Wiederstand",
    numeric_value: 150,
    text_value: null,
    unit_id: 1,
    unit_name: "Ohm"
},
    {
        id: 2,
        parent_id: null,
        name: "Toleranz",
        numeric_value: 1,
        text_value: null,
        unit_id: 7,
        unit_name: "%"
    },
    {
        id: 17,
        parent_id: null,
        name: "Leistung",
        numeric_value: 0.125,
        text_value: null,
        unit_id: 9,
        unit_name: "W"
    }
]

export const Standard: Story = {
  args: {
    title: "Specification",
    dataSet: data
  },
};