import {
  CssBaseline,
  ThemeProvider,
  type ThemeProviderProps,
} from "@mui/material";

import { appTheme } from "../theme/theme";

type AppThemeProviderProps = {
  children: ThemeProviderProps["children"];
};

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
