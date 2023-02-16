import React, { Component } from 'react';
import {
  Container,
  Button,
  Box,
  Spacer,
  Progress,
  TableContainer,
  Table,
  Link,
  Tr,
  Th,
  Td,
  CardBody,
  SkeletonText,
  Skeleton,
  Card,
  Grid,
  GridItem,
  Text,
  AlertIcon,
  Alert,
  Heading,
  ListItem,
  List,
  ListIcon,
  Code,
  EditablePreview,
  Editable,
  EditableControls,
  Input,
  EditableInput,
  Tooltip,
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ContentEditable from 'react-contenteditable'
import instance from './api/api';


/* @description: This is a higher order component that
 *  inject a special prop   to our component.
 */
function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouter;
}

class Content extends Component {
  constructor(props) {
    super(props);
  this.contentEditable = React.createRef();  
  this.state = { 
    raiseError: false,
    addSuccess: false,
    isLoaded: false,
    fileRawContent: '',
    toShow: false,
    o_summary :'',
    isEditable: false,
    pushing: false,
  };
} 

  async componentDidMount() {

    this.setState({ isLoading: true });

    const { params } = this.props;
    const { file } = params;
    const { repo } = params;
    console.log(file);
    console.log(params);

    const gh_access_token = localStorage.getItem('_gh_token');

    try {
      await instance({
          url: '/file-content?gh_token=' + gh_access_token + '&repo=' + repo + '&file=' + file,
          method: 'GET',
      }).then(res => {
        this.setState({ 
          fileRawContent: res.data,
        });
      });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
    }
  }

  analyseRepo = async e => {
    this.setState({
      isLoaded: true,
    });


    const { params } = this.props;
    const { file } = params;
    const { repo } = params; 

    const gh_access_token = localStorage.getItem('_gh_token');
    try {
      await instance({
          url: '/generate' ,
          method: 'POST',
          data: {
            gh_token: gh_access_token,
            repo: repo,
            files: [file],
          }
      }).then(res => {
        console.log(res.data);
        this.setState({ 
          // addSuccess: true,
          raiseError: false,
          openai: res.data,
          isLoaded : false,
          toShow: true,
        });
      });
    } catch (error) {
      console.log(error);
      this.setState({ 
        raiseError: true,
        addSuccess: false,
      });
    }
  }

    pushCode = async (e) => {
      e.preventDefault();
      this.setState({ 
        pushing: true, 
      });
      const { params } = this.props;
      const { file } = params;
      const { repo } = params;
      const gh_access_token = localStorage.getItem('_gh_token');
      const newContent = this.contentEditable.current.innerHTML;
      console.log(newContent);
      // const base64 = this.state.fileRawContent;
      // const base64 = btoa(this.state.fileRawContent);
      try {
        await instance({
            url: '/edit?gh_token=' + gh_access_token + '&repo=' + repo + '&file=' + file + '&content=' + encodeURIComponent(this.state.fileRawContent),
            method: 'POST',
            headers : {"Content-Type": "application/x-www-form-urlencoded"}
        }).then(res => {
          console.log(res);
          this.setState({ 
            addSuccess: true,
            raiseError: false,
            pushing: false,
          });
          window.location.reload();
        });
      } catch (error) {
        console.log(error);
        this.setState({ 
          raiseError: true,
          addSuccess: false,
          pushing: false,
        });
      } 
  };

  render() {
    const { openai, pushing,raiseError, toShow, isLoaded, addSuccess, fileRawContent } =
      this.state;
    return (
      <Box>
        <Container maxW="8xl" mt={'10'}>
          <Text fontSize="2xl" fontWeight="bold">
            Summary your code
          </Text>
          {pushing ? 
                <Progress size="xs" isIndeterminate />
              : null}
          <br />

          {raiseError ? (
            <Alert status="error" variant="left-accent">
              <AlertIcon />
              Oops! Something went wrong
            </Alert>
          ) : null}

          {addSuccess ? (
            <Alert status="success" variant="left-accent">
              <AlertIcon />
              Repository Updated Successfully
            </Alert>
          ) : null}

          <Grid templateColumns="repeat(5, 1fr)">
            <GridItem w="100%" colSpan={3} h="10">
              <pre>  
                <Code
                  w = "90%"
                  p={5}
                  rounded={8}  

                >
                  <ContentEditable
              innerRef={this.contentEditable}
              html={fileRawContent} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={(e) =>  {
                this.setState({fileRawContent: e.target.value})
              }} // handle innerHTML change
              tagName='article' // Use a custom HTML tag (uses a div by default)
              style={{ whiteSpace: "pre-wrap" }}
            />
             
                </Code>
              </pre>
              <br />
              <Button colorScheme="gray" size="md" onClick={this.analyseRepo}>
                Generate
              </Button>
              &nbsp;&nbsp;
              <Button colorScheme="gray" size="md" onClick={this.pushCode}>
                Push Changes
              </Button>
              <br />
                  <br />
                  <br />
            </GridItem>

            <GridItem w="100%" colSpan={2}>
              {isLoaded ? (
                <Box padding="6" bg="white">
                  <Grid templateColumns="repeat(6, 1fr)" gap={6}>
                    <GridItem w="100%" colSpan={6}>
                      <Skeleton
                        height="20vh"
                        startColor="gray.100"
                        endColor="gray.100"
                      />
                      <br />
                      <Skeleton
                        height="20vh"
                        startColor="gray.100"
                        endColor="gray.100"
                      />
                      <br />
                      <Skeleton
                        height="20vh"
                        startColor="gray.100"
                        endColor="gray.100"
                      />
                    </GridItem>
                  </Grid>
                </Box>
              ) : null}
              {toShow ? (
                <>
                  <Card>
                    <CardBody>
                      <Heading size="xs" textTransform="uppercase">
                        Time Complexity
                      </Heading>
                      <Text>
                        The time complexity of this function is {openai[1]}
                      </Text>
                    </CardBody>
                  </Card>

                  <br />
                  <Card>
                    <CardBody>
                      <Heading size="xs" textTransform="uppercase">
                        Summary
                      </Heading>
                      <Text>
                        {openai[0]}
                      </Text>
                    </CardBody>
                  </Card>
                  <br />

                  <Card>
                    <CardBody>
                      <Heading size="xs" textTransform="uppercase">
                        Fixed Bugs
                      </Heading>
                      <pre>
                        <Text
                          overflow={'auto'}
                          dangerouslySetInnerHTML={{ __html: openai[2] }}
                        />
                      </pre>
                    </CardBody>
                  </Card>
                  <br />
                  <br />
                </>
              ) : null}
            </GridItem>
          </Grid>
        </Container>  
      </Box>
    );
  }
}

const HOCContent = withRouter(Content);
export default HOCContent;
