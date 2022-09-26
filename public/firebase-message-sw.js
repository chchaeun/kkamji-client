//프로젝트 버전 확인
importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging.js"
);

const config = {
  apiKey: "AIzaSyAo1brz1FwHNtm3I9AGxBIe7-uKF9B6Y-k",
  authDomain: "kkamji-e6a59.firebaseapp.com",
  projectId: "kkamji-e6a59",
  storageBucket: "kkamji-e6a59.appspot.com",
  messagingSenderId: "619302817285",
  appId: "1:619302817285:web:f7d43c92c49613c557166c",
  measurementId: "G-0P0LS8Q1B2",
};
// Initialize Firebase
firebase.initializeApp(config);

const messaging = firebase.messaging();

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: payload,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
