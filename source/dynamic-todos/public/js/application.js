$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
    // Bind functions which add, remove, and complete todos to the appropriate
    // elements

    $('.todo_partial').on('click', '.complete', completeThis())
    $('.todo_partial').on('click', '.delete', delethisThis())

    function completeThis(){
      $.ajax({
        type: 'put'
        url: '/todo/:id/edit'
      })
    }

    function deleteThis(){
      $.ajax({
        type: 'delete'
        url: '/todo/:id/edit'
      })
    }

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

