var user;
var courses;

self.addEventListener('install', function (event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function (event) {
  console.log('Activated', event);
});

getCourseScore=function(score){
  return score!=null?score:0;
}

getCourseName=function(id){
  return courses.length>0?courses.filter(c=>c.id==id)[0].name:null;
}


notify = function (title, message) {
  if (user!=null && user.notifications==true && Notification.permission == 'granted')
    self.registration.showNotification(title, {
      body: message,
      vibrate: [100, 50, 100],
      icon:user?user.pic:null
    });
}

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
      var course=coursesInProgress[Math.floor(Math.random()*coursesInProgress.length)];
      var message="Hello " + user.name + " Your course "+getCourseName(course.course)+" is "+course.status+" with score "+getCourseScore(course.score)+". Complete this course";
      notify("VVSK WebEdu", message);
    }
  }
}

self.addEventListener('message', function(event){
    message = event.data;
    console.log("Service worker : Message Recieved",message);
    if(message.type=="DATA"){
      user=message.user;
      courses=message.courses;
      console.log("Service worker : User Updated",user);
      notifyToCompleteCourses();
      notifyToRegisterCourses();
    }
});

