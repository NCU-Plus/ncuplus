const tailwindForms = require("@tailwindcss/forms");
const tailwindTypography = require("@tailwindcss/typography");
const tailwindScrollbarHide = require("tailwind-scrollbar-hide");
const colors = require("tailwindcss/colors");

module.exports = {
  plugins: [tailwindForms, tailwindScrollbarHide, tailwindTypography],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: [
            {
              h1: {
                marginTop: "0",
                marginBottom: "0.5em",
              },
              h2: {
                marginTop: "0",
                marginBottom: "0.2em",
              },
              h3: {
                marginTop: "0",
                marginBottom: "0",
              },
              h4: {
                marginTop: "0",
                marginBottom: "0",
              },
              "ol > li::marker": {
                color: colors.gray[900],
              },
              "ul > li::marker": {
                color: colors.gray[900],
              },
            },
          ],
        },
      },
    },
  },
};
