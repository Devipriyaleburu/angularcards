import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../../models/card.model';
import { CardService } from '../../services/card.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];

  constructor(private cardService: CardService, private dialog: MatDialog) {}

  ngOnInit() {
    this.cardService.cards$.subscribe(cards => this.cards = cards);
  }

  editCard(card: Card) {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '400px',
      data: { ...card }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardService.updateCard(result);
      }
    });
  }

  deleteCard(id: number) {
    this.cardService.deleteCard(id);
  }

  addCard() {
    const newCard: Card = { id: 0, title: '', description: '' };
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '400px',
      data: newCard
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const maxId = this.cards.length > 0 ? Math.max(...this.cards.map(c => c.id)) : 0;
        result.id = maxId + 1;
        this.cardService.addCard(result);
      }
    });
  }
}
