// es5
module.exports = {
  "env": {
      "browser": true,
      "commonjs": true,
      "jquery": true,
      // "es6": true,      // es2015
      "es6": false,     // es5
      "node": false,
  },
  "globals": {
    "APP": true,    // グローバル変数を許容する。
  },
  "extends": [
    "eslint:recommended",
    // "plugin:import/errors",
    // "plugin:import/warnings",
    // "airbnb-base"
    "airbnb-base/legacy",   // es5
    // "plugin:prettier/recommended",
  ],
  /*
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    },
    "sourceType": "module"
  },*/
  "plugins": [
      "import",
      "prettier",
  ],
  "rules": {
      "indent": [
        "error",
        2, {
          "SwitchCase": 1
        }
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      "quotes": [
        "error",
        "single"
      ],
      "semi": [
        "error",
        "always"
      ],
      "func-names": [
        "off",
      ],
      /*
      "arrow-body-style": [
        "error",
        "as-needed"
      ],
      "no-console": [
        "off",
      ],
      "jsx-quotes": [
        "error",
        "prefer-single"
      ], */
      "function-paren-newline": [
        "off"
      ],
      "no-underscore-dangle": [
        "error", {
          "allowAfterThis": true,
          "allowAfterSuper": true
        }
      ],
      "no-multi-spaces": [
        "error", {
          "ignoreEOLComments": true,
          "exceptions": {
            "Property": true,
            "VariableDeclarator": true,
            "ImportDeclaration": true
          }
        }
      ]
  }
};
