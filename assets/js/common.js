//https://api.coingecko.com/api/v3/search/trending
// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr

function convertToJSON(response){
    return response.json();
}

function windowloaded(){
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr')
    .then(convertToJSON)
    .then(loadCoinData);
    // alert("Window Is Loaded");
}

function loadCoinData(data){
    const ConversionRate = data.bitcoin.inr;
    fetch('https://api.coingecko.com/api/v3/search/trending')
    .then(convertToJSON)
    .then(function(data){
        render(data, ConversionRate);
    })
    // console.log(ConversionRate);
}

function render(coinData, ConversionRate){
    // console.log(coinData);
    // console.log(coinData, ConversionRate);
    for(let i=0; i<coinData.coins.length;i++){
        // console.log("ABC");
        const singlecoin = coinData.coins[i].item;
        // console.log(singlecoin);

        const logo = singlecoin.thumb;
        const name = `${singlecoin.name}(${singlecoin.symbol})`;
        const price = Math.round(singlecoin.price_btc * ConversionRate*10000)/10000;
        insertCryptoCard(logo,name,price);
        // console.log(logo,name,price);
    }
}

function insertCryptoCard(thumb,name,price){
    const price_para=document.createElement('h4');
    price_para.innerText = `${price}`;
   
    const name_head= document.createElement('p');
    name_head.innerText=name;


    const right_container=document.createElement('div');
    right_container.classList.add("card-name");
    right_container.appendChild(name_head);
    right_container.appendChild(price_para);

    const image_elem = document.createElement('img');
    image_elem.src= thumb;
    image_elem.classList.add("card-img");
    image_elem.alt= "Coin Image";

    const card_container=document.createElement('div'); 
    card_container.classList.add("card"); 
    card_container.appendChild(image_elem);
    card_container.appendChild(right_container);

    document.getElementById('coins_container').appendChild(card_container);

}

{/*         <div class="card">
                <img src="/assets/images/bitcoin.jpg" alt="COIN" class="card-img">
                <h2 class="card-name">Bitcoin</h2>
                <p class="card-price">$150,000</p>
            </div> */}

window.onload=function(){
    windowloaded();
}