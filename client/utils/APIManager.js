import axios from 'axios'

export default {
  get: (url, params, callback) => {
    axios.get(url, params)
    .then(response => {
      const confirmation = response.data.confirmation;
      if (confirmation != 'success'){
        callback({message: response.data.message}, null);
      }
      callback(null, response.data);
    })
    .catch(error => {
      callback(error, null);
    });
  },

  post: (url, body, callback) => {
    axios.post(url, body)
    .then(response => {
      const confirmation = response.data.confirmation;
      if (confirmation != 'success'){
        callback({message: response.data.message}, null);
      }
      callback(null, response.data);
    })
    .catch(error => {
      callback(error, null);
    });
  },

  put: (url, body, callback) => {
    axios.put(url, body.data)
    .then(response => {
      const confirmation = response.data.confirmation;
      if (confirmation != 'success'){
        callback({message: response.data.message}, null);
      }
      callback(null, response.data);
    })
    .catch(error => {
      callback(error, null);
    });
  },

  delete: (url, callback) => {
    axios.delete(url)
    .then(response => {
      const confirmation = response.data.confirmation;
      if (confirmation != 'success'){
        callback({message: response.data.message}, null);
      }
      callback(null, response.data);
    })
    .catch(error => {
      callback(error, null);
    })
  }
}
