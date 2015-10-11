Users = Meteor.users;



Users.allow({
    update:function(){
        return true;
    }
});
