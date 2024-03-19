import { withoutVitePlugins } from "@storybook/builder-vite"
/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../lib/**/*.mdx", "../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    return {
      ...config,
      plugins: await withoutVitePlugins(config.plugins, ["vite:lib-inject-css",
      ]),
    };
  }
};
export default config;
