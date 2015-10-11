Router.onBeforeAction(function() {
    if (!Meteor.userId()) {
        this.render('login');
    } else {
        this.next();
    }
});

//Router.route('/sessions/:id', function () {
//    var user = Meteor.user();
//    if (user && user.profile && user.profile.session_id) {
//        this.render('current');
//    } else {
//        this.render('sessionList');
//    }
//});

Router.route('/sessions/:id',{
    template: 'current',
    waitOn: function () {
        return [Meteor.subscribe('sessions_objects', this.params.id),Meteor.subscribe('sessions_users', this.params.id)];
    }
});

Router.route('/', {
    template: 'sessionList',
        waitOn: function () {
        return [Meteor.subscribe('sessions_list')];
    }
});

Router.configure({
    layoutTemplate: 'ApplicationLayout'
});