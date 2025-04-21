import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  imports: [FormsModule,CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
  standalone: true,
})
export class ChatbotComponent {
  messages: { role: 'user' | 'assistant', content: string }[] = [];
  userInput = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Ajouter le message de l'utilisateur dans l'historique
    this.messages.push({ role: 'user', content: this.userInput });

    const prompt = this.userInput;
    this.userInput = '';

    // Envoyer à l'API OpenAI
    this.http.post<any>('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: "Tu es un expert Pokémon nommé Professeur Chen." },
        ...this.messages
      ],
      max_tokens: 100,
      temperature: 0.7
    }, {
      headers: {
       // 'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      }
    }).subscribe((response) => {
      const reply = response.choices[0].message.content;
      this.messages.push({ role: 'assistant', content: reply });
    }, (error) => {
      console.error('Erreur chatbot :', error);
      this.messages.push({
        role: 'assistant',
        content: "😥 Désolé, le serveur est temporairement indisponible. Réessaye dans quelques instants."
      });
    });
  }
}
