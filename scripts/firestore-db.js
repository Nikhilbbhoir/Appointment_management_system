const userDetails  = document.querySelector('.userDetails')
const tbodyone  = document.querySelector('.tbodyone')
const Ttbodyone  = document.querySelector('.Ttbodyone')
const apts  = document.querySelector('.apts')
const Aapts  = document.querySelector('.Aapts')
const SAapts  = document.querySelector('.SAapts')
const dateInfo  = document.querySelector('.dateInfo')
const ms  = document.querySelector('.ms')
const vmsg  = document.querySelector('.vmsg')
const editProfile  = document.querySelector('#editProfile')
// const reqList  = document.querySelector('.reqList')
const reqList = document.getElementById('reqList');
const ccreate = document.getElementById('ccreate');
const getuid = document.getElementById('getuid');
const smsgs = document.getElementById('smsgs');
const cget = document.getElementById('cget');
// const roles = document.getElementById('roles').value;

function createUserCollection(user){
   firebase.firestore().collection('users')
   .doc(user.uid)
   .set({
       uid:user.uid,
       name:user.displayName,
      //  names:user.names,
       email:user.email,
       role: user.displayName,
       phone:"",
       department:"",
       subject:"",
      //  role:"",
       rollnum:"",
   })
   findDash()
}

  function findDash(){
    var userName = firebase.auth().currentUser.displayName;
    const tec = document.getElementById("tec");
    const std = document.getElementById("std");
    if(userName == "teacher"){
      tec.style.display = 'flex';
      std.style.display = 'none';
    }
    if(userName == "student"){
      tec.style.display = 'none';
      std.style.display = 'flex';
    }
  }

async function getuserInfo(userID){
    if(userID){
      const userInfoSnap = await  firebase.firestore()
    .collection('users')
    .doc(userID)
    .get()

   const userInfo = userInfoSnap.data()
   if(userInfo){
       userDetails.innerHTML = `
       <h3>${userInfo.name}</h3>
       <h3>${userInfo.email}</h3>
       <h3>${userInfo.phone}</h3>
       `
   }    
    }else{
        userDetails.innerHTML = `
        <h3>please login</h3>
        `
    }


}



async function getuserInfoRealtime(userID){
    if(userID){
      const userdocRef = await  firebase.firestore()
        .collection('users')
        .doc(userID)
        userdocRef.onSnapshot((doc)=>{
            if(doc.exists){
                 const userInfo = doc.data()
                    if(userInfo){
                        userDetails.innerHTML = `
                        <ul class="collection">
                          <li class="collection-item"><h4>Name - ${userInfo.name}</h4></li>
                          <li class="collection-item">Email - ${userInfo.email}</li>
                          <li class="collection-item">Phone No. - ${userInfo.phone}</li>
                          <li class="collection-item">Department - ${userInfo.department}</li>
                          <li class="collection-item">Subject - ${userInfo.subject}</li>
                          <li class="collection-item">Role - ${userInfo.role}</li>
                          <li class="collection-item">ID - ${userInfo.rollnum}</li>
                        </ul>
                      
                        <button class="btn modal-trigger" href="#modal3">Edit Details</button>   
                        `
                        editProfile["name"].value = userInfo.name
                        editProfile["profileEmail"].value = userInfo.email
                        editProfile["phoneno"].value = userInfo.phone
                        editProfile["department"].value = userInfo.department
                        editProfile["subject"].value = userInfo.subject
                        editProfile["rollnum"].value = userInfo.rollnum
                        editProfile["role"].value = userInfo.role

                }    
             }
        })


    }else{
        userDetails.innerHTML = `
        <h3>please login</h3>
        `
    }
}


function updateUserProfile(e){
    e.preventDefault()
    const userDocRef =  firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)

    userDocRef.update({
        name:editProfile["name"].value,
        email:editProfile["profileEmail"].value,
        phone:editProfile["phoneno"].value,
        department:editProfile["department"].value,
        subject:editProfile["subject"].value,
        role:editProfile["role"].value,
        rollnum:editProfile["rollnum"].value

    })

    M.Modal.getInstance(myModel[2]).close()
    // window.location.reload();
}



