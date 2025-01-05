document.getElementById('reminder-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const reminderText = document.getElementById('reminder').value;
    const reminderTime = document.getElementById('time').value;
    
    if (reminderText && reminderTime) {
        const reminderItem = document.createElement('li');
        reminderItem.textContent = `Reminder: ${reminderText} at ${reminderTime}`;
        
        // Add a delete button to the reminder
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteReminder(reminderItem);
        };
        reminderItem.appendChild(deleteButton);

        document.getElementById('list').appendChild(reminderItem);

        // Save the reminders to localStorage
        saveRemindersToLocalStorage();
        
        // Set up the reminder to trigger at the given time
        setReminderAlarm(reminderTime, reminderText);

        // Clear the input fields
        document.getElementById('reminder').value = '';
        document.getElementById('time').value = '';
    }
});

function deleteReminder(reminderItem) {
    reminderItem.remove();
    saveRemindersToLocalStorage(); // Update localStorage after deletion
}

function saveRemindersToLocalStorage() {
    const reminders = [];
    const reminderItems = document.querySelectorAll('#list li');
    
    reminderItems.forEach(item => {
        const text = item.textContent.replace(" Delete", "");
        reminders.push(text);
    });
    
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

function loadRemindersFromLocalStorage() {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.forEach(reminderText => {
        const reminderItem = document.createElement('li');
        reminderItem.textContent = reminderText;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteReminder(reminderItem);
        };
        reminderItem.appendChild(deleteButton);

        document.getElementById('list').appendChild(reminderItem);
    });
}

function setReminderAlarm(reminderTime, reminderText) {
    const reminderTimeDate = new Date();
    const [hours, minutes] = reminderTime.split(':');
    reminderTimeDate.setHours(hours);
    reminderTimeDate.setMinutes(minutes);
    reminderTimeDate.setSeconds(0);

    const currentTime = new Date();
    
    // If reminder time has already passed, set it for the next day
    if (reminderTimeDate < currentTime) {
        reminderTimeDate.setDate(reminderTimeDate.getDate() + 1);
    }

    const timeDifference = reminderTimeDate - currentTime;

    setTimeout(() => {
        document.getElementById('reminder-sound').play();
        alert(`Reminder: ${reminderText}\nWould you like to stop the reminder?`);
    }, timeDifference);
}

// Load reminders from localStorage when the page is loaded
window.onload = loadRemindersFromLocalStorage;
