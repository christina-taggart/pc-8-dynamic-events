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
  // binds dragstart
  $('.todo_list').on('dragstart', 'li', function(event) {
    event.preventDefault;
    handleDragStart(event);
  })
  // binds drag
  $('.todo_list').on('drag', 'li', function(event) {
    event.preventDefault;
  })
  // binds dragenter
  $('.todo_list').on('dragenter', 'li', function(event) {
    event.preventDefault;
  })
  // binds dragleave
  $('.todo_list').on('dragleave', 'li', function(event) {
    event.preventDefault;
  })
  // binds dragover
  $('.todo_list').on('dragover', 'li', function(event) {
    event.preventDefault;
  })
  // binds drop
  // $('.todo_list').on('drop', 'li', function(event) {
  //   event.preventDefault;
  //   console.log("drop!!!");
  //   handleDrop(event);
  // })
  // binds dragend
  $('.todo_list').on('dragend', 'li', function(event) {
    event.preventDefault;
  })
}

function addTodo(todo) {
  var formData = todo.serialize();
  $.post('/add_todo', formData, function(returnData) {
    displayNewTodo(returnData);
  });
}

function displayNewTodo(dataFromServer) {
  $('.todo_list').append('<li draggable=true><h2>' + dataFromServer.todo.todo_content + '</h2> <a class="delete" data-num="' 
      + dataFromServer.todo.id + '"href="#">Delete</a> <a class="complete" data-num="' 
      + dataFromServer.todo.id + '"href="#">Complete</a> </li>');
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

function handleDragStart(e) {
  dragSrcEl = this;
  e.originalEvent.dataTransfer.effectAllowed = 'move';
  e.originalEvent.dataTransfer.setData('text/html', this.innerHTML);
}

// function handleDrop(e) {
//   if (e.stopPropagation){
//     e.stopPropagation();
//   }

//   if (dragSourceElement != this){
//     dragSourceElement.innerHTML = this.innerHTML;
//     this.innerHTML = e.originalEvent.dataTransfer.getData('text/html');
//   }
//   return false;
// }
