self.addEventListener('push', event => {
  if (!event.data) return;
  let data = {};
  try {
    data = event.data.json();
  } catch (err) {
    data = { body: event.data.text() };
  }

  const title = (data.notification && data.notification.title) || data.title || 'Fluent Feathers Academy';
  const options = {
    body: (data.notification && data.notification.body) || data.body || '',
    icon: (data.notification && data.notification.icon) || '/app-icon.png',
    badge: (data.notification && data.notification.badge) || '/app-icon.png',
    data: (data.notification && data.notification.data) || data.data || {}
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const clickAction = event.notification.data && event.notification.data.click_action;
  const url = clickAction || '/';
  event.waitUntil(clients.openWindow(url));
});
