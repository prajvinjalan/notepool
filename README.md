# Notepool

## Getting Started
1. Clone the repository:
```
git clone https://github.com/jalanp/notepool.git
cd notepool
```
2. Install dependencies and build the app:
```
npm install
npm run build
```
3. Start the app:
```
npm start
```
**App will be running on: http://localhost:3010**

### Alternative Options:

To have the build refresh on code changes, run the following commands on separate terminals:
```
webpack -w
npm run devstart
```
Specifying ```PORT=<port>``` for ```npm run devstart``` will change the port that the app runs on.  
Specifying ```DEBUG=notepool:server``` for ```npm run devstart``` will enable the debug function for the server.  
Specifying ```NODE_ENV=production``` for ```webpack``` will disable the Redux Logger middleware.

***IMPORTANT NOTE:*** Google and Facebook authentication will not work in local mode.

## TODO
- [x] Socket.io for real-time collaborating
- [x] Different types of collaborators (editor, viewer)
- [x] Add Google/Facebook authentication
- [x] Change password
- [ ] Forgot password (send email) (?), minimum requirements when registering (?)
- [x] List type notes
- [ ] React-grid-layout for notes? (will need a lot of refactoring)
- [x] Refactor express code to use ES6 notation
- [x] Notifications (e.g. for login/register confirmations and validations)
- [x] Home/Settings/Profile Details pages (*Settings and Profile Details coming soon*)
- [x] Search bar for notes (title &#10003;, content &#10003;, collaborators &#10003; - all separately)
- [x] Filter options for notes (colour &#10003;, permissions &#10003;, note type &#10003;)
