$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
    $('form').submit(function(event) { 
      event.preventDefault();
      var todo = $(this).serialize();
      addTodo(todo)
    });

    $('.todo_list').on('submit', 'li .complete', function(event) {
      event.preventDefault();
      completeTodo($(this))
    });

    $('.todo_list').on('submit', 'li .delete', function(event) {
      event.preventDefault();
      deleteTodo($(this))
    });
  }

  //Create functions to add, remove and complete todos
  function addTodo(toDoContent) {
    $.ajax({
      type: "post",
      url: "/todos",
      data: toDoContent
    }).done(function(serverResponse) {
      $('#new_todo').html("<h3>" + serverResponse.todo.todo_content + "</h3>")
    }).fail(console.log("addTodo failed"))
  }
  
  function completeTodo(toDoContent) {
    $.ajax({
      type: "put",
      url: "/todos",
      data: toDoContent
    }).done(function(serverResponse) {

    }).fail(console.log("completeTodo failed"))
  }

  function deleteTodo(toDoContent) {
    $.ajax({
      type: "delete",
      url: "/todos",
      data: toDoContent
    }).done(function(serverResponse) {

    }).fail(console.log("deleteTodo failed"))
  }

  function buildTodo(todoName) {
    // Creates an jQueryDOMElement from the todoTemplate.
    var $todo = $(todoTemplate);
    // Modifies it's text to use the passed in todoName.
    $todo.find('h2').text(todoName);
    // Returns the jQueryDOMElement to be used elsewhere.
    return $todo;
  }


  bindEvents();
});
