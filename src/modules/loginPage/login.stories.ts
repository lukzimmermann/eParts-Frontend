import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import { LoginPage } from "./login.page";

const meta: Meta<typeof LoginPage> = {
  title: "LoginPage",
  component: LoginPage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LoginPage>;

export const Standard: Story = {
  args: {},
};
