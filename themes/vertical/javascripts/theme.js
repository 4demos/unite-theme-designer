$(function() {
  
  if(!$.browser.mobile) {
    $('body').on('click', 'a[href^="tel:"]', function(){
      $(this).attr('href', $(this).attr('href').replace(/^tel:/, 'callto:'));
    });
  }
  
});