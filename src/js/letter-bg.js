import gsap from 'gsap'

let items;
let scrollPos;
export function init() {
    let el = document.querySelector('.js-letter-bg')
    if(!el) return

    items = [...el.children];
    window.addEventListener('scroll', scroll)
}

function scroll() {
    scrollPos = window.scrollY
    scrollPos *= -.15;
    
    gsap.to(items[0], { x: scrollPos * .75 * -1, duration: .5 })
    gsap.to(items[1], { x: scrollPos * .5, duration: .5 })

    return
}