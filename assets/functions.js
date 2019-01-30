// start button
$('#start').click(function () {
  $(this).addClass('d-none')
  $('#media').addClass('fade-in-f').removeClass('d-none')
})

// content selector
$('input[name="media_options"]').change( function () {
  $('.media-container').addClass('d-none')
  $('#' + $(this).attr('value')).addClass('fade-in-f').removeClass('d-none')
})
