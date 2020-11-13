import { userName } from "../js/env.js";

export const query = `
    query { 
        user(login: "${ userName }") { 
        name
        bio
        login
        avatarUrl
        websiteUrl
        following{
            totalCount 
        }
        followers{
            totalCount
        }
        starredRepositories{
            totalCount
        }
        repositories(last:20) {
            totalCount
            edges {
                node{
                    primaryLanguage {
                        name
                    }
                    name
                    description
                    updatedAt
                    forkCount
                    stargazerCount
                }
            }
        }
    }
}

    `