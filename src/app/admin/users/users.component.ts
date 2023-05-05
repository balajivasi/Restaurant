import { Component, OnInit } from '@angular/core';
import { Firestore,collectionData, collection, collectionGroup, doc, getDoc, updateDoc } from '@angular/fire/firestore';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  pageTitle:string="Register Users"
  userData:any;
  UserProfile:any={
    userType:'',
    Notes:"",
    Employee:{
      Salary:0,
      Workday:0,
      Experience:0
    }
  };
  isEdit:boolean=false
  constructor(private fireStore:Firestore){

  }
  ngOnInit(): void {
    this.getdata();
  }
  getdata(){
    const collectionInstance = collection(this.fireStore, "users");
    collectionData(collectionInstance,{idField:'id'}).subscribe(data=>{
      this.userData = data
    })

  }
  EditProfile(f:any){
    this.isEdit=true
    this.UserProfile=Object.assign(this.UserProfile,{...f})
  }
  saveProfile(){
    console.log(this.UserProfile);
    const docRef=doc(this.fireStore,'users',this.UserProfile.id);

    updateDoc(docRef,this.UserProfile).then(d=>{
      console.log(d);
      this.isEdit=false
    })

  }
}
