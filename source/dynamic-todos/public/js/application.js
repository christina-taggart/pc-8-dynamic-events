$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {

  // currently these three event binders do way too much - bind the event, request & db modification, and DOM modification

  // Add todo event
  $('.toolbox form').on('submit', function(event) { // when you click submit in the form within a div with class toolbox
    event.preventDefault(); // stop the defualt behavior of submit (refresh page)
    var formData = $(this).serialize(); // grab the data from the form from the view (formData)
    $.post('/add_todo', formData, function(returnData) {    // ajax; go to this route (/add_todo) and give it this info (formData), do this with the data you get back (returnData)
      $('.todo_list').append('<li><h2>' + returnData.todo.todo_content + '</h2> <a class="delete" data-num="' + returnData.todo.id + '"href="#">Delete</a> <a class="complete" data-num="' + returnData.todo.id + '"href="#">Complete</a> </li>'); // make a new li with the id and content of the todo item, add it to the ul in .todo_list
    });
  })

  // Delete todo event
  $('.todo_list').on('click', 'li .delete', function(event) { // when you click on the delete link for a todo item
    event.preventDefault; // stop default behavior
    var todo_content = $(this).parent().children('h2').text(); // find the todo_content through traversals
    $.ajax({
      url: '/delete_todo', 
      type: 'DELETE',
      data: {"todo_content": todo_content},
      }).done(function(returnData){
        var id = returnData.todo.id;
        $('a[data-num=' + id + ']').parent().remove(); // select the li (via traversals) for this todo item and remove it from the DOM
      });
  })

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
        $('a[data-num=' + id + ']').parent().addClass('completed');// DOM modification - add class to the li for this todo which applies font-style italic;
      });
  })

  }

  bindEvents();
});
