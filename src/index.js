import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import CallToAction from './Cta';
import Sidebar from './Sidebar';
import Admin from './Admin';
import Mint from './Mint';
import ViewCat from './Details';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';


if (!('process' in window)) {
  // @ts-ignore
  window.process = {}
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      {/* <Box textAlign="center" fontSize="xl"> */}
      {/* <Grid minH="100vh" p={3}> */}
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <Sidebar>
        <Router>
          <Routes>
            <Route path="/" element={<CallToAction />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/view" element={<ViewCat />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>

      </Sidebar>

      {/* </Grid> */}
      {/* </Box> */}
    </ChakraProvider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
