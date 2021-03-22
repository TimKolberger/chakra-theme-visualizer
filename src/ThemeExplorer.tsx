import * as React from "react";
import {
  HashRouter,
  MemoryRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";
import {
  IconButton,
  ButtonProps,
  ThemeProvider,
  ChakraProvider,
  ChakraTheme,
  useDisclosure,
  Tooltip,
  ChakraProviderProps,
  HStack,
} from "@chakra-ui/react";
import NewWindow from "react-new-window";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeExplorerRoute } from "./pages/ThemeExplorerRoute";
import { ThemeToExploreProvider } from "./providers/ThemeToExploreProvider";
import { theme as explorerTheme } from "./theme";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { isBrowser } from "./utils/isBrowser";
import { Logo } from "./components/Logo";

const localStoragePrefix = "chakra-theme-explorer:";
const colorModeKey = `${localStoragePrefix}color-mode`;

const colorModeManager: ChakraProviderProps["colorModeManager"] = {
  type: "localStorage",
  get: () => {
    if (!isBrowser) {
      return undefined;
    }

    const raw = localStorage.getItem(colorModeKey);
    if (["light", "dark"].includes(String(raw))) {
      return raw as "light" | "dark";
    }

    return undefined;
  },
  set: (value) => localStorage.setItem(colorModeKey, value),
};

export interface ThemeExplorerProps {
  theme: ChakraTheme;
  buttonProps?: ButtonProps;
}

export const ThemeExplorer: React.FC<ThemeExplorerProps> = ({
  theme,
  buttonProps,
}) => {
  const [defaultIsOpen, setDefaultIsOpen] = useLocalStorage(
    `${localStoragePrefix}OPEN`,
    false
  );
  const { isOpen, onClose, onToggle } = useDisclosure({
    defaultIsOpen,
    onOpen: () => setDefaultIsOpen(true),
    onClose: () => setDefaultIsOpen(false),
  });
  const windowRef = React.useRef<NewWindow | null>();

  React.useEffect(() => {
    const handleUnload = () => {
      windowRef.current?.release();
      setDefaultIsOpen(isOpen);
    };
    window.addEventListener("unload", handleUnload);
    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, [isOpen, setDefaultIsOpen]);

  React.useEffect(() => () => windowRef.current?.release(), []);

  const label = (isOpen ? "Close" : "Open") + " Chakra UI Theme Explorer";

  return (
    <ThemeProvider theme={explorerTheme}>
      <HStack
        spacing="4"
        as="aside"
        position="fixed"
        bottom="0"
        right="0"
        m="4"
      >
        <Tooltip label={label}>
          <IconButton
            onClick={onToggle}
            aria-label={label}
            colorScheme="teal"
            isRound
            icon={<Logo />}
            shadow="lg"
            willChange="transform"
            _hover={{
              shadow: "xl",
              transform: "translateY(-3px)",
            }}
            {...buttonProps}
          />
        </Tooltip>
      </HStack>
      {isOpen ? (
        <NewWindow
          title="Chakra UI Theme Explorer"
          onUnload={onClose}
          copyStyles={false}
          features={
            {
              location: false,
              toolbar: false,
              status: false,
              menubar: false,
              scrollbars: true,
              resizable: true,
            } as any
          }
          ref={(ref) => {
            windowRef.current = ref;
          }}
        >
          <Nested theme={theme} windowRef={windowRef} />
        </NewWindow>
      ) : null}
    </ThemeProvider>
  );
};

interface NestedProps {
  theme: ChakraTheme;
  windowRef: any;
}

export const Nested = ({ theme, windowRef }: NestedProps) => (
  <CacheProvider
    value={createCache({
      key: "theme-explorer-window",
      container: (windowRef.current as any)?.container,
    })}
  >
    <StandaloneThemeExplorer theme={theme} />
  </CacheProvider>
);

export interface StandaloneThemeExplorerProps {
  theme: ChakraTheme;
  router?: "memory" | "hash";
}

export const StandaloneThemeExplorer = ({
  theme,
  router = "memory",
}: StandaloneThemeExplorerProps) => {
  const Router: any = router === "hash" ? HashRouter : MemoryRouter;

  return (
    <ChakraProvider theme={explorerTheme} colorModeManager={colorModeManager}>
      <ThemeToExploreProvider theme={theme}>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Redirect to="/theme/fonts" />}
            />
            <Route
              path="/theme/:section"
              exact
              component={ThemeExplorerRoute}
            />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
      </ThemeToExploreProvider>
    </ChakraProvider>
  );
};
