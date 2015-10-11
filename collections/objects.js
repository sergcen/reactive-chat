Objects = new Mongo.Collection('objects');

Objects.allow({
    'update':function(){
        return true;
    },
    'remove':function(){
        return true;
    }
});