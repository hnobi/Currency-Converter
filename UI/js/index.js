
/**
 *func  loadCurrency()
 *Returns an object from FreecurrencycoverterAPI and used it as select option in html
 */
const loadCurrency = () => {
  let to = document.getElementById("to");
  let from = document.getElementById("from");
  fetch('https://free.currencyconverterapi.com/api/v5/currencies').then((response) => {
    response.json().then((data) => {
      let options = '';
      for (currency in data.results) {
        options = options + '<option>' + currency + '</option>'
      }
      to.innerHTML = options;
      from.innerHTML = options;
      console.log(options);
      savecreatedDb();
    })
  })
}

const myFunction = () => {
  let selectedFrom = document.getElementById("from").selectedIndex;
  let fromOption = document.getElementById("from").options;
  const currencyFrom = fromOption[selectedFrom].text;

  let selectedTo = document.getElementById("to").selectedIndex;
  let toOption = document.getElementById("to").options;
  const currencyTo = toOption[selectedTo].text;
  const inputAmount = document.getElementById("amount-value").value;
  convertCurrency(inputAmount, currencyFrom, currencyTo);
}


/**
 *
 *convertCurrency function convert currency from one to another country currency
 * @param {num} amount
 * @param {string} fromCurrency
 * @param {string} toCurrency
 * return a number as success or error
 */
const convertCurrency = (amount, fromCurrency, toCurrency) => {
  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  let query = fromCurrency + '_' + toCurrency;
  let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query} &compact=ultra`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      try {
        let val, total;
        const resultMount = document.getElementById('result-display');
        val = data[query];
        if (val) {
          total = parseFloat(val) * parseFloat(amount);
        } else {
          let err = new Error(`there is value as ${query}`);
          console.log(err);
        }
        resultMount.innerHTML = `${total}`;
        console.log(total)

      } catch (error) {
        console.log(error);
      }
    })
    .catch(error => console.log(error));
}


/**************************indexdb*****************************************************/
if (window.indexedDB) {

  const savecreatedDb = () => {
    let request = indexedDB.open("CurrencyConverter", 1);

    request.onerror = (err) => {
      console.log(err);
    }

    request.onupgradeneeded = function (data) {
      var db = data.target.result; ``
      var objectStore = db.createObjectStore("CurrencyConverter", { keyPath: 'id', unique: true });
      objectStore.createIndex("query", "query")

      // for (var i = 0; i < results.length;   //     store.add(results[i]);
    }
    request.onsuccess = () => {
      let store = db.transaction(["CurrencyConverter"], "readwrite").objectStore("CurrencyConverter");
      for (const currency of currencies) {
        store.put(currency, currency.id);
      }
    }
    objectStore.transaction.oncomplete = (data) => {
      db.close();
    }
  }
  //retriving data from db
  const getDb = (i) => {
    let open = indexedDB.open("CurrencyConverter", 1);
    open.onsuccess = function () {
      // Start a new transaction
      let db = open.result;
      let tx = db.transaction("CurrencyConverter", "readwrite");
      let store = tx.objectStore("CurrencyConverter");
      let index = store.index("CurrencyIndex");

      // Querying the database
      let getCurrency = store.get(i);

      getCurrency.onsuccess = () => {
        console.log(getCurrency.result.query);
      };

      // Close the db when the transaction is done
      tx.oncomplete = () => {
        db.close();
      };
    }
  }
}








