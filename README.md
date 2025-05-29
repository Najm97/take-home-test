This is a simple express app with CRUD endpoints for manipulating policies data in memory. 

## Created with
- node version v22.16.0
- npm version 10.9.2
- express version 5.1.0

## How to run
1. npm install
2. npm run dev to start dev server
3. api endpoints can be accessed at http://localhost:3000

## Authentication for protected endpoints
For the protected endpoints, a simple middleware has been added to the request pipeline which looks for a header called **x-api-key** and verifies the api key. The api key has been hardcoded for this demo and the correct value to send in the header is **secret123**.

## Assumptions
1. For the endpoint which returns all policies belonging to the specified customer, I have assumed the product object for each policy is not required since its not mentioned in the instructions. 

2. For the create policy endpoint, have assumed the id and createdAt fields are set by the server while all other required propertys come from the client. 

3. For the update endpoint, have assumed the whole policy object except the id will be passed in the request which will override whats in the db. 

4. Assumed there arent going to be any concurrent updates to the policys.

## General feedback
I have a really busy schedule these days and dont have the time to look more into this. Even now as I write, got a chance to put this piece together after family has gone to sleep. The test coverage I know is not extensive and much more can certainly be done for the rest of the code and endpoints but for now, I've just focused on a single endpoint.  

If I had to this for production, then below are some of the improvements I would make:
1. Add more unit tests
2. Add validation rules to the request payloads. Currently no validation is being done on the data passed in the request e.g. when creating a new policy. Several validation rules can be applied such as:
    1. verifying the data types, 
    2. ensuring product category, policy status and product ids are valid
    3. startDate, endDate and createdAt formats are correct and that endDate is not before startDate etc.
3. Use a logging library and add more logs to understand whats going on in case need to investigate something
4. Add linting and styling enforcement using something like ESLint and Prettier to ensure consistency throughout codebase
5. Add dockerfile so an image can be created and the app can be run inside a container
6. Remove hardcoded api key and ensure this comes from a secure source

