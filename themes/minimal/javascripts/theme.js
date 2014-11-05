function getWindowHeight() {
  if(typeof(window.innerHeight) == 'number') {
    return window.innerHeight;
  } else if(document.documentElement && document.documentElement.clientHeight) {
    return document.documentElement.clientHeight;
  } else if(document.body && document.body.clientHeight) {
    return document.body.clientHeight;
  }
  return 0;
}

function setFooter() {
  if(document.getElementById) {
    var windowHeight = getWindowHeight();
    if(windowHeight > 0) {
      var container = document.getElementById('container'),
          bodyPadding = container.offsetTop,
          footerHeight = document.getElementById('footer-wrap').offsetHeight,
          containerPadding = 31,
          containerHeight = windowHeight - (bodyPadding + containerPadding + footerHeight);
      Unite.debug([bodyPadding, containerPadding, footerHeight]);
      container.style['min-height'] = containerHeight + 'px';
    }
  }
}

window.onload = function() { setFooter(); }
window.onresize = function() { setFooter(); }
