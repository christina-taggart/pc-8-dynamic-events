get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do
	Todo.create(todo_content: params[:input])
end

delete '/delete_todo' do
	 p params[:title]
	delete_me = Todo.where(todo_content: params[:title]).first
	delete_me.destroy
end


post '/mark_complete' do
	update_me = Todo.where(todo_content: params[:title]).first
	update_me.completed = true
	update_me.save
end
