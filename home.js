document.addEventListener('DOMContentLoaded', function () {
    var items = document.querySelectorAll('.item');

    items.forEach(function (item) {
        item.addEventListener('click', function () {
            this.classList.toggle('expanded');

            var itemId = this.getAttribute('id');

            if (this.classList.contains('expanded')) {
                this.classList.add('new-content');
            } else {
                this.classList.remove('new-content');
            }
        });
    });
});

function goBack() {
    window.history.back();
}


const notifications = [
    "HKIN 351 Online Today",
    "CMPT 375 Cancelled",
    "Movie Night now in Devries",
];

let currentNotificationIndex = 0;

function showNotification(message) {
    const notificationArea = document.getElementById('notification-area');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    notificationArea.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 15000);
}

function cycleNotifications() {
    showNotification(notifications[currentNotificationIndex]);
    currentNotificationIndex = (currentNotificationIndex + 1) % notifications.length;
}

cycleNotifications();

setInterval(cycleNotifications, 10000);

