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
  todo_delete = Todo.find(todo_id)
  todo_delete.destroy
end

put '/todos/:id' do
  todo_id = params[:id]
  todo_update = Todo.find(todo_id)
  todo_update.update_attribute(:completed, true)
end

