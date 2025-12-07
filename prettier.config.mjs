/**
 * @see https://prettier.io/docs/en/configuration.html
 *
 * @type {import("prettier").Config}
 */
const config = {
    singleQuote: true,
    semi: true,
    arrowParens: 'always',
    printWidth: 120,
    tabWidth: 4,
    trailingComma: 'all',
    plugins: ['prettier-plugin-tailwindcss'],

    overrides: [
        {
            files: './lib/validator.ts',
            options: {
                printWidth: 1000,
            },
        },
    ],
};

export default config;
