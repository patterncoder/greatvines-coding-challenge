# GreatVines Coding Challenge

This basic application demonstrates several api calls to Salesforce.  A decision was made to keep this very low level and not use any libraries or servers with the exception of the http-server package that is used to deliver the two static .html files, index.html and login.html.  Everything else is straight up HTML, CSS and JavaScript.

## Installation

Clone the project to your local machine:

```
git clone https://github.com/patterncoder/greatvines-coding-challenge.git 
```

NPM Install and Start
```
cd greatvines-coding-challenge
npm install
npm start
```

Open your browser and navigate to localhost:3000/login

Click the login button

This will trigger the OAuth2 workflow and upon successful authentication will return the user to the index.html page.

In the background the app pulls the access token from the url hash and puts it into local storage.



