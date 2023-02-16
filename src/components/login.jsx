import React, { Component } from 'react';
import {
  Container,
  Card,
  FormControl,
  FormLabel,
  Code,
  Link,
  Input,
  Button,
  Heading,
  CardBody,
  Stack,
  Image,
  Text,
  Box,
  CardFooter,
} from '@chakra-ui/react';
import Logo from "./assets/dev-craftsman.png";
import Banner from "./assets/banner.png";
import instance from './api/api';
 
class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  register = async e => {
    e.preventDefault(); 
    console.log('login' , this.state.username , this.state.password);
    try {
      await instance({
        url: '/login/',
        method: 'POST',
        data: {
          username: this.state.username.trim(),
          password: this.state.password,
        },
      }).then(res => {
        console.log(res.data);
        console.log(res.data.token);
        localStorage.setItem('_dev_token', res.data.token);
        this.setState({ isAlertOpen: true });
        if (res.status === 200) {
          try {
            window.location.href = '/';
          } catch (e) {
            alert(e);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  render() {
    return (
      <Container maxW="2xl" centerContent>
        <Card
          boxShadow="md"
          maxW="2xl"
          centerContent
          overflow="hidden"
          variant="outline"
        >
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
            </Heading>
          </Link>
        </Stack>
      </Box>

              <Heading fontSize="3xl">Login</Heading>

              <form>
                <FormLabel fontSize="md">Username</FormLabel>
                <Input name="username" onChange={this.changeHandler} type="text" placeholder='Enter username' />
                <br />
                <br />
                <FormLabel fontSize="md">Password</FormLabel>
                <Input name="password" onChange={this.changeHandler} type="password" placeholder='Enter password'/>
              </form>
            </CardBody>

            <CardFooter >
              <Button variant="solid" 
              onClick={this.register}
              colorScheme="gray">
                Login
              </Button>
            </CardFooter>

            <Text fontSize="md">
            Dont have an account?{' '}
  <Link color='gray.500'  href='/register'>
  Register here
  </Link>
</Text>
          </Stack>
          <br />
        </Card>
      </Container>
    );
  }
}

export default Login;
