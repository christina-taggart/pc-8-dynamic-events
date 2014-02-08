$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {

    // Add todo event
  $('.toolbox form').on('submit', function(event) { // when you click submit in the form within a div with class toolbox
    event.preventDefault(); // stop the defualt behavior of submit (refresh page)
    var formData = $(this).serialize(); // grab the data from the form from the view (formData)
    $.post('/add_todo', formData, function(returnData) {    // ajax; go to this route (/add_todo) and give it this info (formData), do this with the data you get back (returnData)
      $('.todo_list ul').append('<li>' + returnData.todo.id + ': ' + returnData.todo.todo_content + '</li>'); // make a new li with the id and content of the todo item, add it to the ul in .todo_list
    });
  })

  // Delete todo event
  $('#delete a').on('click', function(event) {
    event.preventDefault;
    // other stuff here
  })

  // Complete todo event
  $('#complete a').on('submit', function(event) {
    event.preventDefault;
    // other stuff here
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
