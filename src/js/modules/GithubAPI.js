class GithubAPI {
  constructor(token) {
    this.apiUrl = 'https://api.github.com/';
    this.token = token;
  }

  _fetch(additionalPath, options) {
    const url = this.apiUrl + additionalPath;

    const defaultOptions = {
      credentials: 'same-origin',
      redirect: 'follow',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${this.token}`,
      },
    };

    const opt = { ...defaultOptions, ...options };

    return fetch(url, opt).then((resp) => {
      if (resp.ok) {
        if (resp.statusText !== 'No Content') {
          return resp.json();
        }
        return resp;
      }
      return Promise.reject(resp);
    });
  }

  loadUserData(username) {
    const options = {
      method: 'GET',
    };
    return this._fetch(`users/${username}`, options);
  }

  loadUserRepos(username) {
    const options = {
      method: 'GET',
    };

    return this._fetch(`users/${username}/repos`, options);
  }

  loadReposCommits(username, repoName) {
    const options = {
      method: 'GET',
    };

    return this._fetch(`repos/${username}/${repoName}/commits`, options);
  }
}

export default GithubAPI;
