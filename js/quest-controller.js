'use strict';

var gLastRes = null;
var forGit;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.win-modal button').click(startOver);

function init() {
  console.log('Started...');
  createQuestsTree();
  console.log(getCurrQuest());
}

function onStartGuessing() {
  $('.game-start').hide()
  $('.quest').show()
  renderQuest();
}

function renderQuest() {
  $('.quest h2').text(getCurrQuest().txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') { // win-game over
      gameOver()
    } else { // lose - try again
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  $('#newGuess').val('')
  $('#newQuest').val('')
  addGuess(newQuest, newGuess, gLastRes)
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
  restartGame()
}

function startOver(){
  $('.win-modal').hide();
  $('.game-start').show();
  gLastRes = null;
  restartGame()
}

function gameOver(){
  console.log('Yes, I knew it!');
  $('.win-modal').css('display', 'flex');
  $('.quest').hide()
  // TODO: improve UX
  // stop game
}
