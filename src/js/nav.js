import $ from 'jquery';
import gsap from 'gsap'

let tl;

export function init() {
    tl = gsap.timeline({
        defaults: {
            duration: 0.4,
        },
    })
    $('.js-nav-trigger').on('click', ()=> {
        if($('body').hasClass('nav-open')) {
            navClose()
        } else {
            navOpen();
        }
    })
}

function navOpen() {
    if (tl.reversed()) {
        tl.play();
    } else {
        tl.to('.c-header__inner-bg', {
            transform: 'scaleY(1)',
        }, 'key-1')
        tl.to('.js-nav-clip', {
            transform: 'translateY(0px)',
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
            duration: 0.7,
            delay: ((i)=> {
                return 0.15+(i*0.12)
            })
        }, 'key-1')
    }
    $('body').addClass('nav-open');
}

function navClose() {
    $('body').removeClass('nav-open');
    tl.reverse();
}
