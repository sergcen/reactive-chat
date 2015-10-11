setUserSession = function(id) {
    Meteor.users.update(Meteor.userId(), {$set: {'profile.session_id': id}});
};

setUserData = function(data){
    Meteor.users.update(Meteor.userId(),{$set:{'profile.data.x':data.x,'profile.data.state':data.state}});
};

getCoordsFromPage = function(x,y){
    return {
        x: x-globalOffset,
        y: y-$(document).height()
    }
};

updateData = function(key,value){
    var k = 'profile.data.'+key;
    var d = {};
    d[k] = value;
    Meteor.users.update(Meteor.userId(),{$set:d});
};
var urlReg = new RegExp("(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})");
var mesTimeout = null;
addUserText = function(text){
    //Meteor.call('sayMessage',text);
    if (urlReg.test(text)) {
        Meteor.call('addObject',{url:text});
    } else {
        Meteor.clearTimeout(mesTimeout);
        updateData('text',text);

        mesTimeout = Meteor.setTimeout(function(){
            updateData('text',null);
        },10000)
    }
}