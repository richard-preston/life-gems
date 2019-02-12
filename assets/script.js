const YOUTUBE_IMG = 'https://img.youtube.com/vi/'
const YOUTUBE_EMBED = 'https://www.youtube-nocookie.com/embed/'
const SPOTIFY_IMG = 'https://open.spotify.com/oembed?url=spotify:track:'
const SPOTIFY_EMBED = 'https://open.spotify.com/embed/track/'

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
  if (item.data('filter') === 'all') {
    item.siblings().each(function () {
      $('.' + $(this).data('filter')).addClass('fade-in-f').removeClass('d-none')
    })
  } else {
    item.siblings().each(function () {
      $('.' + $(this).data('filter')).addClass('d-none')
    })
    $('.' + item.data('filter')).addClass('fade-in-f').removeClass('d-none')
  }
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
    .attr('src',  YOUTUBE_IMG + div.data('embed') + '/hqdefault.jpg')
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
      .attr('src', YOUTUBE_EMBED + div.data('embed') + '?autoplay=1')
    div.empty()
    div.append(iframe)
  }
})

// Spotify songs
$('.spotify').click(function () {
  const div = $(this)
  if (!div.data('embed')) {
    return
  }
  console.log('loading iframe')
  const iframe = $('<iframe />')
    .attr('frameborder', '0')
    .attr('allowtransparency', 'true')
    .attr('allow', 'encrypted-media')
    .attr('src', SPOTIFY_EMBED + div.data('embed'))
  div.empty()
  div.append(iframe)
})
