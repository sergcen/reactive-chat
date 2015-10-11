Sessions = new Mongo.Collection('sessions');

Sessions.allow({
    insert:function(){
        return true;
    }
});