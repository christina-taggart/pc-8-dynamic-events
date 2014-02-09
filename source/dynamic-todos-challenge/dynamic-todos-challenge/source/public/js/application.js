$(document).ready(function() {
  $('#create-task').on("submit", function(e){
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/created',
      data: $(this).serialize()
    }).done(function(erb) {
      $('#task-list').append(erb)
    });
  })

  $(document).on("click", '.delete-button', function(e){
    e.preventDefault();
    console.log("delete")
    url = $(this).attr('href')
    $.ajax({
      type: 'delete',
      url: url
    }).done(function(task_id) {
      $("#" + task_id).remove()
    })
  })

  $(document).on("click", '.edit-button', function(e){
    e.preventDefault();
    url = $(this).attr('href')
    $.ajax({
      type: 'get',
      url: url

    }).done(function(erb) {
      id = url.match(/\d+/)[0]
      $("#edit-task").remove()
      $("#" + id).append(erb)

    })
  })

  $(document).on("submit", '#edit-task', function(e){
    e.preventDefault();
    url = $(this).attr('action')
    $.ajax({
      type: 'put',
      url: url,
      data: $(this).serialize()
    }).done(function(erb) {
      console.log("asdfasdf")
      id = url.match(/\d+/)[0]
      $("#" + id).replaceWith(erb)
    })
  })

  var dragSrcEl = null;
function handleDragStart(e) {
  this.style.opacity = '0.4';
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
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  
}

var tasks = document.querySelectorAll('li');
[].forEach.call(tasks, function(task) {
  task.addEventListener('dragstart', handleDragStart, false);
  task.addEventListener('dragenter', handleDragEnter, false);
  task.addEventListener('dragover', handleDragOver, false);
  task.addEventListener('dragleave', handleDragLeave, false);
});

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); 
  }
  return false;
}

function handleDragEnd(e) {
  
  this.style.opacity = '1';
  [].forEach.call(tasks, function (task) {
    task.classList.remove('over');
  });
}

var tasks = document.querySelectorAll('li');
[].forEach.call(tasks, function(task) {
  task.addEventListener('dragstart', handleDragStart, false);
  task.addEventListener('dragenter', handleDragEnter, false)
  task.addEventListener('dragover', handleDragOver, false);
  task.addEventListener('dragleave', handleDragLeave, false);
  task.addEventListener('drop', handleDrop, false);
  task.addEventListener('dragend', handleDragEnd, false);
});

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); 
  }
  if (dragSrcEl != this) { 
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}

});

