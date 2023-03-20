// frontend.js - JavaScript code for the Narrative Engine PoC

// Event listener for user interactions
document.getElementById("submitButton").addEventListener("click", function() {
    let userInput = document.getElementById("userInput").value;
  
    // Send interaction data to backend
    fetch("/store_interaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "submit",
        content: userInput
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  });
  
  // Function to get interactions and generate narrative
  async function generateNarrative() {
    let response = await fetch("/get_interactions");
    let interactions = await response.json();
  
    // Example: Use interactions to generate a narrative
    // In practice, this would involve integrating a trained GPT-based language model
    let narrative = "The user performed the following actions:\n";
    interactions.forEach(interaction => {
      narrative += `${interaction.action} with content: "${interaction.content}"\n`;
    });
  
    document.getElementById("narrative").innerHTML = narrative;
  }
  
  // Example action execution based on user request
  function executeAction(content) {
    document.getElementById("userInput").value = content;
    document.getElementById("submitButton").click();
  }
  