async function allUserDetails(){
  document.getElementById('tables').style.display='tables'
  const userRef = await firebase.firestore().collection('users')
    .get()  
  userRef.docs.forEach(doc=>{
           const info =   doc.data()
           tbodyone.innerHTML += `
           <tr>
            <td>${info.name}</td>
            <td>${info.email}</td>
            <td>${info.phone}</td>
            <td>${info.department}</td>
            <td>${info.subject}</td>
            <td>${info.rollnum}</td>
            <td>${info.role}</td>
          </tr>
           `
    })
}

// Teachers DataBase 
    // create appointments 
function createAppointmentCollection(user){
  // e.preventDefault()
  // const ccreate = document.getElementById('ccreate');
  const aptid = document.getElementById("aptid").value;
  const adate = document.getElementById("adate").value;
  const tf = document.getElementById("tf").value;
  const tt = document.getElementById("tt").value;
  const status = "Get Appointment";
  var user = firebase.auth().currentUser.uid;
  var userName = firebase.auth().currentUser.displayName;
  var userEmail = firebase.auth().currentUser.email;
  // console.log("new user : " + user + " Name: " + userName + " Email " + userEmail) 
  
  firebase.firestore().collection('users')
  .doc(user)
  .collection('aptid')
  .doc(aptid)
  .set({
      id: aptid,
      // name: userName,
      // email: user.email,
      adate: adate ,
      tf: tf ,
      tt: tt,
      status: status
    })
    .then(() => {
      window.alert("Appointment Created!!" + aptid)
      $('#capt td').remove();
      window.location.reload();
      // getuserAptsRealtime()
      // getuserAllAptsRealtime()
    })
    .catch((error) =>{
      window.alert(error)
      console.log("new" + error)
    })
  
    firebase.firestore().collection('teachers')
  .doc(user + aptid)
  .set({
      id: aptid,
      uid: user,
    // email: userEmail,
    // name: user.displayName,
      email: userEmail,
      adate: adate ,
      tf: tf ,
      tt: tt,
      status: status 
    })
    // .then(() => {
    //   window.alert("Appointment Created!!" + aptid)
    //   getuserAptsRealtime()
    // })
    // .catch((error) =>{
    //   window.alert(error)
    //   console.log("new" + error)
    // })
  }
  function check(){
    console.log("Clicked")
  }
  // Uncomment this 
// ccreate.addEventListener('click',createAppointmentCollection(user));

  // Specific Appointments 
async function getuserAptsRealtime(){
  var user = firebase.auth().currentUser.uid;
  var rowNum = 0;
  $('#capt td').remove();
  // document.getElementById('capt').style.display='capt'
  const userRef = await firebase.firestore().collection('users').doc(user).collection('aptid')
  .orderBy("adate")
  .get()  
  userRef.docs.forEach(doc=>{
    const info =   doc.data()
    rowNum+=1;
    apts.innerHTML += `
                    <tr>
                      <td>${rowNum}</td>
                      <td>${info.id}</td>
                      <td>${info.adate}</td>
                      <td>${info.tf}</td>
                      <td>${info.tt}</td>
                      <td><button class="editApts" onclick="editAppointments(value)" value="${info.id}">Edit</button></td> 
                      <td><button class="editApts" onclick="deleteApt(value)" value="${info.id}">Delete</button></td> 
                      </tr>                   
                      `
                      // <td><button class="editApts" id="cEdiit" value="${info.id}">Edit</button></td> 
                    // editApt["id"].value = info.id
                    // document.getElementById("id").value = info.id
                    // editApt["adate"].value = info.adate
                    // editApt["tf"].value = info.tf
                    // editApt["tt"].value = info.tt
    })
  }
// cget.addEventListener('click',getuserAptsRealtime);

