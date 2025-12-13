

const temperatureField = document.querySelector(".weather1");
const cityField  = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const formField = document.querySelector("form");

let target="kedarnath";
const fetchdata = async (target)=>{
 try {
  const url = `https://api.weatherapi.com/v1/current.json?key=ec3cbcb5ec73451a80e65643251609&q=${target}`


  const response = await fetch(url);
  const data = await response.json();

 // console.log(data);

  const {
    current:{temp_c,
      condition:{text,icon},
  },
    location:{ name,localtime},
  } = data;

  updateDom(temp_c,name,localtime,icon,text);
  
 } catch (error) {
   alert("Location not found");

 }
  
};

// fxn to update dom
function updateDom (temperature,city,time,emoji,text){

  temperatureField.innerText=temperature;
  cityField.innerText=city;

  const exactTime=time.split(" ")[1];
  const exactDate=time.split(" ")[0];
 // console.log(exactTime);
 // console.log(exactDate);

 const exactDay=getFullName(new Date(exactDate).getDay());
 //console.log(getFullName(4));
  
 dateField.innerText= `${exactTime} - ${exactDay}  ${exactDate}`;
  emojiField.src=emoji;
  weatherField.innerText=text
}
fetchdata(target); 



//fxn to search location
function search(e){
  e.preventDefault();
  target=searchField.value;
  fetchdata(target);
}
formField.addEventListener("submit",search);


//fxn to get name
function getFullName(num){
  switch(num){
    case 0:
      return "sunday";

      case 1:
      return "Monday";

      case 2:
      return "tuesday";

      case 3:
      return "Wednesday";

      case 4:
      return "Thursday";

      case 5:
      return "Friday";

      case 6:
      return "Saturday";

  Default:
      return  "Dont know";


  }
}