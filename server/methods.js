Meteor.methods({
    'addObject':function(d){
        var data = {
            x: d.x || Meteor.user().profile.data.x,
            y: d.y || Meteor.user().profile.data.y-100
        };
        if (d.url) {
            data.url = d.url;

            if (/\/\/w*.?youtu/.test(d.url)){
                data.type = "youtube";
                var id = d.url.split('v=')[1];
                data.id = id;
            } else {
                data.type = getUrlType(d.url);
            }
            if (!data.type) {
                return false;
            }
            if (data.type == "text") {
                data.type = "url";
            }
        }
        if (d.text) {
           data.type = "text";
        };
        if (!data.type) {return false}
        data.userId = Meteor.userId();
        data.session_id = Meteor.user().profile.session_id;
        return Objects.insert(data);
    }
});

getUrlType = function getUrlType(url){
    var d = HTTP.get(url);
    if (_.include([200,301],d.statusCode)) {
        return d.headers['content-type'].split('/')[0];
    }
}