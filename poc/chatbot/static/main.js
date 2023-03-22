// main.js

function createTypingIndicator() {
    let msg = $('<div>').addClass('message bot').attr('id', 'typing-indicator');
    let label = $('<div>').addClass('label bot-label').text('Chatbot');
    let content = $('<div>').text('Chatbot is typing').append($('<span class="dot">.</span>')).append($('<span class="dot">.</span>')).append($('<span class="dot">.</span>'));
    msg.append(label).append(content);
    return msg;
}

function appendMessage(who, text) {
    let msg = $('<div>').addClass('message').addClass(who === 'user' ? 'user' : 'bot');
    let label = $('<div>').addClass('label').addClass(who === 'user' ? 'user-label' : 'bot-label').text(who === 'user' ? 'You' : 'Chatbot');
    
    let content = $('<div>');
    let lines = text.split('\n');
    
    for (let line of lines) {
        let formattedLine = $('<div>');
        let tokens = line.split(' ');
        
        for (let token of tokens) {
            let formattedToken;
            
            if (token.startsWith('```') && token.endsWith('```')) formattedToken = $('<pre>').text(token.substring(3, token.length - 3));
            else if (token.startsWith('**') && token.endsWith('**')) formattedToken = $('<strong>').text(token.substring(2, token.length - 2));
            else if (token.startsWith('*') && token.endsWith('*')) formattedToken = $('<em>').text(token.substring(1, token.length - 1));
            else if (token.startsWith('`') && token.endsWith('`')) formattedToken = $('<code>').text(token.substring(1, token.length - 1));
            else if (token.startsWith('[') && token.indexOf('](') !== -1 && token.endsWith(')')) {
                let link = token.substring(token.indexOf('(') + 1, token.indexOf(')'));
                let linkText = token.substring(1, token.indexOf(']'));
                formattedToken = $('<a>').attr('href', link).attr('target', '_blank').text(linkText);
            }
            else if (token.startsWith('![') && token.indexOf('](') !== -1 && token.endsWith(')')) {
                let link = token.substring(token.indexOf('(') + 1, token.indexOf(')'));
                let linkText = token.substring(2, token.indexOf(']'));
                formattedToken = $('<img>').attr('src', link).attr('alt', linkText);
            }
            else formattedToken = document.createTextNode(token + ' ');
            
            formattedLine.append(formattedToken);
        }
        
        content.append(formattedLine);
    }
    
    msg.append(label).append(content);
    $('#chatbox').append(msg);
    $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
}


function showTypingIndicator() {
    $('#chatbox').append(createTypingIndicator());
    $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
}

function hideTypingIndicator() {
    $('#typing-indicator').remove();
}

$('#submitButton').on('click', function(event) {
    event.preventDefault();
    let userInput = $('#user-input').val();
    appendMessage('user', userInput);
    $('#user-input').val('');
    showTypingIndicator();

    $.post('/message', {input: userInput}, function(data) {
        hideTypingIndicator();
        if (data.response_type === 'error') {
            alert("An error occurred: " + data.response);
        } else {
            appendMessage('bot', data.response);
        }
    });
});

setInterval(function() {
    let visibleDots = 0;
    $('#typing-indicator .dot').each(function() {
        let dot = $(this);
        setTimeout(function() {
            dot.css('opacity', visibleDots < 3 ? '1' : '0');
        }, visibleDots * 500);
        visibleDots = (visibleDots + 1) % 4;
    });
}, 1500);

async function generateNarrative() {
    let response = await fetch("/get_interactions");
    let interactions = await response.json();
    let narrative = "The user performed the following actions:\n";
    interactions.forEach(interaction => {
        if (interaction.type === "click") {
            narrative += `Clicked on ${interaction.element}. ${interaction.details}.\n`;
        } else if (interaction.type === "keypress") {
            narrative += `Pressed key "${interaction.key}" on ${interaction.element}.\n`;
        } else if (interaction.action === "submit") {
            narrative += `Submitted "${interaction.content}"\n`;
        }
    });
    document.getElementById("narrative").innerHTML = narrative;
}

document.addEventListener("click", async function(event) {
    let details = `Clicked on ${event.target.tagName.toLowerCase()}`;
    await fetch("/store_interaction", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            type: "click",
            element: event.target.tagName.toLowerCase(),
            details: details
        })
    });
});

document.addEventListener("keypress", async function(event) {
    await fetch("/store_interaction", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            type: "keypress",
            element: event.target.tagName.toLowerCase(),
            key: event.key
        })
    });
});

document.getElementById("submitButton").addEventListener("click", async function() {
    let userInput = document.getElementById("user-input").value;
    await fetch("/store_interaction", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            action: "submit",
            content: userInput
        })
    });
});

document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("submitButton").click();
    }
});

function executeAction(content) {
    document.getElementById("user-input").value = content;
    document.getElementById("submitButton").click();
}

