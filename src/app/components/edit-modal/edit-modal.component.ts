import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {
  title: string;
  description: string;
  isEdit: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {
    this.isEdit = !!data.id;
    this.title = data.title || '';
    this.description = data.description || '';
  }

  save() {
    if (this.title.trim() && this.description.trim()) {
      this.dialogRef.close({ ...this.data, title: this.title, description: this.description });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
