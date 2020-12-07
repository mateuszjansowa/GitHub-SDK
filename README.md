
# Github-SDK

![My code implementation](https://github.com/mateuszjansowa/GitHub-SDK/blob/main/assets/code.PNG?raw=true)
  


In this repository I decided to build a **Github** [Software Development Kit](https://en.wikipedia.org/wiki/Software_development_kit) 🤓


Imagine all thins that are held by User Interface on Github website can be reflected in JavaScript terminal using **Github API**.

Build of Github SDK allows me to maximize productivity, save time and energy while doing automated stuff related to *Github activity* 📝 


...and most important of it all: I've learnt about Unit Testing and TDD.


So the whole project is built using [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) methodology. 
It is a development process in which software requirements and functionalities are firstly converted to **test cases**. Next step is to build an implementation that passess both software requirement and test case. After all there is a code refactoring. It is so called **'red-green-refactor'** cycle.




![Red green refactor cycle](https://philippe.bourgau.net/imgs/2017-06-28-dont-stick-to-tdds-red-green-refactor-loop-to-the-letter/red-green-refactor.jpg)



⚙️ Please read down below **how to use** the SDK ⚙️

  

## Main technologies of the project

 📒 **JavaScript** (including ES6+ features)
 
 📙 **Jest** Unit testing library
 
 📗 **Node.js**



 ![Jest testing library](https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/940/square_256/jestlogo.png)![node.js](https://www.shareicon.net/data/256x256/2015/09/11/99371_javascript_512x512.png)![JavaScript (ES6+ features)](https://piecioshka.pl/assets/images/posts/javascript/logo-javascript.svg)
  

## Installation

 1. First of all you need to install all required npm packages using in your *terminal window*:

    `npm i` 
 
 2. It is crucial to configure `config.gh.js` file in `src/js` directory. 

    Do it in a way:
 
```
export const configGH  =  {

username: 'PROVIDE YOUR GITHUB USERNAME',

token: 'PROVIDE GENERATED TOKEN FROM GITHUB',



repository:  'PROVIDE REPOSITORY NAME YOU WANT TO CHECK`,

outsideUser: 'PROVIDE USER NAME YOU WANT TO CHECK',

  
NO NEED TO EDIT DATA BEYOND. INSTEAD YOU CAN USE IT IN JEST TESTS

}
```
3. Remember to add your *unique token* in 
 ``src/js/modules/token.js``

5. I decided to use *html-webpack-plugin* for your convenience so you can try output of the SDK using console.log (without need to implement it in your project). That's why feel free to run via *terminal*: 

    `npm start`
 
 5. In another *terminal window* pass to run the tests:

    ``npm run test-watch``

    It will automatically run the tests with every change of JS code.
 
  
## Functionalities & 'how to'

### ⚙️ Current functionalities of my Github SDK ⚙️

You can check any of the functionalities using ``console.log`` in a way: 
```
githubSDK.getUserInfo(configGH.outsideUser)
.then(data=>console.log(data)
.catch(err=>console.error(err)
```
### ⚙️ Methods ⚙️
### Information

 - [x] Get information about user
``githubSDK.getUserInfo(configGH.outsideUser)``

 - [x] Get information about user's repositories
``githubSDK.getUserRepos(configGH.username)``

 - [x] Get information about your commits to repositories
``githubSDK.getReposCommits(configGH.repository)``

 - [x] Get information about another (outside) user activity
``githubSDK.getUserActivity(configGH.outsideUser)``

### Invitations

 - [x] Send invitation to repository for another (outside) user
`githubSDK.sendInvitation(configGH.repository, configGH.outsideUser)`

 - [x] Remove invitation to repository of another (outside) user
``githubSDK.removeInvitation(configGH.repository, configGH.outsideUser)``

 - [x] List invitations your repository
 ``githubSDK.listInvitations(configGH.repository)``

### Starring

 - [x] Star another's user repository
``githubSDK.starRepo(configGH.outsideUser, configGH.repository)``

 - [x] Remove Star from repository
 ``githubSDK.removeStarFromRepo(configGH.outsideUser, configGH.repository)``
 
### PRs

 - [x] Show Pull Requests of repository
 ``githubSDK.showPullRequests(configGH.outsideUser, configGH.repository) `` 

### Forks

 - [x] List forks of a given user and his/her repository
 ``githubSDK.listForks(configGH.outsideUser, configGH.repository)``
 
 - [x] Fork a repository from another user
 ``githubSDK.forkRepo(configGH.outsideUser, configGH.repository)``

  
## What I found most difficult... 🧠

Project is built entirely with usage of [TDD technology](https://en.wikipedia.org/wiki/Test-driven_development).

The most challenging task was to implement TDD and Unit Testing. 

1. First of all: **Writing *test* that doesn't pass**.
```
// app.test.js

it('Loads user data when username exists', async  ()  => {
const  githubAPI  =  new  GithubAPI(token);
const  githubSDK  =  new  GithubSDK(githubAPI,  'mateuszjansowa');
const  userName  =  'mateuszjansowatest';

await githubSDK.getUserInfo(userName)
.then((data)=>expect(data.login).toBe(userName));
})
```

2. Then **writing *code implementation* that makes the test pass.**

```
// GithubSDK.js

getUserInfo(user) {
return  this.apiService.loadUserData('mateuszjansowatest');
}
```
```
// GithubAPI.js
loadUserData(username) {
const options  =  {
method:  'GET',
};
return  this._fetch(`users/${username}`, options);
}

```

3.  Finally ***refactor* of written code**
```
// app.test.js

it('Loads user data when username exists', async  ()  => {
const  githubAPI  =  new  GithubAPI(token);
const  githubSDK  =  new  GithubSDK(githubAPI,  configGH.username);
const  userName  =  configGH.outsideUser;

await githubSDK.getUserInfo(userName)
.then((data)  =>  expect(data.login).toBe(userName));
})
```
```
// GithubSDK.js

getUserInfo(user) {
return  this.apiService.loadUserData(user);
}
```

  
## 💖 Special thanks to 💖
my [Mentor](https://devmentor.pl/) for providing me the task and helping with Code Review.



## ☎️ Get in touch ☎️

My mail: mateusz.jan.sowa@gmail.com

My linkedIn: https://www.linkedin.com/in/sowamateusz/

My profile readme: https://github.com/mateuszjansowa
