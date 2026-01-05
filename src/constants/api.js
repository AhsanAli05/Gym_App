// const baseUrl = "https://dev.mycabify.co.uk" // dev
// // const baseUrl = 'https://mycabify.co.uk'; // production
// const backendPort = '3300';
// export const apiUrl = `${baseUrl}:${backendPort}/api`;
// export const serviceUrl = `${baseUrl}:${backendPort}/service`;


// Frontend API configuration for Trainer Booking Project

// For local development
const baseUrl = "http://172.25.176.1"// my local ip address
const backendPort = "5000"; // port your backend is running on

export const apiUrl = `${baseUrl}:${backendPort}/api`;

// If you have additional services in future
export const serviceUrl = `${baseUrl}:${backendPort}/service`;



// export const AUTH_ENDPOINTS = {
//   SYNC: `${apiUrl}/auth/sync`,
//   LOGIN: `${apiUrl}/auth/login`,
//   REGISTER: `${apiUrl}/auth/register`,
// };

export const API = {
  AUTH: {
    SYNC: `${apiUrl}/auth/sync`,
    LOGIN: `${apiUrl}/auth/login`,
  }
};



