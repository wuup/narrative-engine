// JavaScript for retrieving and displaying user actions
async function getUserActions() {
    const response = await fetch('/api/get_user_actions');
    const userActions = await response.json();
    displayUserActions(userActions);
  }
  
  function displayUserActions(userActions) {
    const actionsList = document.getElementById('actionsList');
  
    userActions.forEach(action => {
      const listItem = document.createElement('li');
      const actionDescription = document.createTextNode(
        `${action.type} on ${action.element} at ${new Date(action.timestamp).toLocaleString()}`
      );
  
      listItem.appendChild(actionDescription);
      actionsList.appendChild(listItem);
    });
  }
  
  // Call the function to get user actions and display them
  getUserActions();
  