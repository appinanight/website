import gsap from 'gsap';
import $ from 'jquery';

export function init() {
    $('.js-switch').each(function(index, item) {
        item = $(item);
        if (!item.data('Switch')) {
            item.data('Switch', new Switch(item));
        }
    });
}

class Switch {
    constructor(element) {
        this.element = element;
        this.trigger = this.element.find('.js-switch-trigger');
        this.trigger.on('click', this.animate.bind(this));
    }

    animate(e) {
        this.animEl = $(`[data-switch-element="${$(e.currentTarget).attr('data-switch-target')}"]`);
        $('.js-switch-trigger').removeClass('is-active');
        e.currentTarget.classList.add('is-active');
        const tl = gsap.timeline({
            defaults: {
                duration: 0.4,
                onComplete: () => {
                    $(`[data-switch-element]`).hide();
                    this.animEl.show();
                    this.animateIn(this.animEl);
                }
            },
        })
        tl.to(this.element.find('.js-switch-item-title'), {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        }, 'key-1')
        tl.to(this.element.find('.js-switch-item-content'), {
            opacity: 0,
            translateY: 20,
        }, 'key-1')
        tl.to(this.element.find('.js-switch-item-media'), {
            translateX: 200,
            opacity: 0,
            duration: 0.5,
        }, 'key-1')
    }

    animateIn(el) {
        const tl = gsap.timeline({
            defaults: {
                duration: 0.4,
            },
        })
        tl.to(el.find('.js-switch-item-title'), {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }, 'key-1')
        tl.to(el.find('.js-switch-item-content'), {
            opacity: 1,
            translateY: 0,
        }, 'key-1')
        tl.to(el.find('.js-switch-item-media'), {
            translateX: 0,
            opacity: 1,
            duration: 0.5,
        }, 'key-1')
    }
}