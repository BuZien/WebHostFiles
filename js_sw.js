var sender_id_data="871414985825";
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

self.addEventListener('message', function (event) {
    if (isJson(event.data)) {
        var data = JSON.parse(event.data);
        console.log("SW Received Message:");
        console.log(data);
        self.userID = data.uid;
    }
});
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
firebase.initializeApp({
    'messagingSenderId': sender_id_data
});
const messaging = firebase.messaging();


self.addEventListener('notificationclick', function (event) {
    let url = event.notification.tag;
    event.notification.close(); // Android needs explicit close.
    return clients.openWindow(url);
});

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    return self.registration.showNotification(payload.data.title,
        payload.data);
});


//
// console.log(messaging);
//
// messaging.setBackgroundMessageHandler(function (payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     var notificationTitle = 'Background Message Title 2';
//     var notificationOptions = {
//         body: 'Background Message body.',
//         icon: '/firebase-logo.png'
//     };
//     return self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });
//
