# Simple Command-Line Chatbot using GPT Model

This project implements a simple command-line chatbot using the GPT model. It initializes a readline interface for user input, maintains a conversation history, and sends user queries to the GPT API. The assistant's responses are displayed in the console, and the conversation continues until the user types 'exit'.

## Installation

To run this chatbot, you need to have Node.js installed on your system. Follow these steps to set up the project:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run the following command to install the required packages:


npm install


## Usage

To start the chatbot, run the following command in your terminal:


node index.js


Once the chatbot is running, you can start interacting with it by typing your messages. To exit the conversation, simply type 'exit'.

## Dependencies

This project relies on the following npm packages:

- readline: For handling user input from the command line.
- gpti: For interacting with the GPT API.

Make sure these dependencies are properly installed before running the chatbot.

## Code Overview


const { gpt } = require("gpti");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let history = [
    {
        "role": "assistant",
        "content": "Hello! How can I assist you today?"
    }
];

function askQuestion() {
    rl.question('You: ', (userInput) => {
        if (userInput.toLowerCase() === 'exit') {
            rl.close();
            return;
        }

        history.push({ "role": "user", "content": userInput });

        gpt.v2({
            messages: history,
            markdown: false,
            stream: false
        }, (err, data) => {
            if (err != null) {
                console.log('Error:', err);
            } else {
                if (data && data.gpt) {
                    console.log('Assistant:', data.gpt);
                    history.push({ "role": "assistant", "content": data.gpt });
                } else {
                    console.log('Unexpected API response format:', JSON.stringify(data, null, 2));
                }
            }
            askQuestion();
        });
    });
}

console.log("Welcome! Type your questions and I'll answer them. Type 'exit' to end the conversation.");
askQuestion();


This code sets up a simple command-line interface for interacting with the GPT model. It uses the `readline` module to handle user input and the `gpti` package to communicate with the GPT API.

Happy chatting!
