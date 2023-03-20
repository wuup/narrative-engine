// JavaScript event tracker
const userActions = [];

// Add an event listener to all clickable elements
document.querySelectorAll('*').forEach(element => {
  element.addEventListener('click', event => {
    userActions.push({
      type: 'click',
      element: event.target.tagName,
      timestamp: new Date().getTime()
    });
  });

  element.addEventListener('keypress', event => {
    userActions.push({
      type: 'keypress',
      element: event.target.tagName,
      key: event.key,
      timestamp: new Date().getTime()
    });
  });
});

// Send the data to the Flask API
function sendDataToAPI() {
  fetch('/api/track_event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userActions)
  });
}
