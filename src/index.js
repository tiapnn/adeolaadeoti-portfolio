import '/sass/main.scss';

// // preloader 
// const preloaderTL = gsap.timeline();
// preloaderTL.to('#logo', {yPercent: -20, opacity: 0, delay: 4})
// preloaderTL.to('.preloader', {transform: 'scaleY(0)', transformOrigin: 'top', delay: 1})


// custom cursor
// const cursor = document.querySelector('.cursor');
// window.onmousemove = (e) => {
//     cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px; z-index: 2;`)    
// }

// navigation
const tl = gsap.timeline({paused:true, reversed: true});
tl.to('.box', {height: '100vh', duration: .5, transformOrigin: 'bottom', stagger: .3})
tl.to('.mobile-logo', {opacity: '1'})
tl.to('.nav-main__content', {opacity: '1', visibility: 'visible', yPercent: -5, duration: .5, transformOrigin: 'bottom', stagger: .3})

const navIcon = document.querySelector('.nav-icon');
navIcon.onclick = function() {
    if (tl.reversed()) {
        this.classList.add('nav-anim')
        tl.play()
        document.body.classList.add('noScroll');
    } else {
        this.classList.remove('nav-anim')
        tl.reverse()
        document.body.classList.remove('noScroll');
    }
}

const allLinks = document.querySelectorAll('.list__item a');

allLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('noScroll');
        tl.reverse()
        navIcon.classList.remove('nav-anim')
    })
})


const projs = document.querySelectorAll('#projects .project-box')
const contents = document.querySelectorAll("#projects .project-box__content")
const links = document.querySelectorAll("#projects .project-box__link")

projs.forEach( proj => {
    proj.onclick = () => viewProj(proj) 
})

function resetProjs() {
    projs.forEach(p => p.style.height = "35rem")
    contents.forEach(c => c.style.opacity = "1")
    links.forEach(l => l.classList.remove("shaky"))
}

function viewProj(proj) {
    let content = proj.querySelector("#projects .project-box__content")
    let link = proj.querySelector("#projects .project-box__link")

    if (proj.style.height == "60rem")
    {
        proj.style.height = "35rem" 
        content.style.opacity = "1"
        link.classList.remove("shaky")
    } 
    else 
    {
        resetProjs()
        proj.style.height = "60rem"
        content.style.opacity = "0"
        link.classList.add("shaky")
    }
    
}

const quote = document.querySelector('q')
const timer = 5000

function getQuotes () {
    fetch('https://gist.githubusercontent.com/tiapnn/ca5f70fc803eef6c02ded745ad624c71/raw/9b2c6f5440785d7b62ee04953d5a779c3ed8b166/programming-quotes.json')
        .then(response => response.json())
        .then(data => setInterval(() => shuffleQuotes(data.data), timer))
}
getQuotes()

function shuffleQuotes(allQuotes) {
    var randomQuote = getRandomQuote(allQuotes)
    toggleTransition()
    changeQuote(randomQuote)
}

function getRandomQuote(allQuotes) {
    return allQuotes[Math.floor(Math.random()*allQuotes.length)]
}

function changeQuote(q) {
    setTimeout(() => {
        quote.innerHTML = q.quote
        quote.cite = q.source
    }, 300);
}


function toggleTransition() {
    // trigger toggleTransition method
    quote.removeEventListener("transitionend", onTransitionEnd);
    quote.addEventListener("transitionend", onTransitionEnd);
  
    // removing the class for leave state
    quote.classList.remove("fade");
}

function onTransitionEnd() {
    // removing the listener again so that it is triggered only once
    quote.removeEventListener("transitionend", onTransitionEnd)
    quote.classList.add("fade")
}


//message to all the developers out there
const message = "Nice to see you around here! Send me a message if you want to reuse my portfolio template or you want explanations of any features! Cheers!" 
console.group("Hey developer!")
console.log(message)
console.log("%cMattia P - tiapnn@yahoo.it", 'font-size:20px');
console.groupEnd()



//scroll anchor links fixed
var switchView = function (hash = location.hash, adjust = 5) {

    try {
        var elem = document.querySelector(hash);
        var elemRect = elem.getBoundingClientRect(),
            bodyRect = document.body.getBoundingClientRect(),
            offset = elemRect.top - bodyRect.top;
            console.log(elemRect, bodyRect, offset);
        window.scroll({
            top: offset,
            behavior: 'smooth'
        })
    } catch (DOMException) {
        location.hash = "";
    } 
}

document.addEventListener('DOMContentLoaded', () => { switchView() });
window.onhashchange = () => { switchView() }

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.onclick = (e) => {

    var target = e.target;

    e.preventDefault()
    switchView(target.attributes.href.value)
    
}
})

