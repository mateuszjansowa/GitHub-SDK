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

  loadInvitation(username, repoName, invitedUser) {
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        permission: 'pull',
      }),
    };
    return this._fetch(
      `repos/${username}/${repoName}/collaborators/${invitedUser}`,
      options
    );
  }

  listInvitations(username, repoName) {
    const options = {
      method: 'GET',
    };

    return this._fetch(`repos/${username}/${repoName}/invitations`, options);
  }

  removeInvitation(owner, repoName, id) {
    const options = {
      method: 'DELETE',
      body: JSON.stringify({
        permission: 'pull',
      }),
    };

    return this._fetch(`repos/${owner}/${repoName}/invitations/${id}`, options);
  }

  loadUserActivity(user) {
    const options = {
      method: 'GET',
    };

    return this._fetch(`users/${user}/events`, options);
  }

  starRepo(ownerName, repoName) {
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/vnd.github.v3.star+json',
        Authorization: `token ${this.token}`,
      },
      body: JSON.stringify({
        permission: 'pull',
      }),
    };

    return this._fetch(`user/starred/${ownerName}/${repoName}`, options);
  }

  removeStarFromRepo(ownerName, repoName) {
    const options = {
      method: 'DELETE',

      headers: {
        Accept: 'application/vnd.github.v3.star+json',
        Authorization: `token ${this.token}`,
      },
      body: JSON.stringify({
        permission: 'pull',
      }),
    };

    return this._fetch(`user/starred/${ownerName}/${repoName}`, options);
  }

  showPullRequests(ownerName, repoName) {
    const options = {
      method: 'GET',
    };

    return this._fetch(`repos/${ownerName}/${repoName}/pulls`, options);
  }

  listForks(ownerName, repoName) {
    const options = {
      method: 'GET',
    };
    return this._fetch(`repos/${ownerName}/${repoName}/forks`, options);
  }

  forkRepo(ownerName, repoName) {
    const options = {
      method: 'POST',
    };

    return this._fetch(`repos/${ownerName}/${repoName}/forks`, options);
  }
}

export default GithubAPI;
