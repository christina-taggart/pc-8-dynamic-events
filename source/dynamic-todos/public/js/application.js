$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {

    // Add todo event
  $('.toolbox form').on('submit', function(event) { // when you click submit in the form within a div with class toolbox
    event.preventDefault(); // stop the defualt behavior of submit (refresh page)
    var formData = $(this).serialize(); // grab the data from the form from the view (formData)
    $.post('/add_todo', formData, function(returnData) {    // ajax; go to this route (/add_todo) and give it this info (formData), do this with the data you get back (returnData)
      $('.todo_list').append('<li><h2>' + returnData.todo.todo_content + '</h2> <a class="delete" data-num="' + returnData.todo.id + '"href="#">Delete</a> <a class="complete" data-num="' + returnData.todo.id + '"href="#">Complete</a> </li>'); // make a new li with the id and content of the todo item, add it to the ul in .todo_list
    });
  })

  // Delete todo event
  $('.todo_list').on('click', 'li .delete', function(event) {
    event.preventDefault;
    var todo_content = $(this).parent().children('h2').text();
    $.ajax({
      url: '/delete_todo',
      type: 'DELETE',
      data: {"todo_content": todo_content},
      }).done(function(returnData){
        var id = returnData.todo.id;
        $('a[data-num=' + id + ']').parent().remove();
      });
  })

// "{\"todo\":{\"completed\":false,\"id\":73,\"todo_content\":\"ss\"}}"

  // Complete todo event
  $('.todo_list').on('click', '.complete', function(event) {
    event.preventDefault;
    var todo_content = $(this).parent().children('h2').text();
    $.ajax({
      url: '/update_todo',
      type: 'PUT',
      data: {"todo_content": todo_content},
      }).done(function(returnData){
        var id = returnData.todo.id;
        $('a[data-num=' + id + ']').parent().addClass('completed');// add class to change styling to italics;
      });
  })

  }

  //Create functions to add, remove and complete todos


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
