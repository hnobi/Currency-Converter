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