"use strict";

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const STORAGE_KEY = "questsTree";

function createQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY);
  gCurrQuest = gQuestsTree;
  if (gCurrQuest) return;
  gQuestsTree = createQuest("Male");
  gQuestsTree.yes = createQuest("BiBi");
  gQuestsTree.no = createQuest("Oprah");
  gCurrQuest = gQuestsTree;
  gPrevQuest = null;
  saveToStorage(STORAGE_KEY, gQuestsTree);
}

function createQuest(txt) {
  return {
    txt: txt + "?",
    yes: null,
    no: null,
  };
}

function restartGame(){
    gCurrQuest = gQuestsTree
}

function isChildless(node) {
  return node.yes === null && node.no === null;
}

function moveToNextQuest(res) {
  gPrevQuest = gCurrQuest;
  gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  var newQuest = createQuest(newQuestTxt);
  newQuest.yes = createQuest(newGuessTxt);
  newQuest.no = gPrevQuest[lastRes];
  gPrevQuest[lastRes] = newQuest;
  console.log("gQuestsTree", gQuestsTree);
  saveToStorage(STORAGE_KEY, gQuestsTree);
}

function getCurrQuest() {
  return gCurrQuest;
}
