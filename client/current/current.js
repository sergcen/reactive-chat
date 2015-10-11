var session_id = null;
globalOffset = window.outerWidth / 2;

getGlobalOffset = function(){
    globalOffset = $(document).width() / 2;
};

Template.current.rendered = function(){
    Meteor.users.update(Meteor.userId(), {$set: {'profile.session_id': Router.current().params.id}});
    var userData = Meteor.user().profile.data;
    var session = Meteor.user().profile.session_id;
    Session.set('session_id',session);
    Meteor.subscribe('session_users',session);
    var c_user = new currentUser(userData,globalOffset);
};

Template.current.helpers({
    'currentUserData':function(){
        return Meteor.user();
    },
    'users':function(){
        return Meteor.users.find({'profile.session_id': Session.get('session_id')});
    },
    'objects':function(){
        return Objects.find({session_id: Session.get('session_id')});
    }
});

function updatePosition() {
    var s = Session.get('drag');
    if (s) {
        var obj = Objects.findOne(s.id);
        Objects.update(obj._id,{$set:{x: s.initX + s.offsetX,y: s.initY + s.offsetY}});
    }
}

var dragFN = _.throttle(function(){
    updatePosition();
},1000);

Template.current.events({
    'keydown .input-wr input':function(e){
        if (e.keyCode==13) {
            addUserText(e.currentTarget.value);
            e.currentTarget.value = '';
        }
        e.stopPropagation();
    },
    'dblclick .content':function(e){
        Meteor.call('addObject', _.extend({text:true},getCoordsFromPage(e.pageX, e.pageY)),function(e,d){
          if (!e) {
            Session.set('isEdit',d);
          }
        })
    },
    'mouseup .content':function(){
        updatePosition();
        Session.set('drag',false);
        //Objects.update(this._id,{$inc:{x:offsetX,y:offsetY}});
    },
    'mouseleave .content': function(){
        updatePosition();
        Session.set('drag',false);
        //Objects.update(this._id,{$inc:{x:offsetX,y:offsetY}});
    },
    'mousemove':function(e){
        var d = Session.get('drag');
        if (d) {
            d.currentX = e.pageX;
            d.currentY = e.pageY;
            d.offsetX = d.currentX - d.lastPageX;
            d.offsetY = d.currentY - d.lastPageY;
            //Objects._collection.update(d.id, {$inc: {x: d.offsetX, y: d.offsetY}});
            Session.set('drag', d);
            dragFN();
        }
    }
});