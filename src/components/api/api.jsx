import axios from "axios";
// token decryption  
const CryptoJS = require("crypto-js"); 
// const passphrase = `${process.env.REACT_APP_ENCRYPT_KEY}`;
const passphrase = "U2FsdGVkX19GgWeS66m0xxRUVxfpI60uVkWRedyU15I";
// import dotenv from 'dotenv';
// dotenv.config();
if(localStorage.getItem("_dev_token") == null){
    var encryptText = "";
} 
else {
    var encryptText = localStorage.getItem("_dev_token");
    console.log(encryptText);

}

// const decryptWithAES = (ciphertext) => {
//     const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
//     const originalText = bytes.toString(CryptoJS.enc.Utf8);
//     return originalText;
// }

// const decryptText = decryptWithAES(encryptText);
// console.log(decryptText);

const instance = axios.create({
  baseURL : 'http://144.24.138.153:8001/',
  // baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmZDEzNDYyIiwiZXhwIjoxNjc1MzA0NjQ5Ljk0NDU5NH0.87dU50BOxgYM91Y7R1ydtE1HPBRu4RM7a_t_ympZcaY",
    Authorization: `Bearer ${encryptText}`,
    "Content-Type": "application/json",
  },
  // ... other options
});

export default instance;