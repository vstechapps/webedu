var user;

self.addEventListener('install', function (event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function (event) {
  console.log('Activated', event);
});

self.addEventListener('push', function (event) {

});

self.addEventListener('user', function (event) {
  user = event;
});

notify = function (title, message) {
  if (Notification.permission == 'granted')
    self.registration.showNotification(title, {
      body: message
    });
}

runEveryHour = function () {
  if (user != undefined) {
    notify("WebEdu", "Hello " + user.name + " Please complete the courses")
  }
}

var interval = setInterval(runEveryHour, 60 * 60 * 1000);




