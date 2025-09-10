if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js') //this will return a promise so will take a time 
    .then((res) => console.log('Service Worker registered', res))
    .catch((err) => console.log("Service Worker not registered", err))
    
}