// All Appointments for Teachers
async function getuserAllAptsRealtime(){
  document.getElementById('allappointments').style.display='allappointments'
  $('#allappointments td').remove();
        const userRef = await firebase.firestore().collection('teachers')
        // .where("email","==","l@l.com")
        // .orderBy("email")
        .orderBy("adate")
          .get()  
        userRef.docs.forEach(doc=>{
                 const info =   doc.data()
                 Aapts.innerHTML += `
                 <tr>
                 <td>${info.email}</td>
                 <td>${info.id}</td>
                 <td>${info.adate}</td>
                 <td>${info.tf}</td>
                 <td>${info.tt}</td>
                 </tr>
                 `
            
                 //  <td>${rowNum}</td>
                //  <td>${info.id}</td>
          })
      }
        // getuserAllAptsRealtime()

        // edit appointments 


        // cEdit.addEventListener('click',editAppointments);
        
        async function editAppointments(value){
            ccreate.textContent = "Update";
            document.getElementById('editApt').style.display = 'block';
            document.getElementById('CSchedule').style.display = 'none';
            if(value){
              // const cid = document.getElementById("cid").value;
              // console.log("Edit button value" + value)
              var user = firebase.auth().currentUser.uid;
              // console.log(cid);
              const userdocRef = await  firebase.firestore()
              .collection('teachers')
              .doc(user + value)
              // console.log(userdocRef);
              userdocRef.onSnapshot((doc)=>{
                // const userInfo = doc.data()
                // console.log(userInfo)
                if(doc.exists){
                         const userInfo = doc.data()
                            if(userInfo){
                    console.log(userInfo.adate);
                    document.getElementById('aptid').value = userInfo.id;
                    document.getElementById("adate").value =  userInfo.adate
                    document.getElementById("tf").value =  userInfo.tf
                    document.getElementById("tt").value =  userInfo.tt
                        }    
                     }
                })
            }
        }

        // Delete Appointments 

  async function deleteApt (value){
        // console.log(value);
        var user = firebase.auth().currentUser.uid;
        // const db = firebase.firestore();
        // var exp = 444;
      
        await firebase.firestore().collection("users")
        .doc(user)
        .collection("aptid")
        .doc(value)
        .delete()
        .then(() => {
           window.alert("Appointment deleted!!");
           window.location.reload();
        });
      
        await firebase.firestore().collection("teachers")
        .doc(user + value)
        .delete()
        .then(() => {
           window.alert("User2 deleted!!");
           window.location.reload();
        });
        await firebase.firestore().collection("requests")
        .doc(user)
        .collection("reqs")
        .doc(value)
        .delete()
        .then(() => {
           window.alert("User3 deleted!!");
           window.location.reload();
        });
        // const valuesData2 = values2.data();
        // console.log(valuesData2)
        // console.log("User + value" + user + value)
        // DELETE COLLECTION AND DOCUMENT FROM 'TEACHER' APPOINTMENT LIST
      }

          // Request List 
          // All Appointments for Teachers
