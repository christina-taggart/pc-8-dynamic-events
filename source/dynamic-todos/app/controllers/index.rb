get '/' do
  # Look in app/views/index.erb
  @todos = Todo.all
  erb :index
end

post '/todo_list' do
  content_type :json
  @new_todo = Todo.create(params)
  {todo_content: @new_todo.todo_content, id: @new_todo.id}.to_json
end

delete '/todo_list/:id' do
  content_type :json
  @delete_todo = Todo.find(params[:id])
  @delete_todo.destroy
  {id: @delete_todo.id}.to_json
end


