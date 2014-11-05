$(function() {
  
  $('.-unite-link-to-settings').find('a').prepend('<i class="icon icon-cogs"></i>')
  $('.-unite-link-to-signin').find('a').prepend('<i class="icon icon-signin"></i>')
  $('.-unite-link-to-signout').find('a').prepend('<i class="icon icon-signout"></i>')
  
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