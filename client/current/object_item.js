Session.set('drag',false);

Template.object_item.onRendered(function(){
    var self = this;
    Meteor.setTimeout(function(){
        if (self.data.userId == Meteor.userId() && !_.include(['text','url'],self.data.type)) {
            var w = self.$('.object_item').width();
            var h = self.$('.object_item').height();
            Objects.update(self.data._id,{$set:{width:w,height:h}});
        }

    },1000);
    Meteor.setTimeout(function(){
        if (self.data.type=="text" && Session.get('isEdit')===self.data._id) {
            self.$('input').focus();
        }
    },100)
});

Template.object_item.helpers({
    style:function(){
        var data = {
            x: this.x || 0,
            y: this.y || 0
        };
        var drag = Session.get('drag');
        if (drag && this._id == drag.id) {
            data.x = drag.initX + drag.offsetX;
            data.y = drag.initY + drag.offsetY;
        }
        var style = {
            transform: "translate("+((data.x || 0)+globalOffset)+"px,"+(data.y || 0)+"px)"
        };
        if (this.width && this.height) {
            style.width = this.width+'px';
            style.height = this.height+'px';
            style['max-height'] = style['max-width'] = "none";
        }

        var st = _.map(style,function(v,k){return k+':'+v}).join(';')
        return st;
    },
    inited:function(){
      return !!this.width;
    },
    istype:function(type){
        return type == this.type;
    },
    isDrag: function() {
        var drag = Session.get('drag');
        return (drag && this._id == drag.id);
    },
    isEdit: function(){
        return Session.get('isEdit')==this._id;
    }
});

function updateText(e) {
    Objects.update(this._id,{$set:{text: e.currentTarget.value}});
    Session.set('isEdit',false);
}


Template.object_item.events({
    'mousedown .object_item':function(e){
        Session.set('drag',{
            id:this._id,
            initX: this.x || 0,
            initY: this.y || 0,
            lastPageX: e.pageX,
            lastPageY: e.pageY,
            currentX: e.pageX,
            currentY: e.pageY,
            offsetX:0,
            offsetY:0
        });
    },
    'dblclick .object_item.text':function(e){
        e.stopPropagation();
        Session.set('isEdit',this._id);
        Meteor.setTimeout(function(){
            $('input', e.currentTarget).focus();
        });
    },
    'keydown .text input':function(e){
        e.stopPropagation();
        if (e.keyCode==13) {
            updateText.bind(this)(e);
        }
    },
    'focusout .text input':updateText,
    'click .remove':function(){
        Objects.remove(this._id);
    }
});