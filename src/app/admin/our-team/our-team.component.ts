import { Component, OnInit } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytesResumable,getStorage,deleteObject } from '@angular/fire/storage';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AdminTeamDetails } from 'src/app/Interface/team-details';
@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html'
})
export class OurTeamComponent implements OnInit {
  pageTitle: string = "Our Master Chefs";
  OurChefs: any;
  isAddChed: boolean = false;
  TeamProfile: File | any;
  editPage: boolean = false;
  collectionInstance = collection(this.fireStore, "OurTeam");

  formData: AdminTeamDetails | any;

  defaultForm: AdminTeamDetails = {
    "id": "",
    "ChefName": "",
    "Designation": "",
    "Active": true,
    "ChefImageLink": "",
    "social": [
      {
        "network": "Facebook",
        "status": false,
        "url": ""
      },
      {
        "network": "Twitter",
        "status": false,
        "url": ""
      },
      {
        "network": "Instagram",
        "status": false,
        "url": ""
      },
      {
        "network": "Youtube",
        "status": false,
        "url": ""
      }
    ]
  }


  constructor(private fireStore: Firestore,
    private toastr: ToastrService,
    private storage: Storage) { }

  ngOnInit(): void {
    this.loadOurChefs()
  }

  AddChef() {
    this.isAddChed = true;
    this.formData = this.defaultForm;
    this.pageTitle = "Add Chef";
  }
  btnCancel() {
    this.pageTitle = "Our Master Chefs";
    this.isAddChed = false;
    this.formData = null;
  }
  readFile(event: any) {
    this.TeamProfile = event.target.files[0]
  }
  async SaveChef(f: any) {
    if (f) {
      const storageRef = ref(this.storage, `Team/${this.TeamProfile.name}`);

      uploadBytesResumable(storageRef, this.TeamProfile).on('state_changed', (snapshot) => {
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
          Object.assign(this.formData, { "ChefImageLink": downloadurl });
          (this.editPage != true) ? this.addChef() : this.updateTeam();
        });
      })
    } else {
      (this.editPage != true) ? this.addChef() : this.updateTeam();
    }
  }

  addChef() {
    addDoc(this.collectionInstance, this.formData)
      .then(() => {
        this.toastr.success('Data saved successfully.');
        this.isAddChed = !this.isAddChed;
      })
      .catch(err => {
        this.toastr.error("We're sorry, but there was an error processing your request. Please try again later.", err)
      })
  }

  loadOurChefs() {
    collectionData(this.collectionInstance, { idField: 'id' }).subscribe(data => {
      this.OurChefs = data;
    })
  }

  deleteChef(id: string,url:string) {
    const collectionInstance = doc(this.fireStore, "OurTeam", id);
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


  editTeam(chef: any) {
    this.formData = chef;
    this.isAddChed = true;
    this.editPage = true;
    this.pageTitle = "Edit Chef"
  }

  updateTeam() {
    this.isAddChed = false;
    this.editPage = false;
    this.pageTitle = "Our Master Chefs"
    const collectionInstance = doc(this.fireStore, "OurTeam", this.formData.id);
    updateDoc(collectionInstance, this.formData)
      .then(() => {
        this.toastr.success("data Updated succssfully.")
      }).catch(err => {
        this.toastr.error("We're sorry, but there was an error processing your request. Please try again later.", err)
      })
  }

}
