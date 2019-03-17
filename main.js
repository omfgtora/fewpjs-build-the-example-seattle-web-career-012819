// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const errorModal = document.getElementById('modal')
const errorMessage = errorModal.querySelector('#modal-message')
errorModal.classList.toggle('hidden')

const likeButtons = document.querySelectorAll('.like')

likeButtons.forEach(like => {
  like.addEventListener('click', (evnt) => {
    sendLike(evnt)
  })
})

async function sendLike(evnt) {
  mimicServerCall()
  .then(data => {
    console.log(data)
    displayLike(evnt)
  })
  .catch(err => {
    console.log(err)
    errorModal.classList.toggle('hidden')
    errorMessage.textContent = err
    setTimeout(() => {
      errorModal.classList.toggle('hidden')
      errorMessage.textContent = ''
    }, 5000)
  })
}

function displayLike(evnt) {
  let target = evnt.target
  if (target.classList.contains('like-glyph')) {
      let heart = (target.textContent == EMPTY_HEART) ? FULL_HEART : EMPTY_HEART
      target.textContent = heart
      target = target.parentElement
      target.classList.toggle('activated-heart')
  } else {
      let heartGlyph = target.querySelector('.like-glyph')
      let heart = (heartGlyph.textContent == EMPTY_HEART) ? FULL_HEART : EMPTY_HEART
      heartGlyph.textContent = heart
      target.classList.toggle('activated-heart')
  }
}


//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
