GUIDELINES

A production build of this project can be found under mt_assignment/dist

For development please follow the steps bellow

1. Make sure you use version of node > 6 (I use 8.9.4 on linux and 8.1.2 on windows 10)

2. In order to download dependencies
npm install

3. In order to run the project in development mode in local server
npm start -s

4. In order to make a production build
npm run build

ISSUES FOR CONSIDERATION

- In case no waypoints are presented, please change the vessel's mmsi in the API call

FURTHER DEVELOPMENT

1. Future implementation: Create unit tests

2. Future implementation: Implement accurate heading calculation as the current animation implementation uses heading directly supplied by the API

3. Future implementation: Set map zoom on initial load based on limiting markers

4. Future implementation: Use different vessel icon and animate angle based on heading



