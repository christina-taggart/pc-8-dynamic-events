$(document).ready(function() {
  $('#create-task').on("submit", function(e){
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/created',
      data: $(this).serialize()
    }).done(function(json) {
      // $('#task-list').append(erb)
        var task = $.parseJSON(json).task;
        var template = "<h3>{{title}}</h3><br>{{content}}<br><a class='delete-button' href='/{{id}}/deleted'>Delete task</a><a class='edit-button' href='/{{id}}/edit'>Edit task</a><a class='complete-button' href='/{{id}}/complete'>Complete task</a>";
        var html = Mustache.to_html(template, task);
        console.log(task);
        $('#task-list').append(html); //add div at the end

    });
  })

//   $.getJSON('json/data.json', function(data) {
//     var template = "<h1>{{firstName}} {{lastName}}</h1>Blog: {{blogURL}}";
//     var html = Mustache.to_html(template, data);
//     $('#sampleArea').html(html);
// });

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
  // Target (this) element is the source node.
  this.style.opacity = '0.4';

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

var tasks = document.querySelectorAll('li');
[].forEach.call(tasks, function(task) {
  task.addEventListener('dragstart', handleDragStart, false);
  task.addEventListener('dragenter', handleDragEnter, false);
  task.addEventListener('dragover', handleDragOver, false);
  task.addEventListener('dragleave', handleDragLeave, false);
});

function handleDrop(e) {
  // this / e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }

  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
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
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }

  return false;
}

});

