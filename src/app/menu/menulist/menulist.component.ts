import { Component, Input, OnInit } from '@angular/core';
import { Firestore, collection, collectionData,query,where } from '@angular/fire/firestore';
import { Products } from 'src/app/Interface/products';

@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.component.html'
})
export class MenulistComponent implements OnInit {

  @Input() popular:boolean=false;
  @Input() menuItems:string|undefined;

  Products:Products|any;
  constructor(private fireStore:Firestore){}
  ngOnInit(): void {
    this.loadProductMenu()
  }

  loadProductMenu(){
    const q = this.popular ? query(collection(this.fireStore, "Products"), where("Popular", "==", true)) :query(collection(this.fireStore, "Products"), where("MenuType", "==", this.menuItems));
    collectionData(q,{idField:'id'}).subscribe(data=>{
      this.Products=data;
    })
  }
  
  ngOnChanges() {
    this.loadProductMenu()
  }
  
}
