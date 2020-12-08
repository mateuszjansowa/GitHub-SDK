global.fetch = require('node-fetch');

import GithubSDK from '../modules/GithubSDK';
import GithubAPI from '../modules/GithubAPI';
import { configGH } from '../config.gh';
import { token } from '../modules/token';

xdescribe('User informations', () => {
  it('Loads user data when username exists', async () => {
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);
    const userName = configGH.outsideUser;

    await githubSDK
      .getUserInfo(userName)
      .then((data) => expect(data.login).toBe(userName));
  });

  it('Throws an error when username does not exist', async () => {
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    await githubSDK
      .getUserInfo(configGH.nonExistingUser)
      .catch((err) => expect(err.statusText).toBe('Not Found'));
  });

  it('Loads data about user repositories', async () => {
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);
    const userName = configGH.outsideUser;

    await githubSDK
      .getUserRepos(userName)
      .then((data) => expect(Array.isArray(data)).toBeTruthy());
  });

  it('Rejects to fetch repositories when user provided is invalid', async () => {
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.nonExistingUser);

    await githubSDK
      .getUserRepos(' ')
      .catch((err) => expect(err.statusText).toBe('Not Found'));
  });

  it('Loads repos commits if repo exists', async () => {
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.existingOutsideUser);
    const repoName = configGH.existingRepository;

    await githubSDK
      .getReposCommits(repoName)
      .then((data) => expect(Array.isArray(data)).toBeTruthy());
  });

  it('Rejects to load repos commits when repo does not exist', async () => {
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);
    const repoName = configGH.nonExistingUser;

    await githubSDK
      .getReposCommits(repoName)
      .catch((err) => expect(err.statusText).toBe('Not Found'));
  });
});
