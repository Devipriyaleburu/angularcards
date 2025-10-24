import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({ providedIn: 'root' })
export class CardService {
  private cards = new BehaviorSubject<Card[]>([]);
  cards$ = this.cards.asObservable();

  constructor(private http: HttpClient) {
    this.loadCards();
  }

  loadCards() {
    this.http.get<Card[]>('assets/cards.json').subscribe((data) => {
      this.cards.next(data);
    });
  }

  updateCard(updatedCard: Card) {
    const updatedList = this.cards.value.map(card =>
      card.id === updatedCard.id ? updatedCard : card
    );
    this.cards.next(updatedList);
  }

  addCard(newCard: Card) {
    this.cards.next([...this.cards.value, newCard]);
  }

  deleteCard(id: number) {
    this.cards.next(this.cards.value.filter(card => card.id !== id));
  }
}
