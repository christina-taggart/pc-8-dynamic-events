$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {

    // Add todo event
  $('.toolbox form').on('submit', function(event) { // when you click submit in the form within a div with class toolbox
    event.preventDefault(); // stop the defualt behavior of submit (refresh page)
    var formData = $(this).serialize(); // grab the data from the form from the view (formData)
    $.post('/add_todo', formData, function(returnData) {    // ajax; go to this route (/add_todo) and give it this info (formData), do this with the data you get back (returnData)
      $('.todo_list').append('<li>' + returnData.todo.todo_content + ' <a id="delete" data-num="' + returnData.todo.id + '"href="#">Delete</a> <a id="complete" data-num="' + returnData.todo.id + '"href="#">Complete</a> </li>'); // make a new li with the id and content of the todo item, add it to the ul in .todo_list
    });
  })

  // Delete todo event
  $('.todo_list').on('click', '#delete', function(event) {
    alert("yes you clicked on the delete link");
    // event.preventDefault;
    // debugger
    // $.ajax({
    //   url: '/todo/:id',
    //   type: 'DELETE',
    //   data: $(this).serialize(),
    //   success: function(returnData) {
    //     alert("You want to delete this: " + returnData);
    //   }
    // });
  })

  // Complete todo event
  $('.todo_list').on('click', '#complete', function(event) {
    alert("Yes you clicked on complete");
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
