import React, { Component } from 'react'
import instance from './api/api';
import {Container} from '@chakra-ui/react';
class Callback extends Component {
    state = {  
        
    } 
    async componentDidMount() {

        // fetch the access token from the url 
        const url = window.location.href; 
        const hasCode = url.includes("?code="); 
        if (hasCode) { 
            const newUrl = url.split("?code="); 
            window.history.pushState({}, null, newUrl[0]);
            const code = newUrl[1];
            console.log(code); 

        // fetch the access token from the backend
        try {
            await instance({
              url: '/callback?code='+code,
              method: 'GET',
            }).then(res => { 
              console.log(res.data.gh_token);      
            localStorage.setItem('_gh_token', res.data.gh_token);
            window.location.href="/"
            });
          } catch (error) {
            console.log(error);
          }
        }
    }
    render() { 
        return (
            <Container>
Authorizing.... Dont close the tab you will be redirected
            </Container> 
        );
    }
}
 
export default Callback;