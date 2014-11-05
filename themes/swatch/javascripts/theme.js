$(function() {
  $('.menu-item-category').parent('.menu-item').mouseenter(function() {
    original = $('.current-list');
    currentSubMenu = $('.sub-menu:visible')
    currentSubMenu.removeClass('current-sub-menu')
    $(this).addClass('current-list');
    selected = $(this).find('.sub-menu');
    selected.addClass('current-sub-menu');
  }).mouseleave(function() {
    selected.removeClass('current-sub-menu');
    currentSubMenu.addClass('current-sub-menu');
    $(this).removeClass('current-list');
    original.addClass('current-list');
  })
});