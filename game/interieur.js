
// //trios en haut
// game.add.text(100,60,"2");
// game.add.text(230,60,"2");
// game.add.text(350,60,"2");

// // trois en bas
// game.add.text(100,470,"2");
// game.add.text(230,470,"2");
// game.add.text(400,420,"2");

// // trois au milieu
// game.add.text(100,270,"2");
// game.add.text(230,300,"2");
// game.add.text(350,200,"2");

var bebete=function (){ };
bebete.prototype={
    move:function () {
        
    },
    attaque:function (bebete) {
        bebete.meurt()
    },
    meurt:function () {
          this.sprite.destroy()
    },
}

var Espece={
    nb:2,
}

var Especes= {
    mollusques: {
        annelides:{proies:[],xp:0},
        escargots:{proies:[],xp:0}
    },
    cephalopodes:{
        seches:{proies:["annelides"],xp:3},
        pieuvres:{proies:["thons"],xp:3}
    },
    arthropodes:{
        insectes:{proies:[],xp:1},
        arachnides:{proies:["insectes"],xp:4}
    },
    selaciens:{
        roussettes:{proies:["seches"],xp:3},
        requins:{proies:["coelacanthes"],xp:3}
    },
    osteoichtyens:{
        thons:{proies:["annelides"],xp:3},
        coelacanthes:{proies:["thons"],xp:3}
    },
    anapasides:{
        grenouilles:{proies:["insectes"],xp:3},
        serpents:{proies:["rongeurs"],xp:3},
        crocodiles:{proies:["serpents","compsognathus"],xp:4}
    },
    dinosauriens:{
        compsognathus:{proies:["grenouilles"],xp:2},
        tyrannosaures:{proies:["hippopotames","compsognathus","gorilles"],xp:7}
    },
    cetaces:{
        orques:{proies:["pieuvres","requins"],xp:7}
    },
    mammiferes:{
        rongeur:{proies:["escargots"],xp:3},
        hippopotame:{proies:["crocodile"],xp:3},
        gorille:{proies:[],xp:2}
    }
};


var esp=function (mere,proies,xp) {
    this.mere=mere;
    this.proies=proies;
};
esp.prototype=Object.create(Phaser.Sprite.prototype, {
    meurt:function () {
        this.destroy();
        mere.meurt()
    }
});

var phylum=function (name,available) {
    this.name=name; this.nb=2;
    this.available=available;
    this.sprites=[];
    for(var i = 0; i < 2; i++) {
        sprites.add(new esp(this))
    }
    
};
phylum.prototype={
    meurt:function () {
        this.nb-=1;
        //game.remove.sprite
    }
};

interieur = function (game) {};
interieur.prototype={
    preload: function () {
        game.load.image("interieur","images/interieurIncubateur.jpg" )
    },
    create:function () {
        var img=game.add.image(0,0, "interieur")
        img.scale.setTo(1,0.85);
        game.add.text(30,0,"20");

        //trios en haut
        game.add.text(100,60,"2");
        game.add.text(230,60,"2");
        game.add.text(350,60,"2");

        // trois en bas
        game.add.text(100,470,"2");
        game.add.text(230,470,"2");
        game.add.text(400,420,"2");

        // trois au milieu
        game.add.text(100,270,"2");
        game.add.text(230,300,"2");
        game.add.text(350,200,"2");
        
        var key=game.input.keyboard.addKey(Phaser.Keyboard.X);
        key.onDown.add(this.goTo, this)
    },
    goTo:function () {
        game.state.start("board")
    }
};
