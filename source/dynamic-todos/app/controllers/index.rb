get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/todos' do
	content_type :json
  p "Inside /add_todo route!"
  new_todo = params[:new_todo]
  @todo = Todo.create(new_todo)
  @todo.to_json
end

put '/todos/:id' do
	content_type :json
  p "Inside /add_todo route!"
  @new_todo = Todo.find(params[:id])
  new_todo = params[:new_todo]
  @todo = Todo.create(new_todo)
  @todo.to_json
end

delete '/todos/:id' do
	@todo = Todo.find(params[:id])
	@todo.destroy
	params[:id]
end
