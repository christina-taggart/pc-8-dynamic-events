$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
    // Bind functions which add, remove, and complete todos to the appropriate
    // elements
    $('#create_todo').on('submit', addTodo)
    $('.todo_list').on('click', '.delete', deleteTodo)
    $('.todo_list').on('click', '.complete', completeTodo)
    $('.completed_list').on('click', '.delete', deleteTodo)

}
  function addTodo(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/add_todo",
      data: $(this).serialize(),
    }).done(appendTodo);
  }

  function appendTodo(erb) {
    $(".todo_list").append("<div class='list_item item_" + erb.todo.id + "'><li>" + erb.todo.todo_content + "</li><a href='/todo/" + erb.todo.id + " ' class='delete'>Delete</a> <a href='/todo/" + erb.todo.id + " ' class='complete'>Complete</a></div>")
  }

  function deleteTodo(e) {
    e.preventDefault();
    $.ajax({
      type: "DELETE",
      url: this.href
    }).done(removeTodo);
  }

  function removeTodo(erb) {
    var $element = $(".item_" + erb.todo.id);
    $element.remove();
  }

  function completeTodo(e) {
    e.preventDefault();
    $.ajax({
      type: "PUT",
      url: this.href
    }).done(finishedTodo);
  }

  function finishedTodo(erb) {
    var $element = $(".item_" + erb.todo.id)
    $element.find('.complete').remove()
    $element.appendTo(".completed_list")
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
