get '/' do
	@todos = Todo.all
  erb :index
end

post '/todos' do
	content_type :json
  new_todo = Todo.create(todo_content: params[:todo_content])
  new_todo.to_json
end

put '/todos' do
	content_type :json
	updated_todo = Todo.find_by_todo_content(params[:todo_content])
	updated_todo.update_attributes(completed: true)
	updated_todo.to_json
end

delete '/todos' do
	puts "*"*80
	p params
	deleted_todo = Todo.find_by_todo_content(params[:todo_content])
	deleted_todo.destroy
end
