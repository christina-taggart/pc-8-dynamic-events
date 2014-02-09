$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
    
    // Add Todo event handler
    $('.toolbox form').on('submit', function(event) {
      event.preventDefault();
      toDoContent = $(this).serialize();
      addTodo(toDoContent);
    })

    // Delete todo event handler
    $('.todo_list').on('click', '.delete', function(event) {
      event.preventDefault();
      todoId = getTodoId($(this));
      deleteTodo(todoId);
    })

    // Complete todo event handler
    $('.todo_list').on('click', '.complete', function(event) {
      event.preventDefault();
      todoId = getTodoId($(this));
      completeTodo(todoId);
    })
  }


  //-----AJAX REQUEST/RESPONSES-----

  // Add Todo
  var addTodo = function(todoContentSerialized) {
    $.ajax({
      method: 'post',
      url: '/todos',
      data: todoContentSerialized
    }).done(function(serverResponse) {
      appendTodoDiv(serverResponse.content, serverResponse.id);
    }).fail(function() {
      console.log("Request failed")
    })
  }

  // Delete todo
  var deleteTodo = function(todoId) {
    $.ajax({
      method: 'delete',
      url: '/todos',
      data: {"id": todoId}
    }).done(function(serverResponse) {
      removeTodoDiv(serverResponse.id.toString())
    }).fail(function() {
      console.log("Request failed");
    })
  }

  // Complete todo
  var completeTodo = function(todoId) {
    $.ajax({
      method: 'patch',
      url: '/todos',
      data: {"id": todoId}
    }).done(function(serverResponse) {
      completeTodoDiv(serverResponse.id.toString());
    }).fail(function() {
      console.log("Request failed");
    })
  }


  //-----DOM/HTML MANIPULATION-----

  var appendTodoDiv = function(todoContent, todoId) {
    $('.todo_list').append(buildTodo(todoContent, todoId));
  }


  var removeTodoDiv = function(todoId) {
    todoDiv = $(".todo[data-id='" + todoId + "']")
    todoDiv.remove();
  }

  var completeTodoDiv = function(todoContent) {
    todoHeader = $(".todo[data-id='" + todoId + "']").find('h2');
    todoHeader.css('text-decoration', 'line-through');
  }

  // Build Todo HTML with given content & id
  var buildTodo = function(todoContent, todoId) {
    var $todo = $(todoTemplate);
    $todo.find('h2').text(todoContent);
    $todo.find('h2').attr('style', 'text-decoration: none');
    $todo.attr('data-id', todoId.toString());
    return $todo;
  }

  // Helper that takes a '.delete' or '.complete' DOMElement and returns
  // the todo data-id found in the same div.
  var getTodoId = function(todoButtonElement) {
    return parseInt(todoButtonElement.parents().eq(2).attr('data-id'));
  }

  
  //-----DRAG AND DROP-----
  

  bindEvents();
});


