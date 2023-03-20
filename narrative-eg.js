function sendTweetOnBehalfOfUser(message) {
    // Find the tweet input box and send tweet button elements
    const tweetInputBox = document.querySelector('.tweet-input-box');
    const sendTweetButton = document.querySelector('.send-tweet-button');
  
    // Simulate a click on the tweet input box
    tweetInputBox.click();
  
    // Set the input box value to the desired message
    tweetInputBox.value = message;
  
    // Simulate a click on the send tweet button
    sendTweetButton.click();
  }
  
  // Call the function with the requested message
  sendTweetOnBehalfOfUser("Bananas are healthy");
  