/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__modal');
      modalBtns = document.querySelectorAll('.services__button');
      modalClose = document.querySelectorAll('.services__modal-close');

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal');
}      

modalBtns.forEach((mb, i) =>{
    mb.addEventListener('click', () => {
        modal(i)
    });
});

modalClose.forEach((mc) => {
    mc.addEventListener('click', () => {
        modalViews.forEach((mv) => {
            mv.classList.remove('active-modal')
        });
    });
});
/*=============== MIXITUP FILTER PORTFOLIO ===============*/
var mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active work */ 

const linkWork = document.querySelectorAll('.work__item');

function activeWork(){
    linkWork.forEach(l => l.classList.remove('active-work'));
    this.classList.add('active-work');
}

linkWork.forEach(l => l.addEventListener('click', activeWork) );
/*=============== SWIPER TESTIMONIAL ===============*/
let swiperTestimonial = new Swiper(".testimonial__container", {
    spaceBetween:24,
    loop:true,
    grabCursor:true,

    pagination: {
      el: ".swiper-pagination",
      clickable:true,
    },
    breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 48,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== LIGHT DARK THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin:'top',
    distance: '60px',
    duration:2500,
    delay:400,
    // reset:true,
});

sr.reveal('.home__data')
sr.reveal('.home__handle', {delay: 700})
sr.reveal('.home__social, .home__scroll', {delay: 900, origin: 'bottom'})

/*=============== FORM VALIDATION ===============*/
const btnSend  = document.querySelector('.contact__form button');
const form = document.querySelector('.contact__form');

// variable for fields
const inputName = document.querySelector('.inputName');
const inputMail = document.querySelector('.inputMail');
const inputProject = document.querySelector('.inputProject');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners()
function eventListeners() {
    document.addEventListener('DOMContentLoaded', startApp);
    // form fields
    inputName.addEventListener('blur', validateForm);
    inputMail.addEventListener('blur', validateForm);
    inputProject.addEventListener('blur', validateForm);

    form.addEventListener('submit', sendEmail);
}

function startApp(){
    btnSend.disabled = true;
    btnSend.classList.add('contact__button-notAllowed');
}

function validateForm(e){
   
    if(e.target.value.length > 0) {
        const error = document.querySelector('p.contact__form-mError');
        if(error){
            error.remove();
        }
    }else{
        showError('All fields are required');
    }
    if( e.target.type === 'email') {
        // we use a regular expression
        if(er.test(inputMail.value)){
            const error = document.querySelector('p.contact__form-mError');

            if(error){
                error.remove();
            }
        }else {
            showError('Invalid email')
        }
    }
    if( inputName.value != '' && er.test(inputMail.value) && inputProject.value != ''){
        console.log('hola')
        btnSend.disabled = false;
        btnSend.classList.remove('contact__button-notAllowed');
    }else{
        btnSend.disabled = true;
        btnSend.classList.add('contact__button-notAllowed');
    }
}

function showError(message){
    const messageError = document.createElement('p');
    messageError.textContent = message;
    messageError.classList.add('contact__form-mError');
    const errores = document.querySelectorAll('.contact__form-mError');
    
    if(errores.length === 0) {
        form.appendChild(messageError);
    }
    // Remove message
    setTimeout(() => {
        messageError.remove();
    }, 5000);
}

// Send the email
function sendEmail(e){
    e.preventDefault();
    // message saying that it was sent correctly
    const paragraph = document.createElement('p');
    paragraph.textContent = 'The message was sent correctly';
    paragraph.classList.add('contact__form-mSent');

    form.appendChild(paragraph);
    setTimeout(() => {
        paragraph.remove(); // remove the success message
        resetform();
    }, 3000);

}

// 
function resetform(){
    form.reset();
    startApp()
}
