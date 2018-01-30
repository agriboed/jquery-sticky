class Application {

    /**
     * @param params
     * @param el jQuery element
     */
    constructor(params = {}, el) {
        if (el.length === 0) {
            return;
        }

        this.el = el;
        this.initial = {
            offset: el.position(),
            position: el.css('position'),
            top: el.css('top'),
            left: el.css('left'),
            width: el.width(),
            height: el.height()
        };
        this.params = {
            top: params.top || 0,
            left: params.left || null,
            minWidth: params.minWidth || null,
            maxWidth: params.maxWidth || null,
            addClass: params.addClass || null,
            addAttributes: params.addAttributes || null,
            fade: !params.fade === false
        };
        this.offsetTop = 0;
        this.elementOffsetTop = 0;
        this.isMounted = false;

        this
            .calculateElementOffsetTop()
            .hasModal()
            .bindScroll();
    }

    /**
     * @returns {Application}
     */
    processClass() {
        if (!this.params.addClass) {
            return this;
        }

        if (true === this.isMounted) {
            this.el.addClass(this.params.addClass);
            return this;
        }

        this.el.removeClass(this.params.addClass);
        return this;
    }

    /**
     * @returns {Application}
     */
    processAttributes() {
        if (!this.params.addAttributes) {
            return this;
        }

        if (true === this.isMounted) {
            jQuery.each(this.params.addAttributes, (i, el) => {
                this.el.attr(i, el);
            });

            return this;
        }

        jQuery.each(this.params.addAttributes, (i, el) => {
            this.el.removeAttr(i);
        });

        return this;
    }

    /**
     * @returns {Application}
     */
    processCSS() {
        if (true === this.isMounted) {
            if (this.params.top) {
                this.el.css('top', this.params.top);
            }

            if (this.params.left) {
                this.el.css('left', this.params.left);
            }

            if (true === this.params.fade && jQuery.easing) {
                this.el.hide();
                this.el.fadeIn()
            }

            this.el.css('position', 'fixed');
            return this;
        }

        this.el
            .css('position', this.initial.position)
            .css('top', this.initial.top)
            .css('left', this.initial.left);

        return this;
    }

    /**
     * @returns {Application}
     */
    mountElement() {
        this.isMounted = true;

        if (this.params.minWidth &&
            jQuery(window).width() < this.params.minWidth) {
            return this;
        }

        if (this.params.maxWidth &&
            jQuery(window).width() > this.params.maxWidth) {
            return this;
        }

        return this
            .processClass()
            .processAttributes()
            .processCSS();
    }

    /**
     * @returns {Application}
     */
    unmountElement() {
        this.isMounted = false;
        return this
            .processClass()
            .processAttributes()
            .processCSS();
    }

    /**
     * @returns {Application}
     */
    hasModal() {
        let modal = this.el.find('.modal');

        modal.on('show.bs.modal', () => {
            this.unmountElement()
        });

        modal.on('hide.bs.modal', () => {
            this.checkElement()
        });

        return this;
    };

    /**
     * @returns {Application}
     */
    calculateElementOffsetTop() {
        this.elementOffsetTop = this.initial.offset.top + this.initial.height;

        return this;
    }

    /**
     * @returns {Application}
     */
    checkElement() {
        this.offsetTop = jQuery(window).scrollTop();

        if (this.offsetTop >= this.elementOffsetTop &&
            false === this.isMounted) {
            this.mountElement();
        } else if (this.offsetTop <= this.elementOffsetTop &&
            true === this.isMounted) {
            this.unmountElement();
        }

        return this;
    };

    /**
     * @returns {Application}
     */
    bindScroll() {
        jQuery(window).scroll(() => {
            this.checkElement();
        });

        return this;
    }
}

export default Application;