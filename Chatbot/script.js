const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

const fitnessTips = [
    "Try to exercise for at least 30 minutes a day.",
    "Incorporate both cardio and strength training into your routine.",
    "Stay hydrated! Drink plenty of water before, during, and after workouts."
];

const cookingTips = [
    "Use fresh ingredients for better flavor.",
    "Prepare meals in advance to save time during the week.",
    "Experiment with herbs and spices to enhance your dishes."
];

function appendMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message");
    messageElement.classList.add(sender === 'user' ? "user-message" : "bot-message");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; 
}

function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes("workout") || lowerCaseMessage.includes("exercise")) {
        return fitnessTips[Math.floor(Math.random() * fitnessTips.length)];
    } else if (lowerCaseMessage.includes("recipe") || lowerCaseMessage.includes("cook")) {
        return cookingTips[Math.floor(Math.random() * cookingTips.length)];
    } else if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
        return "Hello! How can I assist you today?";
    } else {
        return "I'm sorry, I don't understand that. Can you ask about fitness or cooking tips?";
    }
}

sendButton.addEventListener("click", () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        appendMessage(userMessage, 'user');
        const botResponse = getBotResponse(userMessage);
        appendMessage(botResponse, 'bot');
        userInput.value = ""; 
    }
});


userInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

