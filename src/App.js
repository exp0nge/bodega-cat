import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  AspectRatio,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import CallToAction from './Cta';
import Sidebar from './Sidebar';
import Admin from './Admin';
import Mint from './Mint';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* <Box textAlign="center" fontSize="xl"> */}
      {/* <Grid minH="100vh" p={3}> */}
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <Sidebar>
        <Router>
          <Routes>
            <Route path="/" element={<CallToAction />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>

      </Sidebar>

      {/* </Grid> */}
      {/* </Box> */}
    </ChakraProvider>
  );
}

export default App;
