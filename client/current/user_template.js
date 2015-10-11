Template.user_template.helpers({
    'fid': function(){
        return this.services.facebook.id;
    },
    style: function(){
        return 'transform:translate('+(this.profile.data.x+globalOffset)+'px,0px)'
    },
    text: function(){
        return this.profile.data.text;
    },
    state: function(){
        return this.profile.data.state;
    },
    name: function(){
        return this.profile.name;
    }
})