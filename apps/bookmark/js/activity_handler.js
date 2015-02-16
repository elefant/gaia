'use strict';

var gPrerenderManager = PrerenderManager(window);

/* global utils, BookmarkEditor, BookmarkRemover */
var ActivityHandler = {
  'save-bookmark': function ah_save(activity) {
    BookmarkEditor.init({
      data: activity.source.data,
      onsaved: function onsaved(saved) {
        window.addEventListener('status-hidden', function hidden() {
          window.removeEventListener('status-hidden', hidden);
          activity.postResult(saved ? 'saved' : 'updated');
        });

        gPrerenderManager.doPrerender(this.data.url, function() {
          utils.status.show(
            navigator.mozL10n.get(saved ? 'added-to-home-screen-message' :
                                          'updated-bookmark'));
        });

      },
      oncancelled: function oncancelled() {
        activity.postError('cancelled');
      }
    });
  },

  'remove-bookmark': function ah_remove(activity) {
    BookmarkRemover.init({
      id: activity.source.data.url,
      onremoved: function onremoved() {
        activity.postResult('removed');
      },
      oncancelled: function oncancelled(e) {
        activity.postError(e);
      }
    });
  }
};

navigator.mozSetMessageHandler('activity', function onActivity(activity) {
  var name = activity.source.name;
  switch (name) {
    case 'save-bookmark':
    case 'remove-bookmark':
      if (activity.source.data.type === 'url') {
        ActivityHandler[name](activity);
      } else {
        activity.postError('type not supported');
      }

      break;

    default:
      activity.postError('name not supported');
  }
});

/*
function debug(s) {
  console.log('Bookmark: ' + s);
}

var gPrerederFrame = null;

function doPrerender(href, callback) {
  debug('doPrerender: ' + href);

  if (!gPrerederFrame) {
    debug('createPrerenderFrame');
    gPrerederFrame = createPrerenderFrame(window.document);
  }

  gPrerederFrame.src = href;
  gPrerederFrame.addEventListener('mozbrowserloadend', function() {
    debug('href: ' + href + ' has been prerendered.');
    callback();
  });

  gPrerederFrame.addEventListener('mozbrowserlocationchange', function() {
    debug('href: ' + href + ' location change.');
    callback();
  });
}

function createPrerenderFrame(d) {
  var iframe = d.createElement('iframe');
  iframe.setAttribute('mozbrowser', 'true');
  iframe.style.visibility = 'hidden';
  iframe.style.position   = 'absolute';

  // append iframe to DOM
  d.body.insertBefore(iframe, d.body.firstChild);

  return iframe;
}
*/