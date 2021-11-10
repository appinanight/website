import gsap from 'gsap';
import $ from 'jquery';

export function init() {
    $('.js-title').each(function(index, item) {
        item = $(item);
        if (!item.data('Title')) {
            item.data('Title', new Title(item));
        }
    });
}

class Title {
    constructor(element) {
        this.element = element;
        setInterval(()=> {
            this.animateTitles();
        }, 8000)
        this.animateTitles();
    }

    animateTitles() {
        const tl = gsap.timeline({
            defaults: {
                duration: 0.5,
            },
        })
        tl.to(this.element.find('.js-title-part-1'), {
            transform: 'translateY(0%)',
        }, 'key-1')
        tl.to('.js-mock-mobile', {
            transform: 'translateX(0%)',
            opacity: 1,
        }, 'key-1')
        tl.to(this.element.find('.js-title-part-1'), {
            transform: 'translateY(100%)',
            delay: 3,
        }, 'key-1')
        tl.to('.js-mock-mobile', {
            transform: 'translateX(20%)',
            opacity: 0,
            delay: 3,
            duration: 0.6,
        }, 'key-1')
        tl.to(this.element.find('.js-title-part-2'), {
            transform: 'translateY(0%)',
            delay: 4,
        }, 'key-1')
        tl.to('.js-mock-desktop', {
            transform: 'translateX(0%)',
            opacity: 1,
            delay: 4,
            duration: 0.6,
        }, 'key-1')
        tl.to(this.element.find('.js-title-part-2'), {
            transform: 'translateY(100%)',
            delay: 7,
        }, 'key-1')
        tl.to('.js-mock-desktop', {
            transform: 'translateX(20%)',
            opacity: 0,
            delay: 7,
        }, 'key-1')
    }
}