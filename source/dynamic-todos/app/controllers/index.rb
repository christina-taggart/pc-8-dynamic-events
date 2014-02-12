get '/' do
  @todos = Todo.where(:completed => false)
  @completed = Todo.where(:completed => true)
  erb :index
end

post '/todo' do
  Todo.create(params)
  redirect '/'
end


get '/todo/:id/edit' do
  todo = Todo.find_by_id(params[:id])
  p todo.completed = true
  p todo.save
  redirect '/'
end

delete '/todo/:id' do
  Todo.destroy(params[:id])
  redirect '/'
end








