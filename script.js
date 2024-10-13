const name="me";
const randomData=(name)=>{
  fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`)
.then(res=>res.json())
.then(data=>{
    objDisplay(data.player);
   
})
.catch(err => console.err(err));
};

const objDisplay=(objData)=>{
  for (const element of objData) {
    const playerContainer =document.getElementById("playerContainer");
    const div=document.createElement("div");
    div.className="col-3 m-2 shadow text-center "
    div.innerHTML=`
        <div class="card" style="width: 15rem;">
        <img src="${element.strThumb}" class=" w-50 rounded-circle mx-auto" alt="Picture Not Found">
        <div class="card-body">
        <h5 class="card-title">${element.strPlayer}</h5>
        <p>Gender : ${element.strGender}</p>
        <p>Sport : ${element.strSport}</p>
        <p>Team : ${element.strTeam}</p>
        <div class="fw-bold fs-3 me-2">
          <a href="${element.strFacebook}"><i class="fa-brands fa-facebook"></i></a>
          <a href="${element.strTwitter}"><i class="fa-brands fa-twitter"></i></a>
    
        </div>
         <a href="#" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="uniquePlayerData('${element.idPlayer}') ">Details</a>
         <a href="#"  class="btn btn-outline-info" onclick="addToCart('${element.strPlayer}','${element.strGender}')">Add To Cart</a>
  </div>
</div>
    
    `;
    playerContainer.appendChild(div);
    
  }
};

const removeAllChild=(idName)=>{
  const parent=document.getElementById(idName);
  parent.innerHTML='';
}

const searchByName=()=>{
  removeAllChild("playerContainer");
  const searchValue=document.getElementById("textValue").value;
  randomData(searchValue);
  };
  let total=0;
  let male=0;
  let female=0;
const addToCart=(playerName,Gender)=>{
  if(total<=10){
    total=total+1;
    document.getElementById("totalPlayer").innerText=total;
  }
  else{
    alert("Over then 11");
  }
  if(Gender=='Male'){
    male=male+1;
    document.getElementById("malePlayer").innerText=male;
  }
  else{
    female=female+1;
    document.getElementById("femalePlayer").innerText=female;
  }
  
  const cartContainer=document.getElementById("cart-container");
  const div=document.createElement("div");
  div.innerHTML=`
  <p>${playerName}</p>
  `;
 cartContainer.appendChild(div);

};

const uniquePlayerData=(id)=>{
  fetch(`https://www.thesportsdb.com//api/v1/json/3/lookupplayer.php?id=${id}`)
  .then(res=>res.json())
  .then(data=>{
    playerDetails(data.players[0]);
    
     
  })
  .catch(err => console.err(err));
  };

const playerDetails=(unique)=>{
   const modalContainer= document.getElementById("modalBody");
    const div=document.createElement("div");
    div.innerHTML=`
        <img src="${unique.strThumb}" class=" w-50 rounded mx-auto" alt="Picture Not Found">
        <h5 class="card-title">${unique.strPlayer}</h5>
        <p>Gender : ${unique.strGender}</p>
        <p>Sport : ${unique.strSport}</p>
        <p>Team : ${unique.strTeam}</p>
        <p>Birthday Place : ${unique.strBirthLocation}</p>
        <p>Nationality : ${unique.strNationality}</p>
    
    `;
  modalContainer.appendChild(div);
  console.log(typeof(unique));
 
};
const removeModal=()=>{
    removeAllChild("modalBody");
};








randomData(name);



