import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss']
})
export class DialogUserComponent implements OnInit {

  user = new User()
  birthDate!: Date;
  loading = false;

  constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<DialogUserComponent>) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is:', this.user);
    this.loading = true;
    this.firestore.collection('users')
      .add(this.user.toJSON())
      .then((result: any) => {
        this.loading = false;
        this.dialogRef.close();
        console.log('Adding user finished', result);
      })
  }

}
