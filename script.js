const result = document.getElementById("result")
const divData = document.getElementById("data");
const InputSearch = document.getElementById('search')
const submit = document.getElementById("submit");
const GITHUB_API = "https://api.github.com/users/";



submit.addEventListener("click", (e) => {

    const user = InputSearch.value;

    if (user.length == 0) {
        result.innerHTML = `<h2 class="msg"> Please Enter A User </h2>`
    }
    else if (user) {


        fetch(GITHUB_API + user)
            .then(Response => {
                if (Response.status == 404) {
                    throw Error("User not Found")
                } else {
                    return Response.json();
                }


            })
            .then(data =>{
                createUserCard(data);
                getRepos(user);
            })
          //  .then( data1=>console.log(data1))
            .catch((e) => { result.innerHTML = `<h2 class="msg"> ${e}</h2>` });


        InputSearch.value = '';

    }
})

function createUserCard(user) {

    // console.log(user);



    const cardHTML = `

        <div class="card">
            <div class="imgContainer">
                <img src="${user.avatar_url}">
            </div>
            <div class="userInfo">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul class="info">
                        <li>
                        
                        ${user.followers}<strong>Followers</strong></li>
                        <li>${user.following}<strong>Following</strong></li>
                        <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>

                <h4>Repos:</h4>

                 <div class="repos" id="reposId">
            </div>
        

            </div>
           


        </div>

`;
    result.innerHTML = cardHTML;
    return user;

}

function getRepos(repos){

    fetch(GITHUB_API+repos+"/repos")
    .then(Response => Response.json())
    .then(dataa=>addReposToCard(dataa))
    .catch(()=>{});
}


function addReposToCard(repos){

    const divID=document.getElementById("reposId");

    // console.log(repos);

    
    repos.slice(0,10).forEach(element => {

        const ele=document.createElement('a');
        ele.className="re";
        ele.href=element.html_url;
        ele.innerText=element.name;
        divID.appendChild(ele);
        //  console.log(ele);
        
    });


}
