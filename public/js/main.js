$(document).ready(function(){
  $('.delete-article').on('click',(e)=>{
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/articles/'+id,
      success: function (response) {
        alert('Deleteing Article');
        window.location.href='/';
      },
      error: (err)=>{
        console.log(err);
      }
    });
  });
});

$(document).ready(function(){
  $('.delete-linkup').on('click',(e)=>{
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/linkups/'+id,
      success: function (response) {
        alert('Deleteing Linkups');
        window.location.href='/';
      },
      error: (err)=>{
        console.log(err);
      }
    });
  });
});
