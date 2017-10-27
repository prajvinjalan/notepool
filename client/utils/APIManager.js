import axios from 'axios'
import Promise from 'bluebird'

export default {
  get: (url, params) => {
    return new Promise(function(resolve, reject) {
      axios.get(url, params)
      .then(response => {
        const confirmation = response.data.confirmation;
        if (confirmation != 'success'){
          reject(getErrors(response.data.message));
        }
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  post: (url, body) => {
    return new Promise(function(resolve, reject) {
      axios.post(url, body)
      .then(response => {
        const confirmation = response.data.confirmation;
        if (confirmation != 'success'){
          reject(getErrors(response.data.message));
        }
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  put: (url, body) => {
    return new Promise(function(resolve, reject) {
      axios.put(url, body.data)
      .then(response => {
        const confirmation = response.data.confirmation;
        if (confirmation != 'success'){
          reject(getErrors(response.data.message));
        }
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  delete: (url) => {
    return new Promise(function(resolve, reject) {
      axios.delete(url)
      .then(response => {
        const confirmation = response.data.confirmation;
        if (confirmation != 'success'){
          reject(getErrors(response.data.message));
        }
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }
}

// Parse errors and return an array
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
