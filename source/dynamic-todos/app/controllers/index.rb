get '/' do
  @todos = Todo.all
  erb :index
end

post '/todos' do
  new_todo = Todo.create(params)
  new_todo.todo_content
end

