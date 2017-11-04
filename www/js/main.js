$(document).ready(function () {
    Core = new Core();
    Core.getSize();
    Core.start();

});

var Modules = [];

var Core = function () {
    _.extend(this, {
        _target: null,
        data: {},
        Modules: []
    });
    return this;
};

Core.prototype.getSize = function () {
    $('body').css({fontSize: Math.round(Math.max($(window).height(), $(window).width()) / 70)});
};
Core.prototype.start = function () {
    var self = this;
    self.initEvent();
    self.target = window.location.hash;
};

Core.prototype.animate = function (j, cls, fCB) {
    var fAnimate = function (e) {
        if (e.target == this) {
            j.removeClass(cls);
            j.off('animationend', fAnimate);
            _.isFunction(fCB) && fCB();
        }
    };
    j.on('animationend', fAnimate).addClass(cls);
};
Core.prototype.Redirect = function (a) {
    var self = this;
    window.location.hash = a;
};
Core.prototype.Module = function (url, j, fCB) {
    var self = this;
    var params = url.split('/');
    var name = params[0];
    if (!self.Modules[url]) {
        self.Modules[url] = new Modules[name](j);
        self.Modules[url].init(params.slice(1)).then(fCB(self.Modules[url]));
    }
    else {
        fCB(self.Modules[url])
    }
};
Core.prototype.initEvent = function () {
    var self = this;
    Object.defineProperty(self, 'target', {
        get: function () {
            return this._target;
        },
        set: function (value) {
            var value = value.replace(/^#/g, '') || 'menu';
            var _value = this._target;

            if (_value != value) {
                this._target = value;
                !!self.Modules[_value] && self.Modules[_value].hide();
                Core.Module(value, $('body'), function (mod) {
                    mod.show().then(function () {
                        !!self.Modules[_value] && !!self.Modules[_value].hide_after &&
                        self.Modules[_value].hide_after();
                    });
                    self.Redirect(value);
                });
            }
        }
    })
};

//глобальноые

pprint = console.log;

$(window).on('hashchange', function () {
    Core.target = window.location.hash;

});
