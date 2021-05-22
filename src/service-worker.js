var user;
var courses;

self.addEventListener('install', function (event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function (event) {
  console.log('Activated', event);
});

self.addEventListener('message', function(event){
    message = event.data;
    console.log("Service worker : Message Recieved",message);
    if(message.type=="DATA"){
      user=message.user;
      courses=message.courses;
    }
    console.log("Service worker : User Updated",user);
});


notify = function (title, message) {
  if (user!=null && user.notifications==true && Notification.permission == 'granted')
    self.registration.showNotification(title, {
      body: message,
      vibrate: [100, 50, 100],
      icon:user?user.pic:null
    });
}

runEveryHour = function () {
  notifyToCompleteCourses();
  notifyToRegisterCourses();
}

var interval = setInterval(runEveryHour, 15 * 60 * 1000);

notifyToRegisterCourses = function(){
  if(courses!=null && courses.length>0){
    var course=courses[Math.floor(Math.random()*courses.length)];
    var message="We have updated the "+course.subject+" subject with course "+course.name+". Regsiter now and complete the course";
    notify("VVSK WebEdu", message);
  }
}
notifyToCompleteCourses = function(){
  var coursesInProgress=[];
  if(user!=null && user.courses!=null && user.courses.length>0){
    coursesInProgress=user.courses.filter(course=>course.status=="INPROGRESS");
    if(coursesInProgress.length>0){
      var course=coursesInProgress[Math.floor(Math.random()*user.courses.length)];
      var message="Hello " + user.name + " Your course "+course.name+" is "+course.status+" with score "+course.score+". Complete this course";
      notify("VVSK WebEdu", message);
    }
  }
}


