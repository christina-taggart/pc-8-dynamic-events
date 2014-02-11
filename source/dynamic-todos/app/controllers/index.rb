get '/' do
  # Look in app/views/index.erb
  @todos = Todo.all
  erb :index
end

post '/add_todo' do
  p params
  @todo = Todo.create(params)
  erb :list_element, layout: false
end

put '/todos/:id' do
  todo = Todo.find(params[:id])
  todo.update_attributes(completed: true)
end

delete '/todos/:id' do
  t = Todo.find(params[:id])
  t.destroy
end

