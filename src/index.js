import Application from './Application';

jQuery.fn.stickyElement = function(params) {
    return new Application(params, this);
};