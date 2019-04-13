const YOUTUBE_IMG = 'https://img.youtube.com/vi/'
const YOUTUBE_LINK = 'https://youtu.be/'
const YOUTUBE_EMBED = 'https://www.youtube-nocookie.com/embed/'
const SPOTIFY_EMBED = 'https://open.spotify.com/embed/track/'
const NETFLIX_LINK = "https://www.netflix.com/title/"
const AMAZON_LINK = "https://www.amazon.com/dp/"
const HULU_LINK = "https://www.hulu.com/"
const HBO_LINK = "https://play.hbonow.com/"
const FOX_LINK = "https://www.fox.com/watch/"
const POSTER_IMG = "https://m.media-amazon.com/images/M/"

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

function generateYoutube(video) {
  const youtube = $('<div class="youtube" />')
  const img = $('<img />')
    .attr('src',  YOUTUBE_IMG + video.youtube + '/hqdefault.jpg')
  if (video.no_embed) {
    const link = $('<a />')
      .attr('href', YOUTUBE_LINK + video.youtube)
      .attr('target', '_blank')
    youtube.append(link)
    img.on('load', function () {
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

function generateVideo(video)  {
  const card = $('<div class="card" />')
  const cardImg = $('<div class="card-img-top" />')
  cardImg.append(generateYoutube(video))
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
  return card
}

function generateVideos(videos) {
  const videoContainer = $('#video')
  const cardColumns = $('<div class="card-columns" />')
  videoContainer.append(cardColumns)
  const indices = getRandomIndices(videos.length)
  for (let i = 0; i < videos.length; i++) {
    const video = videos[indices[i]]
    const card = generateVideo(video)
    for (tag of video.tags) {
      card.addClass(tag + '-video')
    }
    cardColumns.append(card)
  }
}

function generateSpotify(song) {
  const card = $('<div class="card" />')
  const spotify =  $('<div class="spotify" />')
    .append($('<div class="play-button" />'))
    .append($('<h6>' + song.title + '</h6>'))
  if (song.caption) {
    spotify.append($('<p class="small"><i>' + song.caption + '</i></p>'))
  }
  spotify.append($('<p>' + song.artist + '</p>'))
  spotify.click(function () {
    const iframe = $('<iframe />')
      .attr('frameborder', '0')
      .attr('allowtransparency', 'true')
      .attr('allow', 'encrypted-media')
      .attr('src', SPOTIFY_EMBED + song.spotify)
    spotify.empty()
    spotify.append(iframe)
  })
  card.append(spotify)
  return card
}

function generateMusic(music) {
  const musicContainer = $('#music')
  const cardColumns = $('<div class="card-columns" />')
  musicContainer.append(cardColumns)
  const indices = getRandomIndices(music.length)
  for (let i = 0; i < music.length; i++) {
    const song = music[indices[i]]
    let card
    if (song.spotify) {
      card = generateSpotify(song)
    } else if (song.youtube) {
      card = generateVideo(song)
    } else {
      console.error('Failed to generate song ' + song)
      continue
    }
    for (tag of song.tags) {
      card.addClass(tag + '-music')
    }
    cardColumns.append(card)
  }
}

function generateWord(word) {
  const wordContainer = $('#word')
  const indices = getRandomIndices(word.length)
  for (let i = 0; i < word.length; i++) {
    const item = word[indices[i]]
    const card = $('<div class="card my-3" />')
    if (item.img) {
      const img = $('<img class="card-img" />')
        .attr('src', item.img)
        .attr('alt', item.alt)
      card.append(img)
    } else if (item.quote) {
      const blockquote = $('<blockquote class="blockquote card-body" />')
        .append($('<p>' + item.quote + '</p>'))
        .append(
          $('<footer class="blockquote-footer">' + item.author + '</footer>')
        )
      card.append(blockquote)
    } else {
      console.error('Failed to generate word item ' + word)
      continue
    }
    wordContainer.append(card)
  }
}

function generateCinema(cinema) {
  const cinemaContainer = $('#cinema')
  const cardColumns = $('<div class="card-columns" />')
  cinemaContainer.append(cardColumns)
  const indices = getRandomIndices(cinema.length)
  for (let i = 0; i < cinema.length; i++) {
    const item = cinema[indices[i]]
    const card = $('<div class="card" />')
    const cardImg = $('<img class="card-img-top" />')
      .attr('src', POSTER_IMG + item.img)
      .attr('alt', item.title)
    card.append(cardImg)
    const cardFooter = $('<div class="card-footer" />')
    if (item.netflix) {
      const netflix = $('<a class="netflix" target="_blank" />')
        .attr('href', NETFLIX_LINK + item.netflix)
        .append($('<img src="images/netflix.png" />'))
      cardFooter.append(netflix)
    }
    if (item.hulu) {
      const hulu = $('<a class="hulu" target="_blank" />')
        .attr('href', HULU_LINK + item.hulu)
        .append($('<img src="images/hulu.png" />'))
      cardFooter.append(hulu)
    }
    if (item.hbo) {
      const hbo = $('<a class="hbo" target="_blank" />')
        .attr('href', HBO_LINK + item.hbo)
        .append($('<img src="images/hbo.png" />'))
      cardFooter.append(hbo)
    }
    if (item.fox) {
      const fox = $('<a class="fox" target="_blank" />')
        .attr('href', FOX_LINK + item.fox)
        .append($('<img src="images/fox.png" />'))
      cardFooter.append(fox)
    }
    if (item.amazon) {
      const amazon = $('<a class="amazon" target="_blank" />')
        .attr('href', AMAZON_LINK + item.amazon)
        .append($('<img src="images/amazon.png" />'))
      cardFooter.append(amazon)
    }
    if (item.youtube) {
      const youtube = $('<a class="youtube_logo" target="_blank" />')
        .attr('href', YOUTUBE_LINK + item.youtube)
        .append($('<img src="images/youtube.png" />'))
      cardFooter.append(youtube)
    }
    card.append(cardFooter)
    cardColumns.append(card)
  }
}

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

// enable tooltips
$('[data-toggle="tooltip"]').tooltip()

// generate content
$(generateVideos(content.video))
$(generateMusic(content.music))
$(generateWord(content.word))
$(generateCinema(content.cinema))
