currentUser = function(data){
    var self = this;
    this.speed = 10;

    _.extend(this,data);

    this.x = this.x || 0;
    this.y = this.y || 0;
    this.state = this.state || 'default';

    this.updateDB = function(){
        setUserData(this.getData());
    };

    this.getData = function(){
        return {
            x: this.x,
            y: this.y,
            state: this.move
        }
    }

    this.interval = Meteor.setInterval(function(){
        if (self.move) {
            if (self.move == "right") {
                self.x+=self.speed;
            } else self.x-=self.speed;
            self.updateDB();
        }
    },1000/30);
    $(document).on('keydown', function(e){
        if (e.keyCode == 37) {
            this.move = "left";
        }
        if (e.keyCode == 39) {
            this.move = "right";
        }
    }.bind(this));
    $(document).on('keyup', function(e){
        if (e.keyCode == 37 || e.keyCode == 39) {
            this.move = 's'+this.move;
            self.updateDB();
            this.move = false;
        }
    }.bind(this));
};