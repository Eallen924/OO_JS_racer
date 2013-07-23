// This is the constructor function way of creating a JS Object.
function Player(id, keycode, name){
  this.id = id;
  this.keycode = keycode;
  this.name = name;
}

Player.prototype.advance = function(){
  var playerTrack = $('#player' + this.id);
  var playerPosition = playerTrack.find('li.active')
  playerPosition.removeClass("active").next().addClass("active");
}

// This is the literal notation way of creating a JS Object.
// The literal notation is preferred for namespacing.
var Game = {
  playerArray: [],
  startTime: null,
  endTime: null,
  gameIsOver: function() {
    return $('li:last-child').hasClass('active');
  },

  winner: function() {
    return $('ol').find('li:last-child.active').parent().data('player-id');
  },

  persistGameResults: function(players, winner_id, elapsed_time) {
    $.post('/game_over', {player_ids: this.playerArray.map(function(player){ return player.id; }),
      winner_id: this.winner(),
      game_duration: this.elapsedTime()});
  },

  findPlayerById: function(player_id){
    return this.playerArray.filter( function(player) {
      return (player.id == player_id);
    })[0];
  },

  findPlayerByKeyCode: function(keyCode) {
    return this.playerArray.filter( function(player) {
      return (player.keycode == keyCode);
    })[0];
  },
  started: function() {
    return this.startTime !== null;
  },
  start: function() {
    this.startTime = new Date();
  },
  finish: function() {
    this.endTime = new Date();
    $('#reset').removeClass('hidden');
    $('#winner').html(this.findPlayerById(winner()).name);
  },
  elapsedTime: function() {
    return (this.endTime - this.startTime) / 1000;
  },
  handleKeyUp: function(event){
    var keycode = event.which;

    if(!Game.started()) {
      Game.start();
    }

    var player = Game.findPlayerByKeyCode(keycode);
    player.advance();

    if (Game.gameIsOver()) {  //Handle keyup event
      Game.finish();
      $(document).off('keyup');
      Game.persistGameResults();
    }
  },

  loadGameFromDom: function(){
    $(document).on('keyup', this.handleKeyUp);

    var eachTrack = $('ol.track');

    for(var i = 0; i < eachTrack.length; i++){
      var newPlayerId = $(eachTrack[i]).data('player-id');
      var newPlayerKeyCode = $(eachTrack[i]).data('player-key');
      var newPlayerName = $(eachTrack[i]).data('player-name');
      this.playerArray.push(new Player(newPlayerId, newPlayerKeyCode, newPlayerName));
    }
  }
};

$(document).ready(function() {
  Game.loadGameFromDom();
  $('.reset').on('click', function() { //can pull this function out and name it
    location.reload();
  })
});





