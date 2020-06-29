import { Player } from './src/index.js'

const pixelRenderer = document.getElementById('pixel-renderer')

const player = Player()

document.addEventListener("DOMContentLoaded", () => {
  player.init(pixelRenderer)
  player.setWidth(Math.floor(window.innerWidth / 6))
  player.setHeight(Math.floor(window.innerHeight / 7.6))
});

window.addEventListener('resize', () => {
  player.setWidth(Math.floor(window.innerWidth / 6))
  player.setHeight(Math.floor(window.innerHeight / 7.6))
})

// Required for FF.   Show the copy icon when dragging over.  Seems to only work for chrome.
pixelRenderer.addEventListener('dragover', function (e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
});

// Get file data on drop
pixelRenderer.addEventListener('drop', function (e) {
  e.stopPropagation();
  e.preventDefault();
  // get first file
  var file = e.dataTransfer.files[0]; // Array of all files
  // check if player can play file
  if (player.video.canPlayType(file.type) === '') return alert(`Can't play filetype: ${file.type}`)
  // create object URL that points to file
  const fileUrl = URL.createObjectURL(file)
  player.setSourceMedia(fileUrl)
});