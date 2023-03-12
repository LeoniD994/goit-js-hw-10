import './css/styles.css';
import Notiflix from 'notiflix'; 
import debounce from 'lodash.debounce'; 


const DEBOUNCE_DELAY = 300;


const refs = {
    formInput: document.querySelector('#search-box'),
    searchList: document.querySelector('.country-list'),
    cardWindow: document.querySelector('.country-info'),
};

refs.formInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(e) {
    e.preventDefault();

    const searchQuery = e.target.value.trim(); 

    if (searchQuery !== '') {

    fetchList(searchQuery)
    .then(chackList)
    .catch(onFetchError)
    } else {
    refs.cardWindow.innerHTML = "";
    refs.searchList.innerHTML = "";
    }
    
    function fetchList(countyID){

        return fetch(`https://restcountries.com/v3.1/name/${countyID}`)
        .then(response => {return response.json(); })
        .catch(onListError)


    };

   
    function chackList (countyID){
        let textList ="";
        if (countyID.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.',{width:'350px', borderRadius: '10px', position: 'center-center',clickToClose: true, useIcon: false,});

          } else if (countyID.length === 0) {
            console.log(`SOSS`)
            Notiflix.Notify.failure('Oops, there is no country with that name',{width:'350px', borderRadius: '10px', position: 'center-center',clickToClose: true, useIcon: false,});
        
            refs.cardWindow.innerHTML = "";
            refs.searchList.innerHTML = "";
         
          } else if (countyID.length >= 2 && countyID.length <= 10) {
            refs.cardWindow.innerHTML = "";
            renderCountryList(countyID);
  
            
          } else if (countyID.length === 1) {
            refs.searchList.innerHTML = "";
            renderOneCountry(countyID);
          } else {
            refs.cardWindow.innerHTML = "";
            refs.searchList.innerHTML = "";
            Notiflix.Notify.failure('Oops, there is no country with that name',{width:'350px', borderRadius: '10px', position: 'center-center',clickToClose: true, useIcon: false,});
          }

        
          function renderCountryList(ID){
            for (let i=0; i<ID.length; i += 1){
                let markup = 
                `<li class="country-box-item country-box-top "> 
                <img class="Country-flag" src="${ID[i].flags.svg}" alt="" width="70px">
                <h2 class="country-box-name">${ID[i].name.official}</h2>
                </li>`;
                textList += markup;   
            };
            refs.searchList.innerHTML = textList;
        };};

};




function renderOneCountry (countyID){
    console.log(countyID);
    let languages = Object.values(countyID[0].languages).join(", ");
    
    const markup = 
        `<ul class="country-box-list">
            <li class="country-box-item country-box-top "> 
            <img class="Country-flag" src="${countyID[0].flags.svg}" alt="" width="70px">
            <h2 class="country-box-name">${countyID[0].name.official}</h2>
            </li>
            <li class="country-box-item"> <p><span class="coutry-box-span">Capital:</span> ${countyID[0].capital}</p></li>
            <li class="country-box-item"> <p><span class="coutry-box-span">Population:</span>${countyID[0].population} </p></li>
            <li class="country-box-item"> <p><span class="coutry-box-span">Languages:</span> ${languages} </p></li>
        </ul>`;

    refs.cardWindow.innerHTML = markup;
};


//   ФУНКЦІЯ: Зловили помилку
function onFetchError (error){
    refs.cardWindow.innerHTML = "";//   CARD - чистимо
    refs.searchList.innerHTML = "";//   LIST - чистимо
    Notiflix.Notify.failure('Oops, there is no country with that name',{width:'350px', borderRadius: '10px', position: 'center-center',clickToClose: true, useIcon: false,});// Повідомлення помилка
};

function onListError (error) {
    refs.cardWindow.innerHTML = "";//   CARD - чистимо
    refs.searchList.innerHTML = "";//   LIST - чистимо
    Notiflix.Notify.failure('Oops, there is no country with that name',{width:'350px', borderRadius: '10px', position: 'center-center',clickToClose: true, useIcon: false,});
}