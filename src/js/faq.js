import $ from 'jquery';

export function init() {
    $('.js-faq').each(function(index, item) {
        item = $(item);
        if (!item.data('Faq')) {
            item.data('Faq', new Faq(item));
        }
    });
}

class Faq {
    constructor(element) {
        this.element = element;
        this.trigger = this.element.find('.js-faq-trigger')
        this.content = this.element.find('.js-faq-content')
        this.trigger.on('click', this.toggleFaq.bind(this));
    }

    toggleFaq() {
        this.content.stop().slideToggle();
        this.trigger.toggleClass('is-active');
    }

}