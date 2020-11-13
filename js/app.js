import { token } from "./env.js";
import { query } from "../graphql/queries.js";

const displayLatestRepos = (repo) => 
            `<li class="gh-main__repos__repo">
                    <div class="gh-main__repos__repo__top">
                        <div class="gh-main__repos__repo__details">
                            <h2 class="title">
                                <a href="">
                                    ${repo.node.name}
                                </a>
                            </h2>
                            <p class="desc">
                                ${repo.node.description !== null ? repo.node.description : ""}
                            </p>
                        </div>
                        <a href="" class="gh-btn gh-btn--light gh-btn--sm"><span class="icon" data-feather="star"></span>&nbsp; Star</a>
                    </div>
                    <div class="gh-main__repos__repo__details__extra">
                        <span class="detail">${repo.node.primaryLanguage?.name !== undefined ? repo.node.primaryLanguage?.name : ''}</span>
                        <span class="detail"><span data-feather="star"></span> ${repo.node.stargazerCount} </span>
                        <span class="detail"><span data-feather="git-branch"></span> ${repo.node.forkCount} </span>
                        <span class="detail"> updated at ${new Date(repo.node.updatedAt).toLocaleString('en-us',{month: 'short'})} ${new Date(repo.node.updatedAt).getDate()} </span>
                    </div>
                </li>`


const updatePageData = (data) => {
    document.querySelector(".gh-main__profile__user__name_inner").innerHTML = data.data.user.name;
    document.querySelector(".username").innerHTML = data.data.user.login;
    document.querySelector(".gh-main__profile__about").innerHTML = data.data.user.bio;
    document.querySelector("#follower-count").innerHTML = data.data.user.followers.totalCount;
    document.querySelector("#following-count").innerHTML = data.data.user.following.totalCount;
    document.querySelector("#starred-count").innerHTML = data.data.user.starredRepositories.totalCount;
    document.querySelector(".main__profile__user__img").src = data.data.user.avatarUrl;
    document.querySelector(".main__profile__user__img_sm").src = data.data.user.avatarUrl;
    document.querySelector('.pill').innerHTML = data.data.user.repositories.totalCount;
}

const loadRepositories = async () => {
    try{
        const response = await fetch(`https://api.github.com/graphql`, {
            method: 'post',
            headers: {
                "Content-Type": "application/graphql",
                "Authorization": `bearer ${token}`
            },
            body: JSON.stringify({query})
        })
        const data = await response.json();
        updatePageData(data);
        data.data.user.repositories.edges.map(repo => {
            document.querySelector(".gh-main__repos__list").innerHTML += displayLatestRepos(repo);
            feather.replace();
        })
       
    }catch(error){
        console.log(error)
    }
}

window.onload = () => {
    loadRepositories()
}

