let amount = document.getElementById("amount").value;
let fromCurrency = document.getElementById("from").value;
let to = document.getElementById("to");

const loadCurrency = () => {
    fetch('https://free.currencyconverterapi.com/api/v5/currencies').then((response) => {
        response.json().then((data) => {
            let options = '';
            for (key in data.results) {
                options = options + '<option>' + key + '</option>'
            }
            to.innerHTML = options;
            console.log(options);
        })
    })
}
















/**
 *
 *convertCurrency function convert currency from one to another country currency
 * @param {num} amount
 * @param {string} fromCurrency
 * @param {string} toCurrency
 * return a number as success or error
 */

let convertCurrency = (amount, fromCurrency, toCurrency) => {
    let query = fromCurrency + '_' + toCurrency;
    let url = 'https://www.currencyconverterapi.com/api/v5/convert?q='
        + query + '&compact=ultra';

    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
        })

}










