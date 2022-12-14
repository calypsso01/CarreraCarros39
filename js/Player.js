class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
  }

  //agreguemos la info del jugador a la BD y configura
  //la posición inicial del jugador
   addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
    });
  }

  
 //crea la fucnión para obtener la distancia y leer el valor
  getDistance() {
    //necesitamos referirnos a la ubic especifica
    var playerDistanceRef = database.ref("players/player" + this.index);
    //nos devuelve datos en la devolucion de llamada
    playerDistanceRef.on("value", data => {
      //extraemos los datos de la llamda con .val
      var data = data.val();
      //obten el valor de X yY y asignalas a los valores
      // de X yY e la BD:
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    });

    //llama a esta funcion dentro de FORM.js
  }
 

  //Bp
  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  //Bp
  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }
 
  //AA
  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
     });
  }

  //Bp
  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }
}
