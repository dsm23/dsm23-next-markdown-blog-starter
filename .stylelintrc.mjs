// These are all the custom `@` (at) rules that we use within our custom PostCSS plugins
const CUSTOM_AT_RULES = [
  // Tailwind-specific at-rules
  "apply",
  "layer",
  "responsive",
  "screen",
  "tailwind",
  "variants",
  // PostCSS-specific at-rules
  "define-mixin",
  "mixin",
];

// Enforces certain selectors to be only in camelCase notation
// We use these for id selectors and classname selectors
const ONLY_ALLOW_CAMEL_CASE_SELECTORS = [
  /^(?:[a-z]+(?:[A-Z][a-z]*)*)$/,
  { message: (s) => `Expected '${s}' to be in camelCase` },
];

export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-order", "stylelint-selector-bem-pattern"],
  rules: {
    // Enforces Element Class Names to be camelCase
    "selector-class-pattern": ONLY_ALLOW_CAMEL_CASE_SELECTORS,
    // Enforces Element IDs to be camelCase
    "selector-id-pattern": ONLY_ALLOW_CAMEL_CASE_SELECTORS,
    // Allow Tailwind-based CSS Rules
    "at-rule-no-unknown": [true, { ignoreAtRules: CUSTOM_AT_RULES }],
    // Allow the Global CSS Selector
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global"] },
    ],
    // cssDeclarationSorterOrder: smacss
    "order/properties-order": [
      {
        properties: ["position", "top", "right", "bottom", "left", "z-index"],
      },
      {
        properties: ["display", "visibility", "float", "clear"],
      },
      {
        properties: [
          "flex",
          "flex-direction",
          "flex-wrap",
          "flex-flow",
          "flex-basis",
          "flex-grow",
          "flex-shrink",
          "justify-content",
          "align-items",
          "align-self",
          "order",
        ],
      },
      {
        properties: [
          "width",
          "min-width",
          "max-width",
          "height",
          "min-height",
          "max-height",
        ],
      },
    ],
    "no-descending-specificity": null,
    // Disables the Level-4 Media Queries; Since they're more exotic and less known
    "media-feature-range-notation": "prefix",
    // Adopts the import notation from `postcss-import`
    "import-notation": "string",
  },
};
