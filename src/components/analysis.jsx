import React, { Component } from 'react';
import instance from './api/api';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

import {
  Container,
  Button,
  Box,
  Spacer,
  Code,
  Skeleton,
  Table,
  Link,
  Tr,
  Th,
  Td,
  Heading,
  Tbody,
  SkeletonText,
  Grid,
  GridItem,
  Text,
  AlertIcon,
  Alert,
  Select,
  ListItem,
  HStack,
  List,
  ListIcon,
  Progress,
  Stack,
} from '@chakra-ui/react';
import { File, ViewList, GlobalNetwork,BracesAsterisk } from 'sketch-icons';
import { useParams } from 'react-router-dom';
import jsPDF from "jspdf";
import "jspdf-autotable";

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


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

class Analysis extends Component {
  constructor(props) {
    super(props); 
  this.ref = React.createRef();  
  this.state = {

    // variable for analysis
    files : [],
    clones : [], 
    referral_sources : [],
    visitors : [],
    analytics : [],
    isLoading : false,
    languages : [],
    repo :'',
    repos: [],

    report : '',

    repository: '',
    isGenerating: false,
    raiseError: false,
    addSuccess: false,

    isLoaded : false,
    toShow : true,

    openai : "",

    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };
  }
  async componentDidMount() {

    this.setState({ isLoading: true });

    const { params } = this.props;
    const { repo } = params;
    console.log(repo);
    console.log(params);

    const gh_access_token = localStorage.getItem('_gh_token');

    try {
      await instance({
          url: '/content?gh_token=' + gh_access_token + '&repo=' + repo,
          method: 'GET',
      }).then(res => {
        console.log(res.data.files);
        this.setState({
          files : res.data.files,
          clones : res.data.clones[0], 
          referral_sources : res.data.referral_sources, 
          visitors : res.data.visitors[0], 
          analytics : res.data.analytics, 
          languages : res.data.languages,
          repo : repo,
          isLoading : false,
          
        });
      });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
    }
  }

  downloadPdf = async(e) => {
    e.preventDefault();
    const { params } = this.props;
    const { repo } = params; 

    const doc = new jsPDF();
    const text = `Dev Craftsman \n\n Report Generated for ${repo} \n\n ${this.state.openai} \n\n Thank you for using DevCraftsman`;
    doc.text(
      20,20, text,
      { maxWidth: 180, align: "left" ,lineHeightFactor: 1.5 , fontSize: 8 , textOverflow: "ellipsis" } 
      );
    doc.save(repo + "_report.pdf");
  }

  generateReport = async e => {
    this.setState({ isGenerating: true });
    e.preventDefault();

    const { params } = this.props; 
    const { repo } = params; 

    const gh_access_token = localStorage.getItem('_gh_token');

    const fileNames = [];
    const { files } = this.state;
    // Loop through the files and add the file names to the fileNames list
    for (let i = 0; i < files.length; i++) {
      fileNames.push(files[i].file);
    }

    console.log(fileNames);

    try {
      await instance({
          url: '/generate-multiple' ,
          method: 'POST',
          data: {
            gh_token: gh_access_token,
            repo: repo,
            files: fileNames,
          }
      }).then(res => {
        console.log(res.data);
        this.setState({ 
          raiseError: false, 
          openai: res.data.join(''),
          isGenerating: false,
        });
      });
    } catch (error) {
      console.log(error);
      this.setState({ 
        raiseError: true,
        addSuccess: false,
        isGenerating: false,
      });
    }
    
  };


