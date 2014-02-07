$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
    $('.toolbox form').on('submit', function(event) {
      event.preventDefault();
      toDoContent = $(this).serialize();
      console.log(toDoContent)
      addTodo(toDoContent);
    })
  }

  // Add Todo
  var addTodo = function(toDoContent) {
    console.log(toDoContent)
    $.ajax({
      method: 'post',
      url: '/todos',
      data: toDoContent
    }).done(function(serverResponse) {
      $('.todo_list').append(buildTodo(serverResponse));
    }).fail(function() {
      console.log("Request failed")
    })
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

  bindEvents();
});


