import React, { Component } from 'react';
import {
  Container,
  Card,
  FormControl,
  FormLabel,
  Link,
  Input,
  Button,
  Heading,
  CardBody,
  Stack,
  Image,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  Box,
  AlertTitle,
  CloseButton,
  CardFooter,
} from '@chakra-ui/react';
import Logo from "./assets/dev-craftsman.png";
import instance from './api/api';
import Banner from "./assets/banner.png";


class Register extends Component {
  state = {
    isAlertOpen: false,
    username: '',
    password: '',
  };


  register = async e => {
    e.preventDefault(); 
    console.log('register' , this.state.username , this.state.password);
    try {
      await instance({
        url: '/register/',
        method: 'POST',
        data: {
          username: this.state.username.trim(),
          password: this.state.password,
        },
      }).then(res => {
        console.log(res.data);
        localStorage.setItem('_dev_token', res.data.token);
        this.setState({ isAlertOpen: true });
        window.location.href = '/';
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.detail);
    this.setState({
        isAlertOpen: true,
      });
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { isAlertOpen } = this.state;
    return (
      <Container maxW="2xl" centerContent>
        <Card
          boxShadow="md"
          maxW="2xl"
          centerContent
          overflow="hidden"
          variant="outline"
        >
          {isAlertOpen ? (
            <Alert status="error" variant="subtle">
              <AlertIcon />
              <Text fontSize="md">Username already exists!</Text>
            </Alert>
          ) : null} 
          <Image
            objectFit="cover"
            maxW={{ base: '100%', sm: '550px' }}
            src={Banner}
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody>
              <Box p={2} ml={'25%'}>
                <Stack direction="row" isInline>
                  <Image
                    boxSize={{ base: '30px', md: '40px' }}
                    objectFit="contain"
                    src={Logo}
                    alt="React-icons"
                  />
                  <Link href="/" style={{ textDecoration: 'none' }}>
                    <Heading
                      fontSize={{ base: '20px', md: '25px', lg: '30px' }}
                      fontFamily="system-ui"
                    >
               Dev-Craftsman &nbsp;&nbsp; 
                      <span></span>
                    </Heading>
                  </Link>
                </Stack>
              </Box>

              <Heading fontSize="3xl">Register</Heading>

              <FormControl>
                <FormLabel fontSize="md">Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  onChange={this.changeHandler}
                  placeholder="Enter username"
                />
                <br />
                <br />
                <FormLabel fontSize="md">Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={this.changeHandler}
                  placeholder="Enter password"
                />
              </FormControl>
            </CardBody>

            <CardFooter>
              <Button
                variant="solid"
                colorScheme="gray"
                onClick={this.register}
              >
                Register
              </Button>
            </CardFooter>

            <Text fontSize="md">
              Already have an account?{' '}
              <Link color="gray.500" href="/">
                Sign in here
              </Link>
            </Text>
          </Stack>
          <br />
        </Card>
      </Container>
    );
  }
}

export default Register;
