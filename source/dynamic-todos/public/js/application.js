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
      todoContent = getTodoContent($(this));
      deleteTodo(todoContent);
    })

    // Complete todo event handler
    $('.todo_list').on('click', '.complete', function(event) {
      event.preventDefault();
      todoContent = getTodoContent($(this));
      completeTodo(todoContent);
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
      appendTodoDiv(serverResponse);
    }).fail(function() {
      console.log("Request failed")
    })
  }

  // Delete todo
  var deleteTodo = function(todoContent) {
    $.ajax({
      method: 'delete',
      url: '/todos',
      data: {"todoContent": todoContent}
    }).done(function(serverResponse) {
      removeTodoDiv(serverResponse);
    }).fail(function() {
      console.log("Request failed");
    })
  }

  // Complete todo
  var completeTodo = function(todoContent) {
    $.ajax({
      method: 'patch',
      url: '/todos',
      data: {"todoContent": todoContent}
    }).done(function(serverResponse) {
      completeTodoDiv(serverResponse);
    }).fail(function() {
      console.log("Request failed");
    })
  }

  //-----DOM/HTML MANIPULATION-----

  var appendTodoDiv = function(todoContent) {
    $('.todo_list').append(buildTodo(todoContent));
  }


  var removeTodoDiv = function(todoContent) {
    todoHeader = $('h2').filter(function() { return $(this).text() === todoContent } );
    todoDiv = $('.todo_list .todo').has(todoHeader);
    todoDiv.remove();
  }

  var completeTodoDiv = function(todoContent) {
    todoHeader = $('h2').filter(function() { return $(this).text() === todoContent } );
    todoHeader.css('text-decoration', 'line-through');
  }

  // Build Todo HTML with given content
  var buildTodo = function(todoContent) {
    // Creates an jQueryDOMElement from the todoTemplate.
    var $todo = $(todoTemplate);
    // Modifies it's text to use the passed in todoName.
    $todo.find('h2').text(todoContent);
    // Returns the jQueryDOMElement to be used elsewhere.
    return $todo;
  }

  // Helper that takes a '.delete' or '.complete' DOMElement and returns
  // the todo content found in the same div. The todo content is stored
  // between h2 tags.
  var getTodoContent = function(todoButtonElement) {
    return todoButtonElement.parents().eq(2).find('h2').text();
  }

  bindEvents();
});


