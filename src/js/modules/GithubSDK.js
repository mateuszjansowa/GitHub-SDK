class GithubSDK {
  constructor(api, user) {
    this.apiService = api;
    this.username = user;
  }

  getUserInfo(user) {
    return this.apiService.loadUserData(user);
  }

  getUserRepos(user) {
    return this.apiService.loadUserRepos(user);
  }

  getReposCommits(repoName) {
    return this.apiService.loadReposCommits(this.username, repoName);
  }

  sendInvitation(repoName, invitedUser) {
    return this.apiService.loadInvitation(this.username, repoName, invitedUser);
  }

  listInvitations(repoName) {
    return this.apiService.listInvitations(this.username, repoName);
  }

  removeInvitation(repoName, userName) {
    return this.apiService
      .listInvitations(this.username, repoName)
      .then((data) => {
        let id = this._getUserId(data, userName);
        if (data.status !== 404) {
          return this.apiService.removeInvitation(this.username, repoName, id);
        }
      });
  }

  _getUserId(data, userName) {
    let id = 0;
    for (const invitation of data) {
      if (invitation['invitee']['login'] === userName) {
        id = invitation['id'];
      }
    }
    return id;
  }

  getUserActivity(user) {
    return this.apiService.loadUserActivity(user);
  }

  starRepo(ownerName, repoName) {
    return this.apiService.starRepo(ownerName, repoName);
  }

  removeStarFromRepo(ownerName, repoName) {
    return this.apiService.removeStarFromRepo(ownerName, repoName);
  }

  showPullRequests(ownerName, repoName) {
    return this.apiService.showPullRequests(ownerName, repoName);
  }
}

export default GithubSDK;
