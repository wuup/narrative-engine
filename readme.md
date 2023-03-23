Narrative Engine - An AI-Powered Interactive Guide for Web Applications

## Introduction
The Narrative Engine is a novel approach to enhancing the user experience within web applications by providing AI-generated guidance and assistance. The primary motivation behind this project is to simplify the learning curve for new users, support users with complex tasks, and cater to users with accessibility needs. The system leverages artificial intelligence to generate user-friendly narratives based on user interactions, answer user questions, and perform tasks on behalf of the user.

## Objective
To develop a Narrative Engine that uses artificial intelligence to generate user-friendly narratives and provide guidance for users of web applications, while also offering the capability to perform tasks on behalf of the user upon request.

## Use Cases
1. Onboarding new users to a web application by providing step-by-step guidance on using its features.
2. Assisting users in performing complex tasks by generating clear and concise instructions.
3. Supporting users with accessibility needs by offering alternative ways of interacting with the web application.

## Technology Stack
1. **Frontend:** JavaScript for implementing event listeners and tracking user interactions, as well as executing actions on behalf of the user.
2. **Backend:** Python Flask for creating a backend API to receive data from the frontend and store it in a MongoDB database.
3. **Database:** MongoDB as the data storage solution for storing user interaction data.
4. **AI Model:** A GPT-based language model for generating narratives and processing user requests.

## Capabilities
1. Collects data on user actions within a web application, including clicks, keystrokes, and other interactions.
2. Generates user-friendly narratives based on the collected data to provide guidance on how to perform tasks within the application.
3. Integrates a GPT-based language model to understand user requests, such as asking for instructions or performing a specific action.
4. Performs actions on behalf of the user, as requested, by simulating interactions with the web application.

## How it works
1. **Data Collection:** Implement JavaScript event listeners to track user actions within the web application, such as mouse clicks and keystrokes. This data is sent to a backend API, built using Python Flask, and stored in a MongoDB database.
2. **Narrative Generation:** Based on the collected data, a narrative is generated to explain the user's actions and provide guidance on how to perform specific tasks within the application. A GPT-based language model can be used to enhance the narrative, making it more user-friendly and informative.
3. **User Request Processing:** The GPT-based language model is also used to process user requests. The model identifies the desired action and any associated data from the user's request, such as sending a tweet with specific content.
4. **Action Execution:** The Narrative Engine uses custom JavaScript functions to perform actions on behalf of the user, as requested. These functions simulate user interactions with the web application to complete tasks, such as sending a tweet or composing a new message.

## Potential Challenges and Limitations
1. The accuracy of the GPT-based language model in understanding user requests may vary, requiring ongoing training and maintenance.
2. The scope of tasks the Narrative Engine can perform may be limited by the complexity of the web application and the user's requirements.
3. Ensuring that user data is collected, stored, and processed securely and in compliance with relevant privacy regulations may pose challenges.


## Proof of Concept

### Objective
To demonstrate the feasibility and effectiveness of the Narrative Engine by developing a simplified version that focuses on a single function within a web application. This function should meet the criteria of variable input, a small number of actions, and be suitable for ID/description insertion and one-time replay.

### Targeted Function: Sample Web Application Task
For this PoC, we will focus on the process of performing a specific task within a web application, such as composing and sending a message, posting a comment, or creating an event. This function should involve variable input (user-generated content), a small number of actions (composing and submitting the content), and be suitable for ID/description insertion and one-time replay.

### Implementation Steps
1. **Data Collection:** Add event listeners and unique IDs/descriptions to the relevant elements in the web application, such as input fields and submission buttons. Use JavaScript to track user interactions with these elements and send the collected data to the backend.

2. **Backend and Database Integration:** Create a Python Flask backend API to receive the data from the frontend and store it in a MongoDB database.

3. **AI Model Training and Integration:** Train a GPT-based language model with the collected data to generate narratives and process user requests related to the targeted function.

4. **Narrative Generation and Display:** Retrieve the data from the backend and use the trained AI model to generate a narrative explaining the steps taken by the user to perform the task. Display this narrative to the user.

5. **User Request Processing and Action Execution:** Allow users to input requests related to the targeted function (e.g., "Perform this task with new content"). Process the user request using the AI model, and use JavaScript to execute the requested action on behalf of the user.

By successfully implementing these steps for a single, simplified function within a web application, the PoC will demonstrate the viability of the Narrative Engine concept and provide valuable insights for scaling the system to handle more complex tasks and additional functions.
