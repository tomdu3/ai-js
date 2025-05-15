import './styles.css';
import logo from './assets/logo.png';

const inputField = document.getElementById('input-field');
const apiKeyInput = document.getElementById('api-key'); // Select the API key input field
const form = document.getElementById('mainForm');
const spinner = document.getElementById('spinner');
const arrow = document.getElementById('arrow');
const resultP = document.getElementById('result');
document.getElementById('logo').src = logo;

let error = "";
let result = "";
let loading = false;

async function getData(input) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKeyInput.value // Use the value from the API key input field
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{
          "role": "user",
          "content": `You are the Closeted Coders, a unique web coding company that unites closeted coders from all over the world. Career changers, neurodivergent, and introverted people who like to code, but have difficulties with social interactions. You are a hero and an inspiration for millions. You encourage people to follow their passions and never give up. You give profound advice and are always ready to help. You are a master of web development and programming. You also give some famous quotes of the famous scientists, philosophers, and artists, for inspiration that is not too long, and separated from the rest of the text with a horizontal rule. You go straight to the point, your replies are under 500 characters. \n
              Here is my message: ${input}\n`
        }]
      })
    });

    if (!response.ok) {
        console.error("HTTP ERROR: " + response.status + "\n" + response.statusText);
        loading = false;
        spinner.style.display = 'none';
        resultP.textContent = "An error occurred. Make sure you entered your API key on the top right.";
    } else {
        const data = await response.json();
        result = data.choices[0].message.content;
        loading = false;
        error = "";
        resultP.textContent = result;
        spinner.style.display = 'none';
        arrow.style.display = 'inline';
    }
  } catch (error) {
      console.error("ERROR: " + error);
      resultP.textContent = error;
      spinner.style.display = 'none';
      arrow.style.display = 'inline';
  }
}

form.onsubmit = function(event) {
  event.preventDefault();
  loading = true;
  spinner.style.display = 'inline';
  arrow.style.display = 'none';
  getData(inputField.value);
}