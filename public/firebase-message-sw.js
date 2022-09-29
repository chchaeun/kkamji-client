importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging.js"
);

import { firebaseConfig } from "../utils/firebase";

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: payload,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