  render() {
    const { 
      files,
      clones, 
      languages,
      referral_sources, 
      visitors, 
      isLoading,
      analytics,
      repo,
      raiseError,
      openai,
      isGenerating,
      ref,
       toShow, isLoaded, addSuccess, repos } = this.state;

    const vOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Visitors',
        },
      },
    }; 

    const cOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Clones',
        },
      },
    }; 

    return (
      <Box>
        <Container maxW="8xl" >
          <Text fontSize="3xl" fontWeight="bold">
            Analysis your code
          </Text>
          <br />
          {raiseError ? (
            <Alert status="error" variant="left-accent">
              <AlertIcon />
              Please provide repository name
            </Alert>
          ) : null}

          {addSuccess ? (
            <Alert status="success" variant="left-accent">
              <AlertIcon />
              Repository Added
            </Alert>
          ) : null}
 
          {isLoading ?
          <Box padding='6' bg='white'>
            <Text fontSize="md">
            Please wait while we are analysing your code
          </Text>
          <Grid templateColumns="repeat(6, 1fr)" gap={6}>
            <GridItem w="100%" colSpan={2}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='4' />
            </GridItem>

            <GridItem w="100%" colSpan={4}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='4' />
            <br />
            <Skeleton height='30vh' startColor='gray.100' endColor='gray.100'/>
            <br />
            <Skeleton height='30vh' startColor='gray.100' endColor='gray.100'/>
            </GridItem>
          </Grid>

        </Box>
          : 
          <Grid templateColumns="repeat(6, 1fr)" gap={6}>
          <GridItem w="100%" colSpan={2}>
            <Text fontSize="xl" fontWeight="bold" pb={5}>
              Files
            </Text>

            <List spacing={3}>
              {files ? 
              files.map((file, index) => (
              <ListItem>
                
                <ListIcon as={file.type ==="file" ? File : ViewList} />
                <Link
                  href={'/content/'+repo +"/"+ file.file} 
                >
                  {file.file}
                </Link>
              </ListItem>
              ))
              : 
              <Text fontSize="md">No files</Text>}
            </List>

            <br />
            <br />
            <Text fontSize="xl" fontWeight='bold' pb={5}>
              Report
            </Text> 
            {isGenerating ? 
                <Progress size="xs" isIndeterminate />
            
          : null}
            <Text fontSize="md" pb={5}>
              {openai}
            </Text>
 
            <Button colorScheme="gray" size="md" onClick={this.generateReport}>
                Generate Report
              </Button>
              &nbsp;&nbsp;
              {openai.length > 0 ?
              <Button colorScheme="gray" size="md" onClick={this.downloadPdf}>
                Download Report
              </Button>
               : null}

              
          </GridItem>
          <GridItem
            w="100%"
            colSpan={4}
            rounded={8}
            h="40"
            // boxShadow="xs"
            p={5}
          >
            <Text fontSize="xl" fontWeight="bold" pb={5}>
              Analytics
            </Text>

            <Stack spacing={10} direction="row">
              <Box p={5} shadow="md" w="100%" borderWidth="1px" rounded={5}>
                <HStack>
                  <Box>
                    <Text fontSize="lg">No of stars :</Text>
                  </Box>
                  <Box>
                    <Text fontSize="lg">{analytics.stars}</Text>
                  </Box>
                </HStack>

                <HStack>
                  <Box>
                    <Text fontSize="lg">No of forks :</Text>
                  </Box>
                  <Box>
                    <Text fontSize="lg">{analytics.forks}</Text>
                  </Box>
                </HStack>

                <HStack>
                  <Box>
                    <Text fontSize="lg">No of Contributors :</Text>
                  </Box>
                  <Box>
                    <Text fontSize="lg">{analytics.contributors}</Text>
                  </Box>
                </HStack>
              </Box>
              <Box p={5} shadow="md" w="100%" borderWidth="1px" rounded={5}>
                <HStack>
                  <Box>
                    <Text fontSize="lg">No of Clones :</Text>
                  </Box>
                  <Box>
                    <Text fontSize="lg">{analytics.total_clones}</Text>
                  </Box>
                </HStack>

                <HStack>
                  <Box>
                    <Text fontSize="lg">No of Branches :</Text>
                  </Box>
                  <Box>
                    <Text fontSize="lg">{analytics.branches}</Text>
                  </Box>
                </HStack>

                <HStack>
                  <Box>
                    <Text fontSize="lg">No of Issues :</Text>
                  </Box>
                  <Box>
                    <Text fontSize="lg">{analytics.issues}</Text>
                  </Box>
                </HStack>
              </Box>
              
            </Stack>
            <br />
            <Stack spacing={10} direction="row">
            <Box p={5} shadow="md" borderWidth="1px" w="100%" rounded={5}>

              <HStack>
                <Box>
                  <Text fontSize="lg">No. of Pull Request :</Text>
                </Box>
                <Box>
                  <Text fontSize="lg">{analytics.pull_requests}</Text>
                </Box>
              </HStack>

              <HStack>
                <Box>
                  <Text fontSize="lg">No. of Commits :</Text>
                </Box>
                <Box>
                  <Text fontSize="lg">{analytics.commits}</Text>
                </Box>
              </HStack>

              <HStack>
                <Box>
                  <Text fontSize="lg">Releases :</Text>
                </Box>
                <Box>
                  <Text fontSize="lg">{analytics.releases}</Text>
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <Text fontSize="lg">Top referal sources :</Text>
                  <List>
                    {referral_sources.length ? 
                    referral_sources.map((ref, index) => (
                      <ListItem>
                      <ListIcon as={GlobalNetwork} color="green.500" />
                      {ref.source}
                    </ListItem>
                    ))
                    : 
                    <ListItem>
                    <ListIcon as={GlobalNetwork} color="green.500" />
                    github.com
                  </ListItem>
                  }
                    
                  </List>
                </Box>
              </HStack>
            </Box>
            <Box p={5} shadow="md" w="100%" borderWidth="1px" rounded={5}>
            <HStack>
                <Box>
                  <Text fontSize="lg">Languages :</Text>
                  <List>
                    {languages.length ?
                    languages.map((lang) => (
                  <ListItem>
                    <ListIcon as={BracesAsterisk} color="green.500" />
                    {lang.language}
                  </ListItem> 
                    )) 
                    
                   : null}
                    
                  </List>
                </Box>
              </HStack>
              </Box>
            </Stack>

            <br />
            <Box shadow="md" borderWidth="1px" w="100%" rounded={5} p={5}>
              <Line  
              data = {
                { 
                  labels: visitors.timestamp, 
                  datasets: [
                    {
                      label: 'visitors', 
                      data: visitors.count,
                      borderColor: 'rgb(53, 162, 235)',
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                  ],
                }
              } 
              options={vOptions} />
            </Box>

            <br />
            <Box shadow="md" borderWidth="1px" w="100%" rounded={5} p={5}>
            <Line  
              data = {
                { 
                  labels: clones.timestamp, 
                  datasets: [
                    {
                      label: 'clones', 
                      data: clones.count,
                      backgroundColor: 'rgba(255,99,132,0.2)',
                      borderColor: 'rgba(255,99,132,1)',
                      borderWidth: 1,
                      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                      hoverBorderColor: 'rgba(255,99,132,1)',
                    },
                  ],
                }
              } 
              options={cOptions} /> 
            </Box>
            <br />
            <br />
          </GridItem>
        </Grid>
         } 

         <br />
        </Container>
        <br /> 
        
    
      </Box>
    );
  }
}

const HOCAnalysis = withRouter(Analysis);
export default HOCAnalysis;
