function PrerenderManager(aWindow) {
  var manager = {};
  var renderFrame;

  // The only exported function.
  manager.doPrerender = function(href, callback) {
    if (!renderFrame) {
      renderFrame = createRenderFrame(aWindow.document);
    }
    renderFrame.src = href;
    renderFrame.addEventListener('mozbrowserloadend', function() {
      debug('href: ' + href + ' has been prerendered.');
      callback();
    });
  }

  //
  // Private functions
  //

  function createRenderFrame(d) {
    var iframe = d.createElement('iframe');
    iframe.setAttribute('mozbrowser', 'true');
    iframe.style.visibility = 'hidden';
    iframe.style.position   = 'absolute';

    // append iframe to DOM
    d.body.insertBefore(iframe, d.body.firstChild);

    return iframe;
  }

  function debug(s) {
    console.log('PrerenderManager: ' + s);
  }

  return manager;
}
