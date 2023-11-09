const elemBody=document.body;
const h1Element=document.querySelector("h1")
const Modes=document.querySelector(".mode");
const darkMode=document.querySelector(".dark")
const lightMode=document.querySelector(".sun");
const divSearch=document.querySelector(".searchbar");
const searchInp=document.querySelector(".search");
const searchBtn=document.querySelector(".forSearch");
const divMain=document.querySelector(".main");
const h2Element=document.querySelector("h2");
const joinElement=document.querySelector(".join");
const pLorem=document.querySelector(".lorem");
const numCount=document.querySelector(".count");
const h3Element=document.querySelectorAll("h3");
const getNumbers=document.querySelectorAll(".num");
const samePar=document.querySelectorAll(".same");
const imgCat=document.querySelector(".cat");
const tagMail=document.querySelector(".mail");
const infLocation=document.querySelector(".fr");
const infTwitter=document.querySelector(".twit");
const infCompany=document.querySelector(".comp");
const numRepos=document.querySelector(".repos");
const numFollowers=document.querySelector(".follower");
const numFollowing=document.querySelector(".following");
const inptEmpty=document.querySelector(".result");

Modes.addEventListener("click",twoModes);

function twoModes(){
    if (darkMode.innerText === "LIGHT") {
        elemBody.style.backgroundColor="#F6F8FF";
        h1Element.style.color="#222731";
        divSearch.style.backgroundColor="#FEFEFE";
        searchInp.classList.replace("search","search2");
        divMain.style.backgroundColor="#FEFEFE";
        h2Element.style.color="#2B3442";
        joinElement.style.color="#697C9A";
        pLorem.style.color="#4B6A9B";
        numCount.style.backgroundColor="#F6F8FF";
        darkMode.innerText="DARK";
        darkMode.classList.replace("dark","light")
        lightMode.src="assets/icon-moon.svg";
        for(let i=0;i<h3Element.length;i++){
            h3Element[i].style.color="#4B6A9B";
        }
        for(let i=0;i<getNumbers.length;i++){
           getNumbers[i].style.color="#2B3442";
        }
        for(let i=0;i<samePar.length;i++){
             samePar[i].style.color="#4B6A9B";
        }
    }else{
        darkMode.innerText="LIGHT";
        elemBody.style.backgroundColor="#141D2F";
        h1Element.style.color="#FFF";
        lightMode.src="assets/icon-sun.svg";
        divSearch.style.backgroundColor="#1E2A47";
        searchInp.classList.replace("search2","search");
        divMain.style.backgroundColor="#1E2A47";
        h2Element.style.color="#FFF";
        joinElement.style.color="#697C9A";
        pLorem.style.color="#FFF";
        numCount.style.backgroundColor="#141D2F";
        darkMode.classList.replace("light","dark");
        for(let i=0;i<h3Element.length;i++){
            h3Element[i].style.color="#FFF";
        }
        for(let i=0;i<getNumbers.length;i++){
           getNumbers[i].style.color="#FFF";
        }
        for(let i=0;i<samePar.length;i++){
             samePar[i].style.color="#FFF";
        }
    };  
};

let inputValue="";
searchInp.addEventListener("input",function(e){
    inputValue=e.target.value; 
});

searchBtn.addEventListener("click",function(e){
    e.preventDefault();
    forFetch();
})

 async function forFetch(){
    let info="";
   await fetch(`https://api.github.com/users/${inputValue}`).then(function (response) {
        if (response.ok) {
            console.log(response)
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        console.log(data);
        info=data;
       
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    }); 
    if(info!==""){
        imgCat.src=info.avatar_url;
        imgCat.style.borderRadius="50%";
        h2Element.textContent=info.name;
        tagMail.textContent=info.mail;
        const joinDate = new Date(info.created_at);
        const day = joinDate.getDate();
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const month = monthNames[joinDate.getMonth()];
        const year = joinDate.getFullYear();
        const joinedDate = `joined ${day} ${month} ${year}`;
        joinElement.textContent = joinedDate;
        if(info.bio!=null){
            pLorem.textContent=info.bio;
        }else{
            pLorem.textContent="This profile has no bio";
            pLorem.style.opacity="0.75";
        }
        infLocation.textContent=info.location;
        infTwitter.textContent=info.twitter_username;
        infCompany.textContent=info.company;
        numRepos.textContent=info.public_repos;
        numFollowers.textContent=info.followers;
        numFollowing.textContent=info.following;
        inptEmpty.style.display="none";
    }else{
        inptEmpty.style.display="block";
    };
};
