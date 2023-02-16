import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Login from './components/login';
import Register from './components/register';
import Main from './components/main';

function App() {
  if (localStorage.getItem('_dev_token') === null) {
    return (
      <Router>
        <ChakraProvider theme={theme}>
          <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
              <ColorModeSwitcher justifySelf="flex-end" />

              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Grid>
          </Box>
        </ChakraProvider>
      </Router>
    );
  } else {
    return (
      <>
        <Main />
      </>
    );
  }

  // return (
  //   <ChakraProvider theme={theme}>
  //     <Box textAlign="center" fontSize="xl">
  //       <Grid minH="100vh" p={3}>
  //         <ColorModeSwitcher justifySelf="flex-end" />
  //     <Main />
  //         {/* <VStack spacing={8}>
  //           <Logo h="40vmin" pointerEvents="none" />
  //           <Text>
  //             Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
  //           </Text>
  //           <Link
  //             color="teal.500"
  //             href="https://chakra-ui.com"
  //             fontSize="2xl"
  //             target="_blank"
  //             rel="noopener noreferrer"
  //           >
  //             Learn Chakra
  //           </Link>
  //         </VStack> */}
  //       </Grid>
  //     </Box>
  //   </ChakraProvider>
  // );
}

export default App;
