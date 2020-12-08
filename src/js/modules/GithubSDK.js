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
}
