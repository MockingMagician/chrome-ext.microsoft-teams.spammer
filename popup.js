document.addEventListener('DOMContentLoaded', function() {
    let form = document.getElementById('form-spam');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let activeTab = tabs[0];
            console.log(form, form['repeat_number'].value, form['delay'].value, form['message'].value);
            chrome.tabs.sendMessage(activeTab.id, {
                "action": "spam",
                "retryTime": form['repeat_number'].value,
                "delay": form['delay'].value,
                "message": form['message'].value
            });
        });
    }, false);
}, false);