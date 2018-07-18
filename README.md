
## Overview - The Challenge

This client-side application is my response to a recruitment challenge offered by Burkson a few days ago:

1) Create a page displaying homes for potential buyers. Include UI for narrowing results down to price range, square footage, and bedroom count.

2) John and his friend Jack both like to swim… but rarely at the same time. Every third day, Jack will swim in the pool alone. When Jack isn’t swimming, John will swim in the pool alone. However, every 50th day, both boys will swim in the same pool. Write some pseudocode that loops through 365 days, and outputs who is swimming on each day starting at day 1.

3) Display a table of "Employees” from a JSON source that when displayed on a desktop device looks like a table, but looks more like a set of tiles/cards when shown on a smaller mobile device. Bonus: Use a profile image as part of the data to display.

Each of these 3 challenges are addressed by a page (one, two, three) of this application.

## Technology Stack

- Typescript, Javascript, ES6, JSON, LESS
- Vue
- Markdown
- Node, NPM, GIT, Webpack

## Source Code Repository

### https://github.com/canright/BurksonChallenge

The three most important files are the responses to the three challenges:

- /src/views/ChallengeOne.vue - Vue source for Property Listing page
- /src/views/ChallengeTwo.vue - Vue source for Pool Reservations page
- /src/views/ChallengeThree.vue - Vue source for Employee Listing page

These files are also significant:

- /src/router.ts - Vue application router
- /src/App.vue - Base Vue Component hosts the application level style sheets
- /src/views/Home.vue - Vue source for the Home page
- /src/views/Resume - Vue source for the Resume page

## Building the Application - npm run build

  After initial clone and install in a node development environment,
  notice that the package.json defines a build script.
  
  So, run this from the command line:

    > npm run build

  To produce the '/dist/ folder, which is the application ready to be hosted
  by any static web server.

  To publish the website, I SSH copied that folder to my server and configured it
  to serve http:burkson.canright.net.

## Hosted at [burkson.canright.net](http:burkson.canright.net)
