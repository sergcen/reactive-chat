var userFields = {
    'services.facebook.id':1,
    'profile':1
}

Meteor.publish('sessions_users',function(session){
    return Meteor.users.find({'profile.session_id': session,"status.online": true},{fields:userFields});
});

Meteor.publish('sessions_list',function(){
    return Sessions.find({});
});

Meteor.publish('sessions_objects',function(session){
    return Objects.find({'session_id': session});
});