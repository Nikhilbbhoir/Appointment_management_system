const myModel = document.querySelectorAll('.modal')



async function signup(e){
    e.preventDefault()
    const email  = document.querySelector('#signupEmail')
    const password  = document.querySelector('#signupPassword')
    
    try{
      const roles = document.getElementById('roles').value;
      const result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      await result.user.updateProfile({
        displayName: roles
      })
      createUserCollection(result.user)
      // if(result.user.displayName == 'teacher'){
      //   window.location.replace('name.html')
      // }
      // if(result.user.displayName == 'student'){
      //   window.location.replace('student.html')
      // }
      // await result.user.sendEmailVerification()
      M.toast({html:`welcome ${result.user.email}`,classes:"green"})
    //  console.log(result)  
    }catch(err){
        console.log(err)
        window.alert(err)
        // M.toast({html: err.message,classes:"red"})
      }
    email.value = ""
    password.value = ""
    M.Modal.getInstance(myModel[0]).close()
    
}
async function login(e){
    e.preventDefault()
    const email  = document.querySelector('#loginEmail')
    const password  = document.querySelector('#loginPassword')
    
    try{
      const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      if(result.user.displayName == 'teacher'){
        window.location.replace('name.html')
      }
      if(result.user.displayName == 'student'){
        window.location.replace('student.html')
      }
      if(result.user.displayName == 'admin'){
        window.location.replace('admin.html')
      }
      // M.toast({html:`welcome ${result.user.email}`,classes:"green"})
      
    //  console.log(result)  
    //  window.location.replace("name.html");
    //  window.location.replace("student.html");
    }catch(err){
      console.log(err)
      window.alert(err)
        // M.toast({html: err.message,classes:"red"})
    }
    email.value = ""
    password.value = ""
    M.Modal.getInstance(myModel[1]).close()
}


function logout(){
    firebase.auth().signOut()
    window.location.replace("index.html");
    // document.getElementById("loginli").style.display = "none"
      // document.getElementById("signupli").style.display = "none"
    // document.querySelector('#proimg').src= "./assets/noimage.png"
}

const unsubscribe  = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // console.log(user)
      // getuserInfo(user.uid)
      document.getElementById("loginli").style.display = "none"
      document.getElementById("signupli").style.display = "none"
      // document.getElementById("logoutli").style.display = "block"
      // document.getElementById("modal2").style.display = "none"
      // document.getElementById("center").style.display = "block"
      // if(user.uid=='zynPAqm8LlabA39mYgUDyQqztm12'){
        getuserInfoRealtime(user.uid)
        const curloc = window.location.href
        // console.log(curloc)
        // teacher funtions 
        // var url = 'http://127.0.0.1:5500/public/name.html';
        // var url1 = 'http://127.0.0.1:5500/public/student.html';
        // var url2 = 'http://127.0.0.1:5500/public/main.html';
        
        var url = 'https://nikhilbbhoir.github.io/Appointment_management_system/name.html';
        var url1 = 'https://nikhilbbhoir.github.io/Appointment_management_system/student.html';
        var url2 = 'https://nikhilbbhoir.github.io/Appointment_management_system/index.html';

         var userName = firebase.auth().currentUser.displayName;
        
        if (curloc == url && userName == 'teacher') {
  // do your work
  // allUserDetails()
  getuserAptsRealtime()
  getuserAllAptsRealtime()
  getReqRealtime()
  getViewMsgRealtime()
}

if (curloc == url1 && userName == 'student') {
        // student funtions 
        allTeacherDetails()
        getStudentAllAptsRealtime()
        }
if (curloc == url2) {
        // // main function 
        findDash()  
}
      // }
     
    
    } else {
      getuserInfoRealtime(null)
      console.log('signout success')
      // document.getElementById('table').style.display = 'none'
      // document.getElementById("logoutli").style.display = "none"
      // document.getElementById("loginli").style.display = "block"
      // document.getElementById("signupli").style.display = "block"
      // M.toast({html: "signout success",classes:"green"})
    }
  });

/*
code cleanup
unsubscribe()
*/  


async function loginWithGoogle(){
    try{
      var provider = new firebase.auth.GoogleAuthProvider();
    const result =  await firebase.auth()
    .signInWithPopup(provider)  
    console.log(result)
    }catch(err){
        console.log(err)
    }
    
  
}






