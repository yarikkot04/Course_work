/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
import { changeUserPropertyInLS } from './forms.js';
import { page } from './data_base/page.js';
import { films } from './data_base/films_base.js';
import { series } from './data_base/series_base.js';
import { popup } from './modal_window.js';

const filmContainers = document.querySelectorAll('.film-div');

function addEventListeners() {
  for (const filmContainer of filmContainers) {
    filmContainer.addEventListener('click', func);
  }
}

export function addFilmToUserInLS(name, property, film) {
  const user = JSON.parse(localStorage.getItem(name));
  let arr = user[property];

  if (typeof(user[property]) !== 'object') arr = JSON.parse(user[property]);

  for (const elem of arr) {
    if (elem === film) {
      popup('Этот фильм уже в избранном');
      return;
    }
  }

  arr.push(film);
  changeUserPropertyInLS(name, property, JSON.stringify(arr));
}

function parseLink(str) {
  const arr = str.split('/');
  return `/img/films/${arr[arr.length - 1]}`;
}

function func(event) {
  if (event.srcElement.localName === 'button') {
    const filmId = parseInt(event.target.id, 10);
    for (const film of films) {
      if (film.id === filmId) {
        addFilmToUserInLS(page.user.name, 'chosens', film.name);
        page.user.chosens.push(film.name);
        return;
      }
    }
    for (const serial of series) {
      if (serial.id === filmId) {
        addFilmToUserInLS(page.user.name, 'chosens', serial.name);
        page.user.chosens.push(serial.name);
      }
    }
  }
  if (event.srcElement.localName === 'img') {
    const link = parseLink(event.target.src);
    for (const film of films) {
      if (film.img === link) {
        localStorage.setItem(film.name, JSON.stringify(film));
      }
    }
    window.location.href = '/html/film_page.html';
  }
}

addEventListeners();
