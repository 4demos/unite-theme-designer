$(function() {
  $('.menu > .menuItem').hover(
    function() { $(this).addClass('hovered'); },
    function() { $(this).removeClass('hovered'); });
});