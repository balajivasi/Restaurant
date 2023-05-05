import { Component, OnInit } from '@angular/core';
import { Firestore,collection,collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Storage, deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/Services/data-service.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  pageTitle:string="Menu Products";
  Products:any;
  constructor(private fireStore:Firestore,
              private toastr:ToastrService,
              private storage:Storage,
              private router:Router,
              private dataService:DataService){}
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(){
    const collectionInstance = collection(this.fireStore, "Products");
    collectionData(collectionInstance,{idField:'id'}).subscribe(data=>{
      this.Products=data;
    })
  }


  deleteProductItem(id: string,url:string) {
    const collectionInstance = doc(this.fireStore, "Products", id);
    deleteDoc(collectionInstance).then(() => {
      this.toastr.success("data deleted succssfully.")
    }).catch(err => {
      this.toastr.error("We're sorry, but there was an error processing your request. Please try again later.", err)
    })

    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(storage, url);

    // Delete the file
    deleteObject(desertRef).then(() => {
      this.toastr.success("deleted Image succssfully.")
    }).catch(err => {
      this.toastr.error("We're sorry, but there was an error processing your request. Please try again later.", err)
    });
    
  }

  EditMenu(product:any){
    this.dataService.setEditMenu(product);
    this.router.navigate(['./Admin/products/addEdit'],{
      queryParams: { editPage: true }
   })
  }

}
