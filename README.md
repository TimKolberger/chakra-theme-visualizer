# Chakra Theme Explorer

## Installation

```bash
npm install chakra-ui-theme-explorer
# or
yarn add chakra-ui-theme-explorer
```

## Usage

Render the `ThemeExplorer` component in your app and pass your application theme of chakra UI.

```jsx
import { ChakraProvider, Heading } from "@chakra-ui/react";
import { ThemeExplorer } from "chakra-ui-theme-explorer";
import { theme } from "./your-app-theme";

const App = () => (
  <>
    <ChakraProvider theme={theme}>
      <Heading>Chakra Theme Explorer Demo</Heading>
    </ChakraProvider>
    <ThemeExplorer theme={theme} />
  </>
);
```

## Development

```
npm start # or yarn start
```

You can run the example:

```
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, [we use Parcel's aliasing](https://github.com/palmerhq/tsdx/pull/88/files).

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is [set up for you](https://github.com/palmerhq/tsdx/pull/45/files) with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`. This runs the test watcher (Jest) in an interactive mode. By default, runs tests related to files changed since the last commit.

## Using the Playground

```
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**!
