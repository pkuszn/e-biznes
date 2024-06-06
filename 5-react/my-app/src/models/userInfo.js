export class UserInfo {
    githubId;
    name;
    token;

    constructor(githubId, name, token) {
        this.githubId = githubId;
        this.name = name;
        this.token = token;
    }
}