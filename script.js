const YOUTUBE_IMG = 'https://img.youtube.com/vi/'
const YOUTUBE_LINK = 'https://youtu.be/'
const YOUTUBE_EMBED = 'https://www.youtube-nocookie.com/embed/'
const SPOTIFY_EMBED = 'https://open.spotify.com/embed/track/'

// start button
$('#start').click(function () {
  $(this).addClass('d-none')
  $('#media').addClass('fade-in-f').removeClass('d-none')
})

function getRandomIndices(N) {
  const indices = Array(N)
  for (let i = 0; i < N; i++) {
    indices[i] = i
  }
  let rand, temp
  for (let i = N - 1; i > 0; i--) {
    rand = Math.floor(Math.random() * (i + 1))
    temp = indices[i]
    indices[i] = indices[rand]
    indices[rand] = temp
  }
  return indices
}

function getYoutube(video) {
  const youtube = $('<div class="youtube" />')
  const img = $('<img />')
    .attr('src',  YOUTUBE_IMG + video.youtube + '/hqdefault.jpg')
  if (video.no_embed) {
    const link = $('<a />')
      .attr('href', YOUTUBE_LINK + video.youtube)
      .attr('target', '_blank')
    youtube.append(link)
    img.on('load', function () {
      console.log(img)
      link.append(img)
    })
  } else {
    img.on('load', function () {
      youtube.append(img)
    })
    const playButton = $('<div class="play-button" />')
    youtube.append(playButton)
    youtube.click(function () {
      const iframe = $('<iframe />')
        .attr('frameborder', '0')
        .attr('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture')
        .attr('allowfullscreen', '')
        .attr('src', YOUTUBE_EMBED + video.youtube + '?autoplay=1')
      youtube.empty()
      youtube.append(iframe)
    })
  }
  return youtube
}

function generateVideos(videos) {
  const videoContainer = $('#video')
  const cardColumns = $('<div class="card-columns small" />')
  videoContainer.append(cardColumns)
  const indices = getRandomIndices(videos.length)
  for (let i = 0; i < videos.length; i++) {
    const video = videos[indices[i]]
    const card = $('<div class="card" />')
    for (tag of video.tags) {
      card.addClass(tag + "-video")
    }
    const cardImg = $('<div class="card-img-top" />')
    cardImg.append(getYoutube(video))
    card.append(cardImg)
    const cardBody = $('<div class="card-body" />')
    const cardTitle = $('<h6 class="card-title" />')
      .text(video.title)
    cardBody.append(cardTitle)
    if (video.caption) {
      cardText = $('<div class="card-text" />')
        .text(video.caption)
      cardBody.append(cardText)
    }
    card.append(cardBody)
    cardColumns.append(card)
  }
}

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
  const iframe = $('<iframe />')
    .attr('frameborder', '0')
    .attr('allowtransparency', 'true')
    .attr('allow', 'encrypted-media')
    .attr('src', SPOTIFY_EMBED + div.data('embed'))
  div.empty()
  div.append(iframe)
})

// Enable tooltips
$('[data-toggle="tooltip"]').tooltip()

$(generateVideos(content.video))
