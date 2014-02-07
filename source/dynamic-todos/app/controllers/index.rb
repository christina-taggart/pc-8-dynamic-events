get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/todos' do
  new_todo = Todo.create(params)
  new_todo.todo_content
end

