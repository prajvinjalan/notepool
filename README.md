# Notepool

## Getting Started
1. Clone the repository:
```
git clone https://github.com/jalanp/notepool.git
cd notepool
```
2. Install dependencies and bundle using webpack:
```
npm install
webpack
```
3. Start the app:
```
npm start
```
**App will be running on: http://localhost:3000** (can also specify port using ```PORT=<port> npm start```)

### Alternative Options:

To have the build refresh on code changes, run the following commands on separate terminals:
```
webpack -w
npm run devstart
```
Specifying ```DEBUG=notepool:server``` will enable the debug function for the server.  
Specifying ```NODE_ENV=dev``` will apply the Redux Logger middleware.

## TODO (eventually?)
- [x] Socket.io for real-time collaborating
- [x] Different types of collaborators (editor, viewer)
- [x] Add Google/Facebook authentication
- [x] Change password
- [ ] Forgot password (send email) (?), minimum requirements when registering (?)
- [ ] More complicated notes (lists and other formatting?)
- [ ] React-grid-layout for notes? (will need a lot of refactoring)
- [x] Refactor express code to use ES6 notation
- [x] Notifications (e.g. for login/register confirmations and validations)
