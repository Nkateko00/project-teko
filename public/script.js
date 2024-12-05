// -------------------toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let readMore = document.querySelector('.btn');

menuIcon.onclick = () =>{
     menuIcon.classList.toggle('bx-x'); 
     navbar.classList.toggle('active'); 

};

// -------------------close navbar when I click outside of navbar
document.addEventListener('click',(event)=>{
    
    if(!navbar.contains(event.target) && !menuIcon.contains(event.target)){
        navbar.classList.remove('active')
        menuIcon.classList.remove('bx-x')
    }
});


// -------------------scroll section active link
let sections =  document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

//-------------------- recieve contact from clients
let getNumberInput = document.getElementById('getPhoneInput')
let getNameInputs = document.getElementById('getNameInput')
let getMailInput = document.getElementById('getEmailInput')
let getContactSubject = document.getElementById('getContactReason')
let getFullMessage = document.getElementById('Message')



let clientStorage = [];

function getInput() {

   let fullNumber = getNumberInput.value;
   let fullName = getNameInputs.value;
   let fullMail = getMailInput.value;
   let fullContactSubject = getContactSubject.value;
   let fullMessage = getFullMessage.value;
   if(fullNumber === ''|| fullName === ''|| fullMail === '' || fullContactSubject ===''|| fullMessage ===''){
    alert("Please fill in all the fields")
   }
   else{
    fetch('/submit',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({fullNumber, fullName, fullMail, fullContactSubject, fullMessage})
    })
    .then(response => response.json())
    .then(data => {
    
   clientStorage.push({fullNumber, fullName, fullMail, fullContactSubject, fullMessage});
   console.log(clientStorage);
   alert('Message successfully, thanks for contacting me!');

   getNumberInput.value = '';
   getNameInputs.value = '';
   getMailInput.value = '';
   getContactSubject.value = '';
   getFullMessage.value = '';

  });
}
}
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*="' + id + '"]').classList.add('active');
            });
        }
    });
    // ---------------------sticky navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

};

  // ------------Regex to be implememented

    // let specialCase = /[^A-Za-z]/g;
    // let newName = fullName.replace(specialCase,'');
    // let nameEntered = newName.charAt(0).toUpperCase() + newName.slice(1).toLowerCase()

    // let maxNumber = /^\d{12}$/;
    // if(!maxNumber.test(fullNumber)){
    //     alert("Please eneter maximum 12 digits")
    // }