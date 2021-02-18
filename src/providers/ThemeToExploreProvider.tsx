import * as React from "react";
import { ChakraTheme, theme } from "@chakra-ui/react";

const themeToExploreContext = React.createContext<ChakraTheme>(theme);

export type ExplorerThemeProviderProps = {
  theme: ChakraTheme;
};

export const ThemeToExploreProvider: React.FC<ExplorerThemeProviderProps> = ({
  theme,
  children,
}) => (
  <themeToExploreContext.Provider value={theme}>
    {children}
  </themeToExploreContext.Provider>
);

export function useThemeToExplore() {
  return React.useContext(themeToExploreContext);
}
