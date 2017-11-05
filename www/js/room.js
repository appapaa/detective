function Room(j) {
    var self = this;
    self.j = j;
    self.animation = {
        preStart: 'hide',
        start: 'zoomIn',
        end: 'zoomOut',
        afterEnd: 'hide'
    };
    self.zoommer = {
        x: null,
        y: null,
        X: null,
        X0: null,
        Y0: null,
        Y: null,
        j: null,
        k: 2,
        move: function () {
            this.j.css({transform: 'translate(' + (this.X - this.X0) + 'px,' + (this.Y - this.Y0) + 'px)'});
            this.moveImg();
        },
        moveImg: function () {
            this.img.css({
                backgroundPositionX: (-this.x * this.k + this.w / 2) + 'px',
                backgroundPositionY: (-this.y * this.k + this.w / 2) + 'px'
            });
        }
    };
    self.imgInfo = {
        0: {kWH: 1.5, w: 0, h: 0} //k - соотношение сторон
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
    self.getSizeImg();
    self.initContent();
    self.getZommer();
    return dfd.resolve();
};

Room.prototype.show = function () {
    var dfd = $.Deferred();
    var self = this;
    self.Content.removeClass(self.animation.preStart).removeClass('min-index');
    Core.animate(self.Content, self.animation.start, function () {
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
    var imgI = self.imgInfo[self.Data.imgNum];
    self.RoomImg = $('<div class="room-img img-' + self.Data.imgNum + '"></div>')
        .css({
            width: imgI.w,
            height: imgI.h,
            marginTop: -imgI.h / 2,
            marginLeft: -imgI.w / 2
        })
        .appendTo(j);
//    self.RoomImg = $('<img class="room-img "/>').appendTo(j);
};
Room.prototype.getSizeImg = function () {
    var self = this;
    var winWH = Core.winInfo.kWH;
    var imgI = self.imgInfo[self.Data.imgNum];
    var imgWH = imgI.kWH;
    var w = 0;
    var h = 0;
    if (winWH < imgWH) {
        w = Core.winInfo.kFontSize - Core.winInfo.margin * 2;
        h = w / imgWH;
    }
    else {
        h = Core.winInfo.kFontSize / winWH - Core.winInfo.margin * 2;
        w = h * imgWH;
    }
    imgI.w = Math.round(w * Core.winInfo.fontSize);
    imgI.h = Math.round(h * Core.winInfo.fontSize);
};
Room.prototype.getZommer = function () {
    var self = this;
    self.RoomImg
        .on('mousedown touchstart', function (e) {
            self.zoomImg();
            _.extend(self.zoommer, Core.getPos(e, $(this)));
            self.zoommer.X0 = self.zoommer.X;
            self.zoommer.Y0 = self.zoommer.Y;
            self.zoommer.j.css({left: self.zoommer.X0 - self.zoommer.w / 2, top: self.zoommer.Y0 - self.zoommer.w / 2});
            self.zoommer.moveImg();
            Core.animate(self.zoommer.j, 'zoomIn animated');
        })
        .on('mousemove touchmove', function (e) {
            if (!self.zoommer.j) {
                return false;
            }
            _.extend(self.zoommer, Core.getPos(e, $(this)));
            self.zoommer.move();
            return false;
        })
        .on('mouseup touchend', function () {
            self.zoommer.j.remove();
            self.zoommer.j = null;
        });
};
Room.prototype.zoomImg = function () {
    var self = this;
    var w = self.RoomImg.width();
    !!self.zoommer.j && self.zoommer.j.remove();
    self.zoommer.j = $('<div class="zoommer-img"><div class="img-' + self.Data.imgNum + '"></div></div>');
    self.zoommer.img = self.zoommer.j.children().css({'background-size': self.zoommer.k * w + 'px'});
    $('body').append(self.zoommer.j);
    self.zoommer.w = self.zoommer.img.width();
    pprint(self.zoommer.w)
};
Modules.room = Room;