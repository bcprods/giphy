# graphy challenge

For this challenge, you can choose any libraries you want.  Your challenge is simple.

1. implement a search box with a submit button to make the search dynamic
2. make the search results show up in a grid 12 wide with columns of width 4 and make them animate
3. pic another feature you think makes sense and add it too

We are looking for how you approach the solution, so think about where you put things as you go.

The api docs can be found here https://developers.giphy.com/docs/sdk 





## Razzle TypeScript Example

## How to use

<!-- START install generated instructions please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN yarn update-examples TO UPDATE -->Create and start the example:

```bash
npx create-razzle-app --example with-typescript-plugin with-typescript-plugin

cd with-typescript-plugin
yarn start
```
<!-- END install generated instructions please keep comment here to allow auto update -->

## Idea behind the example
This is an of how to use Razzle with [TypeScript](https://github.com/Microsoft/TypeScript).
In `razzle.config.js`, we locate the part of the webpack configuration
that is running `babel-loader` and swap it out for `ts-loader`.
Additionally, we make sure Razzle knows how to resolve `.ts` and `.tsx` files.

Lastly, we also need to modify our Jest configuration to handle typescript files.
Thus we add `ts-jest` and `@types/jest` to our dev dependencies. Then we augment Razzle's default jest setup by adding a field in our `package.json`.

```json
// package.json

{
  ...
  "jest": {
    "transform": {
      "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
      "\\.css$": "<rootDir>/node_modules/razzle/config/jest/cssTransform.js",
      "^(?!.*\\.(js|jsx|css|json)$)": "<rootDir>/node_modules/razzle/config/jest/fileTransform.js"
    },
    "testMatch": [
      "<rootDir>/src/**/__tests__/**/*.(ts|js)?(x)",
      "<rootDir>/src/**/?(*.)(spec|test).(ts|js)?(x)"
    ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "json"
    ],
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}"
    ]
  }
}
```

The `tslint.json` and `tsconfig.json` are taken from Microsoft's official
[TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter).

Note: You do not techincally _need_ to fully replace `babel-loader` with
`ts-loader` to use TypeScript. Both TS and Babel transpile ES6 code,
so when you run both webpack loaders you are making Razzle do twice the work. From our testing,
this can make HMR extremely slow on larger apps. Thus, this example overwrites
`babel-loader` with `ts-loader`. However, if you are incrementally moving to typescript you may want to run both loaders side by side. If you are running both, add this to your `jest.transform` setup in `package.json`:

```
"^.+\\.(js|jsx)$": "<rootDir>/node_modules/razzle/config/jest/babelTransform.js",
```
This will continue to transform .js files through babel.
