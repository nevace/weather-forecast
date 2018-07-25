# 5 Day Weather Forecast

I've set this project up in a similar way to how I'd set up a react project from scratch. I have the linting/code style 
rules in my IDE and would usually add a precommit hook with prettier to format everything consistently.

I haven't used redux, mobX etc. for state management due to the simple nature of this project. The extra 
boilerplate would be overkill but I'm happy to add that in if that's what was expected. Usually, the api related code 
would be taken care of within whatever side effects library was used (redux-saga, redux-thunk, redux-observable etc).

I've written a few tests to demonstrate how I'd go about testing but it's by no means exaustive.

The server is as minimal as it gets. If I was hosting this for real then I'd setup a docker based CI pipeline
(I'm using Codeship at the moment). An example of a blog I setup for my partner which uses docker/nginx/node/letsencrypt:
https://www.flashpackingaroundtheworld.com

If I had more time, it would cool to use a map to select the country the user wishes to get weather data from.
 
### Installing

After cloning the project, install dependencies:

```
npm i
```

Then build the project:

```
npm run build
```

Then run the server:

```
npm start
```

### Development

For any development or to look at the dev environment:

```
npm run dev
```


### Running the tests

```
npm test
```
