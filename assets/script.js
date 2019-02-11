// start button
$('#start').click(function () {
  $(this).addClass('d-none')
  $('#media').addClass('fade-in-f').removeClass('d-none')
})

// content selector
$('input[name="mediaOptions"]').change(function () {
  const option = $(this).attr('value')
  $('.media-container').addClass('d-none')
  $('.media-dropdown').addClass('d-none')
  $('#' + option).addClass('fade-in-f').removeClass('d-none')
  $('#' + option + 'Dropdown').addClass('fade-in-f').removeClass('d-none')
})

// media filter
$('.dropdown-item').click(function () {
  const item = $(this)
  item.siblings().each(function () {
    $('.' + $(this).data('filter')).addClass('d-none')
  })
  $('.' + item.data('filter')).addClass('fade-in-f').removeClass('d-none')
})

// YouTube videos
$('.youtube').each(function () {
  const div = $(this)
  let parent = div
  if (div.find('div.play-button').length == 0) {
    const link = $('<a />')
      .attr('href', 'https://youtu.be/' + div.data('embed'))
      .attr('target', '_blank')
    div.append(link)
    parent = link
  }
  const img = $('<img />')
    .attr('src',  'https://img.youtube.com/vi/' + div.data('embed') + '/hqdefault.jpg')
    .on('load', function () {
      parent.append(img)
    })
}).click(function () {
  const div = $(this)
  if (div.find('div.play-button').length > 0) {
    const iframe = $('<iframe />')
      .attr('frameborder', '0')
      .attr('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture')
      .attr('allowfullscreen', '')
      .attr('src', 'https://www.youtube-nocookie.com/embed/' + div.data('embed') + '?autoplay=1')
    div.empty()
    div.append(iframe)
  }
})