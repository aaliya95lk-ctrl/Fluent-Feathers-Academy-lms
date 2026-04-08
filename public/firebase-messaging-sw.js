self.addEventListener('push', event => {
  if (!event.data) return;
  let data = {};
  try {
    data = event.data.json();
  } catch (err) {
    data = { body: event.data.text() };
  }

  const payload = (data && typeof data.data === 'object' && data.data) ? data.data : data;
  const title = (data.notification && data.notification.title) || payload.title || data.title || 'Fluent Feathers Academy';
  const options = {
    body: (data.notification && data.notification.body) || payload.body || data.body || '',
    icon: (data.notification && data.notification.icon) || '/app-icon.png',
    badge: (data.notification && data.notification.badge) || '/app-icon.png',
    data: (data.notification && data.notification.data) || payload || {}
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const data = event.notification.data || {};
  const clickAction = data.click_action || data.url || data.link;
  const url = clickAction || '/';
  event.waitUntil(clients.openWindow(url));
});
