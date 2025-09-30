'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved on a left click in the document');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    } else if (e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve(
        `Third promise was resolved only after both left and right clicks happened`,
      );
    }
  });
});

function funcSuccess(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = message;

  document.body.appendChild(div);
}

function funcError(error) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = error.message;

  document.body.appendChild(div);
}

firstPromise.then(funcSuccess).catch(funcError);
secondPromise.then(funcSuccess);
thirdPromise.then(funcSuccess).catch(funcError);
