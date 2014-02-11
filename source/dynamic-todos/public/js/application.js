$(document).ready(function() {

  function bindEvents() {

    $('form').submit(function(e){
      e.preventDefault();
      $.post('/add_todo', $(this).serialize()).done(function(response){
        $(".todo_list").append(response);
      });
    });

    $(".todo_list").on('click', '.delete', function(e){
      var $this = $(this)
      var todo_id = $this.data('id');
      $.ajax({
        url: 'todos/' + todo_id,
        type: 'DELETE',
      }).done(function(response) {
        $this.closest('div').fadeOut();
      });
    });

    $(".todo_list").on('click', '.complete', function(e){
      var $this = $(this)
      var todo_id = $this.data('id');
      $.ajax({
        url: 'todos/' + todo_id,
        type: 'put',
      }).done(function(response) {
        $this.closest('div').addClass('complete')
      });
    });
  }

  function handleDrags(){

    var dragSrcEl = null;

    function handleDragStart(e) {
      this.style.opacity = '0.5';

      dragSrcEl = this;

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    }


    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      return false;
    }

    function handleDragEnter(e) {
      if(this.classList[0] == "todo"){
        this.classList.add('over');
      }
    }

    function handleDragLeave(e) {
      this.classList.remove('over');
    }

    function handleDrop(e) {

      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (dragSrcEl != this){

        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
        this.style.opacity = '1';
      }

      return false;
    }

    function handleDragEnd(e) {
      [].forEach.call(todos, function(todo){
        todo.classList.remove('over');
      })
    }

    var todos = document.querySelectorAll('.todo_list .todo'); // necessary?

    [].forEach.call(todos, function(todo) {
      todo.addEventListener('dragstart', handleDragStart, false);
      todo.addEventListener('dragenter', handleDragEnter, false);
      todo.addEventListener('dragover', handleDragOver, false);
      todo.addEventListener('dragleave', handleDragLeave, false);
      todo.addEventListener('drop', handleDrop, false);
      todo.addEventListener('dragend', handleDragEnd, false);
    });
  }


  bindEvents();
  handleDrags();
});