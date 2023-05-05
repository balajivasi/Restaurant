import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DateDiffPipe } from 'src/app/pipe/DateDiffPipe.Pipe';

@Component({
  selector: 'app-customer-contact',
  templateUrl: './customer-contact.component.html'
})
export class CustomerContactComponent implements OnInit {
  pageTitle: string = "Customer requested to conatct";
  customerConatcts: any;
  constructor(private fireStore: Firestore) {

  }
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    const docRef = collection(this.fireStore, "ContactUS");
    collectionData(docRef, { idField: 'id' }).subscribe(data => {
      this.customerConatcts = data;
    })

  }


}
