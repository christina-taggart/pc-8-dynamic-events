$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());
  bindEvents();
});

function bindEvents() {
  // Add todo event
  $('.toolbox form').on('submit', function(event){
    event.preventDefault();
    addTodo($(this));
  });
  // Delete todo event
  $('.todo_list').on('click', 'li .delete', function(event) {
    event.preventDefault;
    deleteTodo($(this));
  })
  // Complete todo event
  $('.todo_list').on('click', '.complete', function(event) {
    event.preventDefault;
    completeTodo($(this));
  })
}

function addTodo(todo) {
  var formData = todo.serialize();
  $.post('/add_todo', formData, function(returnData) {
    displayNewTodo(returnData);
    $('.todo_list li').draggable();
  });
}

function displayNewTodo(dataFromServer) {
  $('.todo_list').append('<div class="draggable"><li><h2>' + dataFromServer.todo.todo_content + '</h2> <a class="delete" data-num="' 
      + dataFromServer.todo.id + '"href="#">Delete</a> <a class="complete" data-num="' 
      + dataFromServer.todo.id + '"href="#">Complete</a> </li></div>');
}

function deleteTodo(todo) {
  var todo_content = todo.parent().children('h2').text();
  $.ajax({
    url: '/delete_todo', 
    type: 'DELETE',
    data: {"todo_content": todo_content},
    })
    .done(function(returnData) {
      removeTodo(returnData);
    });
}

function removeTodo(dataFromServer) {
  $('a[data-num=' + dataFromServer.todo.id + ']').parent().remove();
}

function completeTodo(todo) {
  var todo_content = todo.parent().children('h2').text();
  $.ajax({
    url: '/update_todo',
    type: 'PUT',
    data: {"todo_content": todo_content},
    }).done(function(returnData){
      modifyTodo(returnData);
    });
}

function modifyTodo(dataFromServer) {
  $('a[data-num=' + dataFromServer.todo.id + ']').parent().addClass('completed');
}