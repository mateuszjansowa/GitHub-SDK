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

xdescribe('User invitation to collaborate', () => {
  it('Invites the user to the repo if both repo and user exist', async () => {
    expect.assertions(1);
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const repoName = configGH.repository;
    const invitedUser = configGH.existingOutsideUser;

    await githubSDK
      .sendInvitation(repoName, invitedUser)
      .then((response) => expect(response.invitee.login).toBe(invitedUser));
  });

  it(`Rejects when inviting user to the repo that doesn't exist`, async () => {
    expect.assertions(1);
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const repoName = configGH.nonExistingRepository;
    const invitedUser = configGH.existingOutsideUser;
    await githubSDK
      .sendInvitation(repoName, invitedUser)
      .catch((err) => expect(err.statusText).toBe('Not Found'));
  });

  it(`Rejects when inviting user to the repo and invited user doesn't exist`, async () => {
    expect.assertions(1);
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const repoName = configGH.existingRepository;
    const invitedUser = configGH.nonExistingUser;

    await githubSDK
      .sendInvitation(repoName, invitedUser)
      .catch((err) => expect(err.statusText).toBe('Not Found'));
  });

  xit('Removes an invitation to the repo', async () => {
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const repoName = configGH.repository;
    const invitedUser = configGH.outsideUser;

    await githubSDK
      .removeInvitation(repoName, invitedUser)
      .then((data) => expect(data.statusText).toBe('No Content'));
  });

  it('Show the list of all invitations to the repo', async () => {
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const repoName = configGH.repository;

    await githubSDK
      .listInvitations(repoName)
      .then((data) => expect(Array.isArray(data)).toBeTruthy);
  });
});

xdescribe('Show user or organization activity', () => {
  it('Shows user activity', async () => {
    expect.assertions(1);
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const user = configGH.outsideUser;

    await githubSDK
      .getUserActivity(user)
      .then((data) => expect(Array.isArray(data)).toBeTruthy());
  });

  it(`Rejects to show activity if user or organization doesn't exist`, async () => {
    expect.assertions(1);
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const user = configGH.nonExistingUser;

    await githubSDK
      .getUserActivity(user)
      .catch((err) => expect(err.statusText).toBe('Not Found'));
  });
});

xdescribe('Repository starring', () => {
  it('Stars a repository if it exists', async () => {
    // expect.assertions(1);
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const ownerName = configGH.existingOutsideUser;
    const repoName = configGH.existingRepository;

    await githubSDK
      .starRepo(ownerName, repoName)
      .then((resp) => expect(resp.ok).toBeTruthy());
  });

  it('Rejects to star repository if it does not exist', async () => {
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const ownerName = configGH.existingOutsideUser;
    const repoName = configGH.nonExistingRepository;

    await githubSDK
      .starRepo(ownerName, repoName)
      .catch((err) => expect(err.ok).toBeFalsy());
  });

  it('Deletes repository star if it exists', async () => {
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const ownerName = configGH.existingOutsideUser;
    const repoName = configGH.existingRepository;

    await githubSDK
      .removeStarFromRepo(ownerName, repoName)
      .then((resp) => expect(resp.ok).toBeTruthy());
  });

  it('Rejects to delete star from repository if it does not exist', async () => {
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const ownerName = configGH.existingOutsideUser;
    const repoName = configGH.nonExistingRepository;

    await githubSDK
      .removeStarFromRepo(ownerName, repoName)
      .catch((err) => expect(err.ok).toBeFalsy());
  });
});

xdescribe('Pull requests', () => {
  it('Resolves with the list of pull requests', async () => {
    expect.assertions(1);
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const ownerName = configGH.existingOutsideUser;
    const repoName = configGH.existingRepository;

    await githubSDK
      .showPullRequests(ownerName, repoName)
      .then((data) => expect(Array.isArray(data)).toBeTruthy());
  });

  it('Rejects the list of pull requests if user not exists', async () => {
    expect.assertions(1);
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const ownerName = configGH.nonExistingOutsideUser;
    const repoName = configGH.existingRepository;

    await githubSDK
      .showPullRequests(ownerName, repoName)
      .catch((err) => expect(err.statusText).toBe('Not Found'));
  });
});

xdescribe('Repository forking', () => {
  it('Shows the list of forked repositories', async () => {
    expect.assertions(1);
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const ownerName = configGH.existingOutsideUser;
    const repoName = configGH.existingRepository;

    await githubSDK
      .listForks(ownerName, repoName)
      .then((data) => expect(Array.isArray(data)).toBeTruthy());
  });

  it('Rejects to show the list of forked repositories if user not exist', async () => {
    expect.assertions(1);
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const ownerName = configGH.nonExistingOutsideUser;
    const repoName = configGH.existingRepository;

    await githubSDK
      .listForks(ownerName, repoName)
      .catch((err) => expect(err.statusText).toBe('Not Found'));
  });

  it('Forks a passed repository', async () => {
    expect.assertions(1);
    const githubAPI = new GithubAPI(token);
    const githubSDK = new GithubSDK(githubAPI, configGH.username);

    const ownerName = configGH.existingOutsideUser;
    const repoName = configGH.existingRepository;

    await githubSDK
      .forkRepo(ownerName, repoName)
      .then((resp) => expect(resp.name).toBe(repoName));
  });
});
