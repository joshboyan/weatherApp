/****************

This file is appended to the basic service worker generated when gulp is run

****************/

self.addEventListener('push', function(event) {

  console.info('Event: Push');

  var title = 'Animated Weather';

  var body = {
    'body': event,
    'tag': 'pwa',
    'icon': './images/48x48.png'
  };
  console.log(event);
  event.waitUntil(
    self.registration.showNotification(title, body)
  );
});

self.addEventListener('notificationclick', function(event) {

  var url = './latest.html';

  event.notification.close(); //Close the notification

  // Open the app and navigate to latest.html after clicking the notification
  event.waitUntil(
    clients.openWindow(url)
  );

});