async function getReqRealtime(){
  // document.getElementById('allappointments').style.display='allappointments'
        $('#approvals td').remove();
        var user = firebase.auth().currentUser.uid;
        const userRef = await firebase.firestore().collection('requests')
        .doc(user)
        .collection('reqs')
        .orderBy("gid")
        // .doc(234)
        // .collection('stdreq')
        .get()  
        userRef.docs.forEach(doc=>{
                 const info =   doc.data()
                 reqList.innerHTML += `
                 <tr>
                 <td>${info.semail}</td>
                 <td>${info.gid}</td>
                 <td>${info.gadate}</td>
                 <td>${info.gtf}</td>
                 <td>${info.gtt}</td>
                 <td>${info.status}</td>                
                 <td>
                 <button id="${info.semail}${info.gid}" onclick="getReq(value)" value="${info.gid}" >Confirm Operation</button>
                 </td> 
                
                 </tr>
                 `
           $("td:contains('Approved')").css('backgroundColor', 'green');
                 $("td:contains('Rejected')").css('backgroundColor', 'red');
                 $("td:contains('Pending')").css('backgroundColor', 'yellow');
                 // $("td:contains('undefined')").text('N.A.');
           
                //  <button class="editApts" onclick="getReq(value)" value="${info.gid}">Reject</button>
                })
      }


                // Get Request data 
                
     async function getReq(value){
        
      if(value){
        // const cid = document.getElementById("cid").value;
        // console.log("Edit -" + value)
        
        // const Stylevalues ="btns" + value;
        // console.log(Stylevalues)
        
        var user = firebase.auth().currentUser.uid;
        // var email = firebase.auth().currentUser.email;
        const email = document.getElementById("email").value;
        if(email == ""){
          console.log("Enter Student's Email For Confirmation")
          window.alert("Enter Student's Email For Confirmation")
        }

        if(email){
          
          function finduserid(){
            // const temail = document.getElementById("temail").value;
            // const usersID = 123;
            async function allUsersDetailss(){
              const email = document.getElementById("email").value;
              const userRef = await firebase.firestore().collection('users')
              .get()  
              userRef.docs.forEach(doc=>{
                const info =   doc.data()
                // console.log(info.role) 
                       if(email == info.email && info.role == 'student'){
                      //  if(info.displayName == 'teacher'){
                        const usersID = info.uid;
                        console.log(usersID);
                        document.getElementById("suid").value = usersID;
                      //  }
                        
                       }
                      })
                    }
            allUsersDetailss();
          }
        // Uncomment
          finduserid();

          // document.getElementById([Stylevalues]).style.backgroundColor = 'lightgreen';
          // document.getElementById([Stylevalues]).textContent = 'Confirmed';
            // console.log(cid);
            // const Stylevalues =123;
        const userdocRef = await  firebase.firestore()
        .collection('requests')
        .doc(user)
        .collection('reqs')
        .doc(email + value)
        // console.log(userdocRef);
        userdocRef.onSnapshot((doc)=>{
          const userInfo = doc.data()
          // console.log(userInfo)
          if(doc.exists){
                   const userInfo = doc.data()
                   const Stylevalues = userInfo.semail + value;
                   document.getElementById([Stylevalues]).textContent = 'Confirmed';
                   document.getElementById([Stylevalues]).style.backgroundColor = 'lightgreen';
                  //  console.log("USerInfo - " + userInfo.gtt)
                      if(userInfo){
              // console.log("Get Reuest " + userInfo.gadate);
              document.getElementById('remail').value = userInfo.gemail;
              document.getElementById('rid').value = userInfo.gid;
              document.getElementById('ruid').value = userInfo.guid;
              document.getElementById("radate").value =  userInfo.gadate;
              document.getElementById("rtf").value =  userInfo.gtf;
              document.getElementById("rtt").value =  userInfo.gtt;
              document.getElementById("email").value =  userInfo.semail;
                  }    
               }
          })
        }
       
      }
      

    }
                // approve function 
        function rApprove(){
          // console.log(value)
          const getSrid = document.getElementById('rid').value;
          const getSApts = "btn" + getSrid;
          // document.getElementById(getSApts).style.color = 'blue'
          // document.getElementById(getSApts).innerHTML = "Pending"
          
          const remail = document.getElementById("remail").value;
          const rid = document.getElementById("rid").value;
          const ruid = document.getElementById("ruid").value;
          const radate = document.getElementById("radate").value;
          const rtf = document.getElementById("rtf").value;
          const rtt = document.getElementById("rtt").value;
          const rstatus = "Get Appointment";
          const rstatus2 = "Approved";
          // const uid = "";
          const email = document.getElementById("email").value;
          const suid = document.getElementById("suid").value;
          
          function finduserid(){
            // const temail = document.getElementById("temail").value;
            // const usersID = 123;
            async function allUsersDetailss(){
              const email = document.getElementById("email").value;
              const userRef = await firebase.firestore().collection('users')
              .get()  
              userRef.docs.forEach(doc=>{
                const info =   doc.data()
                // console.log(info.role) 
                       if(email == info.email && info.role == 'student'){
                      //  if(info.displayName == 'teacher'){
                        const usersID = info.uid;
                        // console.log(usersID);
                        document.getElementById("suid").value = usersID;
                      //  }
                        
                       }
                      })
                    }
            allUsersDetailss();
            // sendMsg();
          }
        
          // finduserid();

          firebase.firestore().collection('requests')
          .doc(ruid)
          .collection('reqs')
          .doc(email + getSrid)
          .update({
            // gemail: remail ,
            // gid: rid ,
            // guid: ruid,
            // gadate: radate,
            // gtf: rtf,
            // gtt: rtt,
            status: rstatus2
            // semail: email  
            })
            .then(() => {
              window.alert("Request Approved" )
            })
            .catch((error) =>{
              window.alert(error)
              console.log("new" + error)
            })
    
            firebase.firestore().collection('teachers')
            .doc( ruid + rid)
            .update({
              [suid]: rstatus2
              }).then(() => {
                window.location.reload();
              })
              .catch((error) =>{
                window.alert(error)
                console.log("new" + error)
              })
    
        }
                // Reject function 
        function rReject(){
          // console.log(value)
          const getSrid = document.getElementById('rid').value;
          const getSApts = "btn" + getSrid;
          // document.getElementById(getSApts).style.color = 'blue'
          // document.getElementById(getSApts).innerHTML = "Pending"
          
          const remail = document.getElementById("remail").value;
          const rid = document.getElementById("rid").value;
          const ruid = document.getElementById("ruid").value;
          const radate = document.getElementById("radate").value;
          const rtf = document.getElementById("rtf").value;
          const rtt = document.getElementById("rtt").value;
          const rstatus = "Get Appointment";
          const rstatus2 = "Rejected";
          const email = document.getElementById("email").value;
          const suid = document.getElementById("suid").value;
    
          firebase.firestore().collection('requests')
          .doc(ruid)
          .collection('reqs')
          .doc(email + getSrid)
          .update({
            // gemail: remail ,
            // gid: rid ,
            // guid: ruid,
            // gadate: radate,
            // gtf: rtf,
            // gtt: rtt,
            status: rstatus2,
            // semail: email  
            })
            .then(() => {
              window.alert("Request Rejected" )
              // $('#capt td').remove();
              // getuserAptsRealtime()
              // getuserAllAptsRealtime()
              // window.location.reload();
            })
            .catch((error) =>{
              window.alert(error)
              console.log("new" + error)
            })
    
            firebase.firestore().collection('teachers')
            .doc( ruid + rid)
            .update({
              [suid]: rstatus2
              }).then(() => {
                // window.alert("Request Sent to " + gemail)
                // $('#capt td').remove();
                // getuserAptsRealtime()
                // getuserAllAptsRealtime()
                window.location.reload();
              })
              .catch((error) =>{
                window.alert(error)
                console.log("new" + error)
              })
    
        }

        // View Messages 
        async function getViewMsgRealtime(){
          var user = firebase.auth().currentUser.uid;
          // var rowNum = 0;
          $('#msg td').remove();
          // document.getElementById('msg').style.display='msg'
          const userRef = await firebase.firestore().collection('users').doc(user).collection('messages')
          .get()  
          userRef.docs.forEach(doc=>{
            const info =   doc.data()
            // console.log(info.sname);
            // console.log(info.sid);
            // console.log(info.smgs);
            // rowNum+=1;
            vmsg.innerHTML += `
                            <tr>
                              <td>${info.sname}</td>
                              <td>${info.semail}</td>
                              <td>${info.smsg}</td>
                              </tr>                   
                              `
                              // <td>${info.sid}</td>
            })
          }



        // ---------
        // Student Database 
        // ---------


      // Teacher List 
      async function allTeacherDetails(){
        document.getElementById('Ttable').style.display='Ttable'
        const userRef = await firebase.firestore().collection('users')
          .get()  
        userRef.docs.forEach(doc=>{
                  const info =   doc.data()
                  const check = info.role;
                  if(check == "teacher"){
                  Ttbodyone.innerHTML += `
                  <tr>
                  <td>${info.name}</td>
                  <td>${info.email}</td>
                  <td>${info.phone}</td>
                  <td>${info.department}</td>
                  <td>${info.subject}</td>
                  <td>${info.rollnum}</td>
                  </tr>
                  `
                  // <td>${info.role}</td>
                }
          })
      }
  
