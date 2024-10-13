/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/

// Scripts
function loadAllData(characters) {
  const $allCharacters = $('#all-characters');
  $allCharacters.empty();

  if (!characters.length) {
    $allCharacters.html('<div class="w-100">No match found!</div>');
    return;
  }

  characters.forEach(character => {
    $allCharacters.append(`
      <div class="col">
        <div class="card h-100">
          <img data-img="${character.image}" src="${character.image}" class="card-img-top" style="
              object-fit: contain;
              width: auto;
              height: 300px;
              background-color: black;
          " alt="..." /> 
          <div class="card-body">
            <h5 class="card-title">${character.title}</h5>
            <p class="card-text">${character.description}</p>
          </div>
        </div>
      </div>
    `);
  });

  const len = characters.length;
  const breakpoints = len > 2 ? 'row-cols-lg-3 row-cols-md-2' : 
                     len < 3 ? 'row-cols-md-1' : 'row-cols-md-2';
  $allCharacters.attr('class', `row ${breakpoints}`);

  const bp = BiggerPicture({ target: document.body, noPinch: true });
  const sScale = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 1 : 0.5;

  $('#all-characters img').off('click').on('click', function (e) {
    e.preventDefault();
    bp.open({ items: e.target, scale: sScale });
  });
}

$('#SearchTxt').on('keyup', function() {
  const str = $(this).val();
  const regex = new RegExp(`.*${str}.*`, 'i');
  const found = ALL_CHARACTERS.filter(character => regex.test(character.title) || regex.test(character.description));
  loadAllData(found);
});

window.addEventListener('DOMContentLoaded', () => {
  loadAllData(ALL_CHARACTERS);

  const navbarShrink = () => {
    const $navbar = $('#mainNav');
    $navbar.toggleClass('navbar-shrink', window.scrollY !== 0);
  };

  navbarShrink();
  $(document).on('scroll', navbarShrink);

  const $mainNav = $('#mainNav');
  if ($mainNav.length) {
    new bootstrap.ScrollSpy(document.body, { target: '#mainNav', offset: 72 });
  }

  $('.navbar-toggler').on('click', () => {
    if ($('.navbar-toggler').is(':visible')) {
      $('.navbar-toggler').click();
    }
  });
});

// Dark mode
const checkbox = document.getElementById("ChangeTheme");

function checkTheme() {
  const isDark = sessionStorage.getItem("mode") === "dark";
  setBulb(!isDark);
  isDark ? darkmode() : nodark();
}

checkbox.addEventListener("change", function() {
  if (this.checked) {
    setBulb(false);
    darkmode();
  } else {
    setBulb(true);
    nodark();
  }
});

$('#lightbulb').on('click', () => $('#ChangeTheme').click());

function setBulb(isActive) {
  const $lightbulb = $('#lightbulb');
  const text = isActive ? 'Light Mode' : 'Dark Mode';
  const backgroundColor = isActive ? '#2c3e50' : '#fff';
  const imgUrl = isActive ? 
    'url("data:image/svg+xml,%3Csvg...")' : 
    'url("data:image/svg+xml,%3Csvg...")';

  $lightbulb.next().text(text);
  $('.divider-custom-line').css('background-color', backgroundColor);
  $('.divider-custom-icon').css('color', backgroundColor);
  $lightbulb.css('background-image', imgUrl);
}

// Initial check for theme
checkTheme();
