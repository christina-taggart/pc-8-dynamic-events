get '/' do
  @todos = Todo.all
  erb :index
end

post '/todos' do
  new_todo = Todo.create(params)
  new_todo.todo_content
end

delete '/todos' do
  deleted_todo = Todo.find_by_todo_content(params[:todoContent])
  deleted_todo.destroy
  deleted_todo.todo_content
end

patch '/todos' do
  completed_todo = Todo.find_by_todo_content(params[:todoContent])
  completed_todo.completed = true
  completed_todo.save
  completed_todo.todo_content
end 

