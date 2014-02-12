get '/' do
  erb :index
end

post '/add_todo' do
	redirect '/'
end

delete '/delete_todo' do
	delete_todo = Todo.where(params).destroy

end

post '/complete_todo' do
	complete_todo=Todo.where(params)
end


