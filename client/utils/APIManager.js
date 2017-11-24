import axios from 'axios'
import Promise from 'bluebird'

export default {
  // Exported get function that returns a promise based on a GET request
  get: (url, params) => {
    return new Promise(function(resolve, reject) {
      axios.get(url, params)
      .then(response => {
        const confirmation = response.data.confirmation;
        if (confirmation != 'success'){
          reject(getErrors(response.data.message));
          return;
        }
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  // Exported post function that returns a promise based on a POST request
  post: (url, body) => {
    return new Promise(function(resolve, reject) {
      axios.post(url, body)
      .then(response => {
        const confirmation = response.data.confirmation;
        if (confirmation != 'success'){
          reject(getErrors(response.data.message));
          return;
        }
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  // Exported put function that returns a promise based on a PUT request
  put: (url, body) => {
    return new Promise(function(resolve, reject) {
      axios.put(url, body.data)
      .then(response => {
        const confirmation = response.data.confirmation;
        if (confirmation != 'success'){
          reject(getErrors(response.data.message));
          return;
        }
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  // Exported delete function that returns a promise based on a DELETE request
  delete: (url) => {
    return new Promise(function(resolve, reject) {
      axios.delete(url)
      .then(response => {
        const confirmation = response.data.confirmation;
        if (confirmation != 'success'){
          reject(getErrors(response.data.message));
          return;
        }
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }
}

// Parses errors and returns an array
const getErrors = function(message){
  let arrayOfErrors = [];
  if(typeof message === 'object'){
    for(let i = 0; i < message.length; i++){
      arrayOfErrors.push(message[i].msg);
    }
  } else {
    arrayOfErrors.push(message);
  }
  return new Error(arrayOfErrors)
}
