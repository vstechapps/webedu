'use strict';

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
  user=event;
});

var interval=setInterval(runEveryHour,60*60*1000);


runEveryHour=function(){
  if(user!=undefined){
    notify("WebEdu","Hello "+user.name+" Please complete the courses")
  }
}

notify=function(title,message){
  self.registration.showNotification(title, {
  body: message
});
}