// All Appointments for Student
async function getStudentAllAptsRealtime(){
  document.getElementById('allSappointments').style.display='allSappointments'
  $('#allSappointments td').remove();
        const userRef = await firebase.firestore().collection('teachers')
        .orderBy("adate")
          .get()  
        userRef.docs.forEach(doc=>{
                 const info =   doc.data()
                 const newid = "btn" + info.id;
                //  const st = "s@student.com"                 
                 const st = firebase.auth().currentUser.uid;
                 SAapts.innerHTML += `
                 <tr>
                 <td>${info.email}</td>
                 <td>${info.id}</td>
                 <td>${info.adate}</td>
                 <td>${info.tf}</td>
                 <td>${info.tt}</td>
                 <td><button type="submit" id="${newid}" value="${info.uid}${info.id}" onclick="getAppointment(value)">Confirm</button></td>
                 <td><button type="submit" onclick="aptpending()">Get Appointment</button></td>
                 <td>${info[st]}</td>
                 </tr>
                 `
            $("td:contains('Approved')").css('backgroundColor', 'green');
                 $("td:contains('Rejected')").css('backgroundColor', 'red');
                 $("td:contains('Pending')").css('backgroundColor', 'yellow');
                 $("td:contains('undefined')").text('N.A.');
          })
      }

      // Send Message 

      function sendMsg(user){
        // e.preventDefault()
        // const ccreate = document.getElementById('ccreate');
        const sname = document.getElementById("sname").value;
        const semail = document.getElementById("semail").value;
        const temail = document.getElementById("temail").value;
        const smsg = document.getElementById("smsg").value;
        const suid = document.getElementById("suid").value;
        var user = firebase.auth().currentUser.uid;
        var userName = firebase.auth().currentUser.displayName;
        var userEmail = firebase.auth().currentUser.email;
        console.log("new user : " + user + " Name: " + userName + " Email " + userEmail) 
        
        firebase.firestore().collection('users')
        .doc(suid)
        .collection('messages')
        .doc(semail)
        .set({
            sname: sname,
            // sid: sid ,
            temail: temail ,
            smsg: smsg,
            suid: suid,
            semail: semail 
          })
          .then(() => {
            window.alert("Message Sent!! " + sname)
            $('#capt td').remove();
            window.location.reload();
            // getuserAptsRealtime()
            // getuserAllAptsRealtime()
          })
          .catch((error) =>{
            window.alert(error)
            console.log("new" + error)
          })
        
        }
      
      smsgs.addEventListener('click',sendMsg);
     
      function finduserid(){
        const temail = document.getElementById("temail").value;
        // const usersID = 123;
        async function allUsersDetailss(){
          const userRef = await firebase.firestore().collection('users')
          .get()  
          userRef.docs.forEach(doc=>{
            const info =   doc.data()
            // console.log(info.role) 
                   if(temail == info.email && info.role == 'teacher'){
                  //  if(info.displayName == 'teacher'){
                    var usersID = info.uid;
                    // console.log(usersID);
                    document.getElementById("suid").value = usersID;
                  //  }
                    
                   }
                  })
                }
        allUsersDetailss();
        // sendMsg();
      }
      // getuid.addEventListener('click',finduserid);

      // Get an Appointment

     async function getAppointment(value){
        
        if(value){
          const elm = "btn" + value;
          console.log(elm);
          // const cid = document.getElementById("cid").value;
          console.log("Edit -" + value)
          var user = firebase.auth().currentUser.uid;
          // console.log(cid);
          const userdocRef = await  firebase.firestore()
          .collection('teachers')
          .doc(value)
          console.log(userdocRef);
          userdocRef.onSnapshot((doc)=>{
            const userInfo = doc.data()
            console.log(userInfo)
            if(doc.exists){
                     const userInfo = doc.data()
                     const elm = "btn" + userInfo.id;
                     document.getElementById([elm]).style.backgroundColor = 'lightgreen';
                     document.getElementById([elm]).textContent = 'Confirmed'

                     console.log("USerInfo - " + userInfo.tt)
                        if(userInfo){
                console.log("Get appointment " + userInfo.adate);
                document.getElementById('gemail').value = userInfo.email;
                document.getElementById('gid').value = userInfo.id;
                document.getElementById('guid').value = userInfo.uid;
                document.getElementById("gadate").value =  userInfo.adate
                document.getElementById("gtf").value =  userInfo.tf
                document.getElementById("gtt").value =  userInfo.tt
                    }    
                 }
            })
        }

        // aptpending()
      }

     function aptpending(){
      //  change id value by fetching value from database 
      const getSgid = document.getElementById('gid').value;
      const getSApts = "btn" + getSgid;
      // document.getElementById(getSApts).style.color = 'blue'
      // document.getElementById(getSApts).innerHTML = "Pending"


      
      const gemail = document.getElementById("gemail").value;
      const gid = document.getElementById("gid").value;
      const guid = document.getElementById("guid").value;
      const gadate = document.getElementById("gadate").value;
      const gtf = document.getElementById("gtf").value;
      const gtt = document.getElementById("gtt").value;
      const gstatus = "Pending";
      const gstatus2 = "Get Appointment";
      const email = firebase.auth().currentUser.email;
      const uid = firebase.auth().currentUser.uid;
      const Rstatus = "Pending";

      firebase.firestore().collection('requests')
      .doc(guid)
      .collection('reqs')
      // .doc(getSgid)
      // .collection('stdreqs')
      .doc(email + getSgid)
      .set({
        gemail: gemail ,
        gid: gid ,
        guid: guid,
        gadate: gadate,
        gtf: gtf,
        gtt: gtt,
        status: gstatus,
        semail: email  
      })
      .then(() => {
          window.alert("Request Sent to " + gemail)
          $('#capt td').remove();
          // window.location.reload();
          // getuserAptsRealtime()
          // getuserAllAptsRealtime()
          // window.location.reload();
        })
        .catch((error) =>{
          window.alert(error)
          console.log("new" + error)
        })

        firebase.firestore().collection('teachers')
        .doc( guid + gid)
        .update({
          // email: gemail ,
          // id: gid ,
          // uid: guid,
          // adate: gadate,
          // tf: gtf,
          // tt: gtt, 
          // status: gstatus2,
          [uid]: Rstatus
          // status: gstatus
          }).then(() => {
            // window.alert("Request Sent to " + gemail)
            // $('#capt td').remove();
            // getuserAptsRealtime()
            // getuserAllAptsRealtime()
            window.location.reload();
          })
          .catch((error) =>{
            window.alert(error)
            console.log("new" + error)
          })
     }

      // get status from Request collection 


     async function getRequest(value){
        
      if(value){
        // const cid = document.getElementById("cid").value;
        console.log("Edit -" + value)
        var user = firebase.auth().currentUser.uid;
        var userEmail = firebase.auth().currentUser.email;
        // console.log(cid);
        const userdocRef = await  firebase.firestore()
        .collection('requests')
        .doc(user)
        .collection('reqs')
        .doc(userEmail + 123)
        console.log(userdocRef);
        userdocRef.onSnapshot((doc)=>{
          const userInfo = doc.data()
          console.log(userInfo)
          if(doc.exists){
                   const userInfo = doc.data()
                   console.log("USerInfo - " + userInfo.tt)
                      if(userInfo){
              console.log("Get appointment " + userInfo.adate);
              document.getElementById("gtt").value =  userInfo.status
                          btn123.textcontent = 'approved'
                  }    
               }
          })
      }

    }



    //Teacher Dashboard buttons script 
    
    const disp = document.getElementById('profile');
    // const disp = document.getElementById('profile');
    const disp2 = document.getElementById('editApt');
    // const disp2 = document.getElementById('editApt');
    const disp3 = document.getElementById('CSchedule');
    const disp4 = document.getElementById('reqsList');
    const disp5 = document.getElementById('Messages');
    const disp6 = document.getElementById('allAPTs');
    
    
    // 1
    function myProfileShow(){
      const disp = document.getElementById('profile');

      document.getElementById('profile').style.display = 'block';
      document.getElementById('editApt').style.display = 'none';
      document.getElementById('CSchedule').style.display = 'none';
      document.getElementById('reqsList').style.display = 'none';
      document.getElementById('Messages').style.display = 'none';
      document.getElementById('allAPTs').style.display = 'none';
    }
    function myProfileHide(){
      const disp = document.getElementById('profile');
      disp.style.display = 'none';
    }
              // 2
   function scheduleAPTShow(){
    const disp2 = document.getElementById('editApt');
      // disp2.style.display = 'block';
      
      document.getElementById('profile').style.display = 'none';
      document.getElementById('editApt').style.display = 'block';
      document.getElementById('CSchedule').style.display = 'none';
      document.getElementById('reqsList').style.display = 'none';
      document.getElementById('Messages').style.display = 'none';
      document.getElementById('allAPTs').style.display = 'none';
    }
    function scheduleAPTHide(){
      const disp2 = document.getElementById('editApt');
      disp2.style.display = 'none';
    }
              // 3
    function createAPTShow(){
      const disp3 = document.getElementById('CSchedule');
      //  disp3.style.display = 'block';

       document.getElementById('profile').style.display = 'none';
       document.getElementById('editApt').style.display = 'none';
       document.getElementById('CSchedule').style.display = 'block';
       document.getElementById('reqsList').style.display = 'none';
       document.getElementById('Messages').style.display = 'none';
       document.getElementById('allAPTs').style.display = 'none';
     }
              // 4
    function reqstShow(){
      const disp4 = document.getElementById('reqsList');
      //  disp4.style.display = 'block';

       document.getElementById('profile').style.display = 'none';
       document.getElementById('editApt').style.display = 'none';
       document.getElementById('CSchedule').style.display = 'none';
       document.getElementById('reqsList').style.display = 'block';
       document.getElementById('Messages').style.display = 'none';
       document.getElementById('allAPTs').style.display = 'none';
     }
              // 5
    function viewMSGShow(){
       const disp5 = document.getElementById('Messages');
      //  disp5.style.display = 'block';

       document.getElementById('profile').style.display = 'none';
       document.getElementById('editApt').style.display = 'none';
       document.getElementById('CSchedule').style.display = 'none';
       document.getElementById('reqsList').style.display = 'none';
       document.getElementById('Messages').style.display = 'block';
       document.getElementById('allAPTs').style.display = 'none';
     }
              // 6
    function allAPTShow(){
       const disp6 = document.getElementById('allAPTs');
      //  disp6.style.display = 'block';

       document.getElementById('profile').style.display = 'none';
       document.getElementById('editApt').style.display = 'none';
       document.getElementById('CSchedule').style.display = 'none';
       document.getElementById('reqsList').style.display = 'none';
       document.getElementById('Messages').style.display = 'none';
       document.getElementById('allAPTs').style.display = 'block';
      }
      
      
      
      
      //Student Dashboard buttons script 
      
      // document.getElementById('center').style.display = 'none';
      // document.getElementById('TSearch').style.display = 'none';
      // document.getElementById('Sappointments').style.display = 'block';
      // document.getElementById('msg').style.display = 'none';

     function myCenterShow(){
      document.getElementById('center').style.display = 'block';
      document.getElementById('TSearch').style.display = 'none';
      document.getElementById('Sappointments').style.display = 'none';
      document.getElementById('msg').style.display = 'none';
     }
     function tSearchShow(){
      document.getElementById('center').style.display = 'none';
      document.getElementById('TSearch').style.display = 'block';
      document.getElementById('Sappointments').style.display = 'none';
      document.getElementById('msg').style.display = 'none';
     }
     function getAPTShow(){
      document.getElementById('center').style.display = 'none';
      document.getElementById('TSearch').style.display = 'none';
      document.getElementById('Sappointments').style.display = 'block';
      document.getElementById('msg').style.display = 'none';
     }
     function sendShow(){
      const names = firebase.auth().currentUser.email;
      // console.log(names)
      document.getElementById('semail').value = names;

      document.getElementById('center').style.display = 'none';
      document.getElementById('TSearch').style.display = 'none';
      document.getElementById('Sappointments').style.display = 'none';
      document.getElementById('msg').style.display = 'flex';
     }



    //  main script 
    document.getElementById('modal2').style.display = 'none';
    function loginShow(){
     document.getElementById('modal1').style.display = 'none';
      document.getElementById('modal2').style.display = 'block';
   }
   
    function signupShow(){
      document.getElementById('modal1').style.display = 'block';
      document.getElementById('modal2').style.display = 'none';
    }


    // function LoginHide(event){
    //   if(event){
    //     document.getElementById('modal2').style.display = 'none';

    //   }
    // }
