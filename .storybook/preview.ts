import type { Preview } from "@storybook/react";
import "../src/index.css";
// import "/themes/lara-dark/theme.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        // 👇 Default values
        { name: "MyDark", value: "#161519" },
        { name: "Dark", value: "#333" },
        { name: "Light", value: "#F7F9F2" },
        // 👇 Add your own
        { name: "Maroon", value: "#400" },
      ],
      // 👇 Specify which background is shown by default
      default: "MyDark",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
