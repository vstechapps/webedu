import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.less']
})
export class ConnectComponent implements OnInit {

  chat:boolean=false;
  
  chatLog = document.getElementById('chat-log');
  inputField = document.getElementById('input-field');
  submitButton = document.getElementById('submit-button');
  input="";

  constructor(){
    
  }

  ngOnInit(): void {
    this.chatLog = document.getElementById('chat-log');
    this.inputField = document.getElementById('input-field');
    this.submitButton = document.getElementById('submit-button');
    var a = this;
    if(this.inputField){
      this.inputField.addEventListener('keydown', function(event) {
        if (event.code === 'Enter') {
          event.preventDefault(); // Prevent form submission
          a.send();
        }
      });
    }
    
  }

  send() {
    let userInput = this.input;
    if (userInput.trim() !== '') {
      let botResponse = this.getBotResponse(userInput.toLowerCase());
      this.addMessage('user', userInput);
      this.input='';
      this.addMessage('bot', botResponse);
    }
  }
  
  addMessage(sender:string, message:string) {
    let messageContainer = document.createElement('div');
    messageContainer.classList.add(`${sender}-message`);
    messageContainer.innerHTML = message;
    if(this.chatLog){
      this.chatLog.appendChild(messageContainer);
      this.chatLog.scrollTop = this.chatLog.scrollHeight;

    }
    if(sender=='bot'){
      messageContainer.classList.add(`show`);
    }
    
  }
  
  getBotResponse(input:string) {
    switch(true) {
      case input.includes('hello'):
        return 'Hello, how can I help you today?';
      case input.includes('how are you'):
        return 'I am doing well, thank you for asking!';
      case input.includes('chatbot'):
        return 'Yes, I am a chatbot! How can I assist you?';
      case input.includes('help'):
        return 'Sure, what do you need help with?';
      default:
        return 'I am sorry, I do not understand. Can you please rephrase your question?';
    }
  }

}
