get '/' do
  # Look in app/views/index.erb
  redirect '/todos'
end

get '/todos' do
  @todos = Todo.order(:created_at).reverse
  erb :index
end


post '/todos' do
  @todo = Todo.create(params)
  erb :_todo_template, layout: false

end

delete '/todos/:id' do
  Todo.delete(params[:id])
  "deleted"
end

put '/todos/:id' do
  todo = Todo.find(params[:id])
  current_val = todo.completed
  current_val ? current_val = false : current_val = true
  todo.update_attributes({completed: current_val})
  "updated todo"
end


