get '/' do
  @todos = Todo.all
  erb :index
end

post '/add_todo' do
  @new_todo = Todo.create(params)
  erb :todo, layout: false
end

delete '/todos/:id' do
  todo_id = params[:id]
  p todo_id
  todo_delete = Todo.find(todo_id)
  todo_delete.destroy
  todo_id
end

