import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, doc, updateDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductMenu } from 'src/app/Interface/product-menu';
import { DataService } from 'src/app/Services/data-service.service';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit {
  pageTitle: string = "Design Menu";
  editPage: boolean = false
  MenuImage: File | any;
  PageButton: string = "Add Menu Item";
  Product: any;

  defaultPageData: any = {
    MenuName: "",
    ItemDetails: "",
    Status: "",
    Price: null,
    MenuType:null,
    id: null,
    Popular:false
  }
  constructor(private fireStore: Firestore,
    private toastr: ToastrService,
    private storage: Storage,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService) {


  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.editPage = params?.['editPage']
    })
    if (this.editPage) {
      this.Product = this.dataService.getEditMenu();
      this.PageButton = "Update Menu Item"
      this.pageTitle = "Modify Menu Item";
      if (!this.Product) {
        this.router.navigate(['./Admin/products/'])
      }
    }else{
      this.Product=this.defaultPageData
    }

  }
  addProduct() {
    const collectionInstance = collection(this.fireStore, "Products");
    addDoc(collectionInstance, this.Product)
      .then(() => {
        this.toastr.success('Data saved successfully');
        this.router.navigate(['./Admin/products/'])
      })
      .catch(err => {
        this.toastr.error("We're sorry, but there was an error processing your request. Please try again later.", err)
      })
  }

  readFile(event: any) {
    this.MenuImage = event.target.files[0]
  }

  async SaveProduct(f: String) {
    if (f) {
      const storageRef = ref(this.storage, `Menu/${this.MenuImage.name}`);

      uploadBytesResumable(storageRef, this.MenuImage).on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, err => {
        this.toastr.error("We're sorry, but there was an error processing your request. Please try again later.")
      }, () => {
        getDownloadURL(storageRef).then(downloadurl => {
          Object.assign(this.Product, { "MenuImageLink": downloadurl });
          this.editPage ? this.updateProduct() : this.addProduct();
        });
      })
    } else {
      this.editPage ? this.updateProduct() : this.addProduct();
    }
  }

  updateProduct() {

    const collectionInstance = doc(this.fireStore, "Products", this.Product.id);

    updateDoc(collectionInstance, this.Product)
      .then(() => {
        this.toastr.success('Data saved successfully');
        this.router.navigate(['./Admin/products/'])
      })
      .catch(err => {
        this.toastr.error("We're sorry, but there was an error processing your request. Please try again later.", err)
      })

  }

}
