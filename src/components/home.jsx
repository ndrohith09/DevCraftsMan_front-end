import React, { Component } from 'react';
import {
  Container,
  Heading,
  Link,
  HStack,
  Button,
  Box,
  Kbd,
  Spacer,
  Input,
  InputGroup,
  List,
  ListItem,
  ListIcon,
  InputLeftElement,
  Grid,
  GridItem,
  InputRightElement,
  Text,
  Flex,
  AlertIcon,
  Alert,
  Divider,
  Table,
  Thead,
  TableCaption,
  Tbody,
  Tr,
  Th,
  Icon,
  Td,
  Tfoot,
  Toast,
  Progress,
  TableContainer,
} from '@chakra-ui/react';
import { CheckCircleIcon ,CloseIcon } from '@chakra-ui/icons';
import instance from './api/api';
import {
  Github,
  AtlassianColor,
  BitbucketColor,
  GitHubColor,
  VpnKey,
  ShieldCheck,
} from 'sketch-icons';

class Home extends Component {
  state = {
    repository: '',
    auth_key: '',
    repos: [],
    gh_token: '',
    gh_user :'',

    isLoading: true,

    raiseError: false,
    addSuccess: false,
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async componentDidMount() {
    console.log('componentDidMount');
    const gh_access_token = localStorage.getItem('_gh_token');

    if (gh_access_token !== null) {
      this.setState({ gh_token: true });
    }

    try {
      await instance({
        url: '/repo?gh_token=' + gh_access_token,
        method: 'GET',
      }).then(res => {
        console.log(res.data);
        this.setState({
          repos: res.data.repo,
          gh_user : res.data.user,
          isLoading: false,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  // onAdd = async e => {
  //   e.preventDefault();
  //   const { repository, auth_key } = this.state;
  //   if (repository === '' || auth_key === '') {
  //     this.setState({ raiseError: true });
  //     return;
  //   } else {
  //     try {
  //       await instance({
  //         url: '/repo',
  //         method: 'POST',
  //         data: {
  //           url: this.state.repository.trim(),
  //           auth_key: this.state.auth_key,
  //         },
  //       }).then(res => {
  //         this.setState({ raiseError: false, addSuccess: true });
  //         window.location.reload();
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  githubAuth = async e => {
    e.preventDefault();
    window.location.href = 'http://64.227.136.134:8001/gh-authorize';
  };

  render() {
    const { isLoading, gh_user, repos, gh_token, addSuccess, raiseError } = this.state;

    return (
      <Box>
        <Container maxW="8xl" mt={'10'}>
          {raiseError ? (
            <Alert status="error" variant="left-accent">
              <AlertIcon />
              Fill all fields
            </Alert>
          ) : null}

          {addSuccess ? (
            <Alert status="success" variant="left-accent">
              <AlertIcon />
              Repository Added
            </Alert>
          ) : null}

          <Grid templateColumns="repeat(5, 1fr)">
            {gh_token ? (
              <GridItem w="100%">
                <Box
                  p={5}
                  as="button"
                  shadow="base"
                  disabled
                  rounded={5}
                  borderColor="green"
                  borderWidth="1px"
                >
                  <HStack spacing="20px">
                    <Icon as={CheckCircleIcon} boxSize={5} color="green" />
                    <Text>Connected with Github</Text>
                    <Spacer />
                  </HStack>
                </Box>
              </GridItem>
            ) : (
              <GridItem w="100%">
                <Box
                  p={5}
                  as="button"
                  shadow="base"
                  rounded={5}
                  borderWidth="1px"
                  onClick={this.githubAuth}
                >
                  <HStack spacing="20px">
                    <GitHubColor height={25} />
                    <Text>Connect with Github</Text>
                    <Spacer />
                  </HStack>
                </Box>
              </GridItem>
            )}

            <GridItem w="100%">
              <Box
                p={5}
                as="button"
                shadow="base"
                rounded={5}
                borderWidth="1px"
              >
                <HStack spacing="20px">
                  <BitbucketColor height={25} />
                  <Text>Connect with Bitbucket</Text>
                  <Spacer />
                </HStack>
              </Box>
            </GridItem> 
          </Grid>

          
        </Container>
        <br />
        <br />
        <Container maxW="8xl" mt={'15'}>
          <Spacer />
          <Divider orientation="horizontal" />
          <Box>
            <Text fontSize="2xl" fontWeight="bold" my="5">
              {gh_user} Repositories
            </Text>
            <Spacer />
            {gh_token ? 
            ( 
              isLoading ? (
                <Progress size="xs" isIndeterminate />
              ) : (
                <TableContainer>
                  <Table variant="simple">
                    <TableCaption>Your Repositories appear here</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Repository Name</Th>
                        <Th>Private</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {repos.length !== 0 ? (
                        repos.map((repo, index) => (
                            <Tr key={index}>
                          <List spacing={3}>
                              <Td>
                                <ListItem>
                                  <Link href={`/analysis/${repo.repo}`}>
                                    <ListIcon as={Github} color="green.500" />
                                    {repo.full_name}
                                  </Link>
                                </ListItem>
                          
                              </Td>
                              </List>
                              <Td>
                                {repo.private === "True" ? (
                                  <Icon as={CheckCircleIcon} boxSize={5} color="green" />
                                ) : (
                                  <Icon as={CloseIcon} boxSize={5} color="red" />
                                )}
                              </Td>
                            </Tr>
                        ))
                      ) : (
                        <Tr>
                          <Td>
                            <Text fontSize="md">No repo</Text>
                          </Td>
                          <Td></Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              )
            )
            : 
            <Text fontSize="md" my="5">
              Connect with Github to view your repositories
            </Text>
            }

          </Box>
        </Container>
      </Box>
    );
  }
}

export default Home;
