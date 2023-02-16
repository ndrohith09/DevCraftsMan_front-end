import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Home from './home';
import { Nav } from './nav';
import Anaylsis from './analysis';
import Content from './content';
import Register from './register';
import Callback from './callback';

class Main extends Component {
    state = {  } 
    render() { 
        return (
            <Router >
            <ChakraProvider theme={theme}>
            {/* <Box fontSize="xl"> */}
              {/* <Grid  p={3}> */}
                {/* <ColorModeSwitcher justifySelf="flex-end" />  */}
                <Nav />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/analysis/:repo" element={<Anaylsis />} />
                    <Route path="/callback" element={<Callback />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/content/:repo/:file" element={<Content />} />
                </Routes> 

          </ChakraProvider>
          </Router>
        );
    }
}
 
export default Main;