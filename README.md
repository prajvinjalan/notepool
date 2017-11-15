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
Specifying ```NODE_ENV=<dev>``` will apply the Redux Logger middleware.

## Notes
+ use react-grid-layout for notes? (will need a lot of refactoring)
