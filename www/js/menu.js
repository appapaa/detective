function Menu(j) {
    var self = this;
    self.j = j;
    self.animation = {
        preStart: 'hide',
        start: 'bounceInDown',
        end: 'bounceOutUp',
        afterEnd: 'hide'
    };
    self.btns = [
        {id: 0, val: 0},
        {id: 1, val: 0},
        {id: 2, val: 0},
        {id: 3, val: 0},
        {id: 4, val: 0},
        {id: 5, val: 0},
        {id: 6, val: 0},
        {id: 7, val: 0}
    ];
    return this;
}

Menu.prototype.init = function () {
    var self = this;
    var dfd = $.Deferred();
    self.Content = $('<div></div>').addClass('menu fix-all animated').addClass(self.animation.preStart).appendTo(self.j);
    self.initContent();
    self.Content.on('click', '.menu-btn', function () {
        var $btn = $(this);
        var id = +$btn.attr('data-id');
        if (!$btn.hasClass('active')) {
            _.findWhere(self.btns, {id: id}).val = 1;
            $btn.addClass('active')
        }
        Core.animate($btn, 'flash animated', function () {
            self.hide();
            Core.Redirect('room/' + id);
        });
    });
    return dfd.resolve();
};

Menu.prototype.show = function () {
    var dfd = $.Deferred();
    var self = this;
    self.Content.removeClass(self.animation.preStart);
    Core.animate(self.Content, self.animation.start,function(){
        dfd.resolve();
    });
    return dfd;
};


Menu.prototype.hide = function () {
    var self = this;
    var dfd = $.Deferred();
    Core.animate(self.Content, self.animation.end, function () {
        self.Content.addClass(self.animation.afterEnd)
    });
    return dfd.resolve();
};

Menu.prototype.initContent = function () {
    var self = this;
    var html = [];
    _.each(self.btns, function (a) {
        html.push('<div data-id="' + a.id + '" class="menu-btn ' + (!!a.val ? 'active' : '') + (a.id > 3 ? 'bottom' : '') + '"></div>');
    });
    self.Content.html(html);

};
Modules.menu = Menu;