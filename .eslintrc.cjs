module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb/hooks",
        "airbnb-typescript",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": './tsconfig.json',
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/require-default-props": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        'react/function-component-definition': [2, { "namedComponents": "arrow-function" }],
        'no-param-reassign': ['error', { props: false }],
    }
}
