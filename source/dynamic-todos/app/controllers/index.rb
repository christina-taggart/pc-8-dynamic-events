

get '/' do
  @todos = Todo.all
  erb :index
end

# Add todo
post '/todos' do
  content_type :json
  new_todo = Todo.create(params)
  {"content" => new_todo.todo_content, "id" => new_todo.id}.to_json
end

# Delete todo
delete '/todos' do
  content_type :json
  deleted_todo = Todo.find(params[:id].to_i)
  deleted_todo.destroy
  {"id" => deleted_todo.id}.to_json
end

# Complete todo
patch '/todos' do
  completed_todo = Todo.find_by_todo_content(params[:todoContent])
  completed_todo.completed = true
  completed_todo.save
  completed_todo.todo_content
end 

