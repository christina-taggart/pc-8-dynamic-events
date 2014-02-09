$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
    // Bind functions which add, remove, and complete todos to the appropriate
    // elements
    $('.add').on('click', function(e) {
      e.preventDefault();
      addTodo();
    });

    $('div.todo_list').on('click', '.complete', function(e) {
      e.preventDefault();
      var todoID = $(e.target).parents('div.todo').attr('data-id');
      completeTodo(todoID);
    });

    $('div.todo_list').on('click', '.delete', function(e) {
      e.preventDefault();
      if (confirm('Are you sure you want to delete this?') == false) {
        return;
      }
      var todoID = $(e.target).parents('div.todo').attr('data-id');
      deleteTodo(todoID);
    });

  }

  //Create functions to add, remove and complete todos
  function addTodo() {
    $.ajax({
      type: "POST",
      url: '/add_todo',
      data: {'todo_content': $('input.todo').val()}
    })
    .done(function(obj) {
      $('input.todo').val('');
      var todoDOMObj = buildTodo(obj.todo.todo_content, obj.todo.id);
      addTodoToList(todoDOMObj)
    })
    .fail(function() {
      console.log('ajax post to /add_todo failed');
    });
  };

  function completeTodo(todoID) {
    $.ajax({
      type: "PUT",
      url: "/todos/" + todoID,
      data: { "id" : todoID }
    })
    .done(function(todoObj) {
      if (todoObj.todo.completed) {
        $("[data-id=" + todoObj.todo.id + "] > h2").attr('class', 'complete');
        $("[data-id=" + todoObj.todo.id + "] a.complete").text("Mark Incomplete");
      } else {
        $("[data-id=" + todoObj.todo.id + "] > h2").removeAttr('class');
        $("[data-id=" + todoObj.todo.id + "] a.complete").text("Mark Complete");
      }
    })
    .fail(function() {
      console.log('put request to /todos/id failed')
    });
  }

  function deleteTodo(todoID) {
    $.ajax({
      type: 'DELETE',
      url: "/todos/" + todoID,
      data: { "id" : todoID }
    })
    .done(function(todoID) {
      $("[data-id=" + todoID + "]").remove();
    });
  }


  function buildTodo(todoName, todoID) {
    // Creates an jQueryDOMElement from the todoTemplate.
    var $todo = $(todoTemplate);
    // Modifies it's text to use the passed in todoName.
    $todo.find('h2').text(todoName);
    // Add data-id field to indicate todo id
    $todo.attr('data-id', todoID)
    // Returns the jQueryDOMElement to be used elsewhere.
    return $todo;
  }

  function addTodoToList(todoDOMObj) {
    $('.todo_list').prepend(todoDOMObj);
  }

  bindEvents();
});
