import GithubSDK from './modules/GithubSDK';
import GithubAPI from './modules/GithubAPI';
import { token } from './modules/token';
import { configGH } from './config.gh';

// Please remember to import your token from GitHub and paste it into src/js/modules/token.js
import { token } from './modules/token';

import { configGH } from './config.gh';
const githubAPI = new GithubAPI(token);
const githubSDK = new GithubSDK(githubAPI, configGH.username);

// Available SDK methods (read about in Readme):

// githubSDK.getUserInfo(configGH.outsideUser);
// githubSDK.getUserRepos(configGH.username)
// githubSDK.getReposCommits(configGH.repository)

// githubSDK.sendInvitation(configGH.repository, configGH.outsideUser);
// githubSDK.removeInvitation(configGH.repository, configGH.outsideUser)
// githubSDK.listInvitations(configGH.repository)

// githubSDK.getUserActivity(configGH.outsideUser)

// githubSDK.starRepo(configGH.outsideUser, configGH.repository)
// githubSDK.removeStarFromRepo(configGH.outsideUser, configGH.repository);

// githubSDK.showPullRequests(configGH.outsideUser, configGH.repository);

// githubSDK.listForks(configGH.outsideUser, configGH.repository);
// githubSDK.forkRepo(configGH.outsideUser, configGH.repository);
