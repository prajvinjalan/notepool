export default {
  authenticateUser: (user) => {
    localStorage.setItem('user', user);
    return;
  },

  isUserAuthenticated: () => {
    return localStorage.getItem('user') !== null;
  },

  deauthenticateUser: () => {
    localStorage.removeItem('user');
    return;
  },

  getUserId: () => {
    return localStorage.getItem('user');
  }
}
