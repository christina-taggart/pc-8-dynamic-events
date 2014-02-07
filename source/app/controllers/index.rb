get '/' do
  @todos = Todo.order('id')
  erb :index
end

post '/add_todo' do
  Todo.create(todo_content: params[:todo_content])
end

put '/todo/:id' do
  todo = Todo.find(params[:id])
  todo.toggle(:completed)
  todo.save
  200
end

delete '/todo/:id' do
  Todo.destroy(params[:id])
  @todos = Todo.order('id')
  erb :todo, layout: false
end