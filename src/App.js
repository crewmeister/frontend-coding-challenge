import React, {useMemo} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AbsenceManager from "./views/AbsenceManager";
import StoreProvider from './store/StoreProvider';

import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createTheme
} from '@material-ui/core/styles';

import variables from "./assets/scss/_variables.scss";
import 'bootstrap/dist/css/bootstrap.css';
import './assets/scss/styles.scss';

const ContentWrapper = ({children}) => {
  const theme = useMemo(
      () => createTheme({
          palette: {
              primary: {
                main: variables.primary,
              },
              secondary: {
                  main: variables.secondary,
                },
                type: 'light',
              },
          }),
      []
  );
  return (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )
}

function AbsenseManager() {
  return (
    <Router>
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<AbsenceManager />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ContentWrapper>
    </Router>
  );
}

function App() {
  return (
    <StoreProvider>
      <AbsenseManager />
    </StoreProvider>
  );
}

export default App;
