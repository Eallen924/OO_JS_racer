function advancePlayer(player) {
  player.removeClass("active").next().addClass("active");
}
$(document).ready(function (){
  $('.reset').on('click', function(){
    location.reload();
  });

  $(document).on('keyup', function(event){
    var keycode = (event.keyCode? event.keyCode :event.which);
    if(keycode == '81'){
      var player = $('#player1');
      advancePlayer( player.find('.active'));

      if( $('#player1 li:last-child').hasClass('active')) {
        var winnerId = player.attr('data-player-id');
        var params = { player_ids: window.playerIds, winnder_id: winnerId };
        $.post('/game_over', params);
        $('#notify_winner').html('Player 1 Wins!');
        $('.reset').removeClass('hidden');
        $(document).off('keyup');
      }
    }

    if(keycode == '80'){
      var player = $('#player2');
      advancePlayer( player.find('.active'));

      if( $('#player2 li:last-child').hasClass('active')) {
        var winnerId = player.attr('data-player-id');
        var params = { player_ids: window.playerIds, winnder_id: winnerId };
        $.post('/game_over', params);
        $('#notify_winner').html('Player 2 Wins!');
        $('.reset').removeClass('hidden');
        $(document).off('keyup');
      }
    }
  });
});
