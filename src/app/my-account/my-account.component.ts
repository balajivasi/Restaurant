import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data-service.service';
import { getAuth } from '@angular/fire/auth';
import { profileAddress } from '../Interface/profileAddress';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from '../Interface/user-profile';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html'
})
export class MyAccountComponent implements OnInit {
  PageName: string = "Account";
  UId: any;
  userAddress: profileAddress = {
    Name: ""
  };
  userProfile: UserProfile |any;
  isEdit: boolean = false;
  isAddAddress: boolean = false;
  constructor(private dataService: DataService,
    private toastr: ToastrService,
    private fireStore: Firestore) {
    this.UId = this.dataService.uId;
  }
  defaultForm: any = {
    Name: "",
    mobNumber: null,
    address: "",
    address2: "",
    city: "Tirupathi",
    state: "Andhra Pradesh",
    pincode: "",
    id: ""
  }

  ngOnInit(): void {
    this.GetProfile();
  }

  GetProfile() {
    const collectionInstance = doc(this.fireStore, "users", this.UId);
    getDoc(collectionInstance).then(user => {
      this.userProfile = Object.assign({}, user.data());
      sessionStorage.setItem('UserType', this.userProfile.userType);
      this.dataService.setUserType(this.userProfile.userType);

      const addressInstance = collection(this.fireStore, `users/${this.UId}/address`);
      collectionData(addressInstance, { idField: 'id' }).subscribe(addressData => {
        this.userProfile = Object.assign(this.userProfile, { "address": addressData })
      })

    }).catch(err => {
      console.log(err)
    })
  }

  editAddress() {
    this.isEdit = !this.isEdit;
    this.isAddAddress = !this.isAddAddress;
  }
  showAdd() {
    this.isAddAddress = true;
    Object.assign(this.userAddress, this.defaultForm)
  }

  deleteAddress(Id: string) {
    const collectionInstance = doc(this.fireStore, `users/${this.UId}/address`, Id);
    deleteDoc(collectionInstance).then(d => {
      this.toastr.success("Address deleted succssfully.")
    }).catch(err => {
      this.toastr.error('Something went wrong. Please try again,', err.message)
    })

  }
  submitAddress() {
    if (!this.isEdit) {
      const docRef = collection(this.fireStore, `users/${this.UId}/address`);
      delete this.userAddress.id
      addDoc(docRef, this.userAddress).then(data => {
        this.toastr.success("Success! Your address has been added to our system. Thank you for keeping your information up-to-date. If you have any questions or concerns, please don't hesitate to contact us.");
        this.isAddAddress = !this.isAddAddress
      }).catch(err => {
        this.toastr.error('Something went wrong. Please try again,', err.message)
      })
    } else {
      const ID = this.userAddress?.id;
      const docRef = doc(this.fireStore, `users/${this.UId}/address/${ID}`);
      this.editAddress()
      delete this.userAddress.id
      updateDoc(docRef, { ...this.userAddress });

    }
  }
}
