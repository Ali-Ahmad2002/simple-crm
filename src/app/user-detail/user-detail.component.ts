import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId: any = '';
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');   //paramMap um auf die angeklickte variable Id zuzugreifen 
      console.log('GOT ID', this.userId);
      this.getUser();
    })
  }

  getUser() {
    this.firestore
      .collection('users')
      .doc(this.userId)  //wenn man nur ein element haben will z.B. von den usern dann schreibt man .doc
      .valueChanges()   //wenn man will das sich der wert ändet
      .subscribe((user: any) => {
        this.user = new User(user); //immer wenn sich der wert in der datenbank ändert dann wird der oben definierte user geupdatet
        console.log('Retrieved user', this.user);
      });
  }

}
