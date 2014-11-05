$(document).ready(function(){
  
  $currentList = $('.current-list');
  if($currentList.length == 0) {
    $menuItem = $('.current').closest('.menuItem');
    $menuItem.addClass('current-list');
    $menuItem.find('.subMenu').addClass('current-sub-menu');
  }
  
});