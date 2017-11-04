function Room(j) {
    var self = this;
    self.j = j;
    self.animation = {
        preStart: 'hide',
        start: 'zoomIn',
        end: 'zoomOut',
        afterEnd: 'hide'
    };
    self.Data = {
        imgNum: null
    };
    return this;
}

Room.prototype.init = function (param) {
    var dfd = $.Deferred();
    var self = this;
    self.Data.imgNum = param[0];
    self.Content = $('<div></div>').addClass('room fix-all animated').addClass(self.animation.preStart).appendTo(self.j);
    self.initContent();
    return dfd.resolve();
};

Room.prototype.show = function () {
    var dfd = $.Deferred();
    var self = this;
    self.Content.removeClass(self.animation.preStart).removeClass('min-index');
    Core.animate(self.Content, self.animation.start,function(){
        dfd.resolve();
    });
    return dfd;
};

Room.prototype.hide = function () {
    var dfd = $.Deferred();
    var self = this;
    self.Content.addClass('min-index');
    return dfd.resolve();
};

Room.prototype.hide_after = function () {
    var dfd = $.Deferred();
    var self = this;
    self.Content.addClass(self.animation.preStart);
    return dfd.resolve();
};

Room.prototype.initContent = function () {
    var self = this;
    var j = self.Content;
    var $img = $('<div class="room-img img-' + self.Data.imgNum + '"></div>');
    $img.appendTo(j);
};
Modules.room = Room;