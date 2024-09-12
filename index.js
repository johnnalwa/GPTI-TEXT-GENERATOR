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