import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent {
  PageName: string = "Contact Us";
  ContactDetails: string = "Contact For Any Query";
  constructor(private fireStore: Firestore,
    private toastr: ToastrService) { }
  submitContactUs(f: any) {
    const collectionInstance = collection(this.fireStore, "ContactUS")
    const data = Object.assign(f, { "created_date": Date.now() })
    addDoc(collectionInstance, data).then(data => {
      this.toastr.success('Thank you for reaching out to us! We have received your message and will get back to you as soon as possible. We appreciate your interest in our SRI PADMAVATHI FOODS, and look forward to the opportunity to connect with you.');
    }).catch(err => {
      this.toastr.error("We're sorry, but there was an error processing your request. Please try again later.", err)
    })

  }
}
