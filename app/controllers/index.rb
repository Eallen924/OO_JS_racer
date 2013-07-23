get '/' do
  erb :index
end

post '/enter_race' do
	p params
  @players = params[:player_names].map do |player|
  	Player.find_or_create_by_player_name(player)
  end
  erb :race
end

post '/game_over' do
  @game = Game.create( {:player_ids => params[:player_ids],
                        :winner_id => params[:winner_id],
                        :game_duration => params[:game_duration]})
  erb :index
end
