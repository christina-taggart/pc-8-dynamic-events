get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/todos' do
	content_type :json
  @todo = Todo.create(params)
  @todo.to_json
end

put '/todos/:id' do
	content_type :json
	update_user = params[:update_user]
  @todo = Todo.find(update_user[:id])
  @todo.update_attributes(update_user)
  @todo.to_json
end

delete '/todos/:id' do
	@todo = Todo.find(params[:id])
	@todo.destroy
	params[:id]
end
