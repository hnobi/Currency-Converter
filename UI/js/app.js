//Registering Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(() => {
            console.log('Service Worker Registered');
        }).catch((err) => {
            console.log("Service Worker failed to Register with error: " + err);
        });
} else {
    console.log('Service Worker is not supported in this browser.');
}