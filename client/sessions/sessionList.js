Template.sessionList.helpers({
    items: function(){
        return Sessions.find({});
    }
});

Template.sessionList.events({
    'click .addSession':function(){
        var name = prompt('enter session name');
        var id = Sessions.insert({name:name,userId: Meteor.userId()});
        setUserSession(id);
    },
    'click .sessionList li':function(){
        setUserSession(this._id);
    },
    'click .logout':function() {
        Meteor.logout();
    }
});