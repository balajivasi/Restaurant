import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile,sendPasswordResetEmail, updatePhoneNumber } from '@angular/fire/auth'
import { CollectionReference, Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../Services/data-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {


  PageName: string = "Sign In";
  reSendVerify:boolean=false;

  tempuser:any;
  isforgotPassword:boolean=false;

  showPage={
    isLogin:true,
    isSignUp:false,
    isforgotPassword:false
  }

  constructor(private auth: Auth,
    private AuthSerice:AuthService,
    private fireStore: Firestore,
    private toastr: ToastrService,
    private dataService:DataService,
    private router:Router) { }


  ngOnInit(): void {

  }

 async ReSendVerify(){
    if (this.tempuser != null){
      sendEmailVerification(this.tempuser);
      this.toastr.success("Congratulations, your account has been created! Please check your email and click the verification link to complete your registration.");
      this.reSendVerify=false;
    }
  }
  async myAccount(f: any) {
    if (this.showPage.isLogin) {
      // Login Page start
      signInWithEmailAndPassword(this.auth, f.email, f.password).then(userData => {
        
        if(userData.user.emailVerified){
          this.toastr.success("Congratulations, you logged in to your account.");
          sessionStorage.setItem('SessionUser',JSON.stringify(userData.user));
          this.AuthSerice.setUserData();
          this.dataService.setIsLoggedIn(true);
          this.router.navigate(['Account']);
        }else{
          this.toastr.info("Thank you for signing up with us! We have sent a verification email to the email address you provided. Please click on the verification link in the email to confirm your account and start enjoying our services.")
          this.tempuser=userData.user;
          this.reSendVerify=true;
        }   
      }).catch(err => {
        this.toastr.error('Something went wrong. Please try again,', err.message)
      })
      // Login Page End

    }
    if(this.showPage.isforgotPassword){
      sendPasswordResetEmail(this.auth,f.email)
      .then(data=>{
        this.toastr.success('Password reset email sent! Please check your inbox or junk mail folder for an email from us containing instructions on how to reset your password. If you don\'t receive an email within the next few minutes, please contact our customer support team for assistance.')
        this.loginPage();
      })
      .catch(err=>{
        console.log('Something went wrong. Please try again,',err.message)
      });
    }

    if(this.showPage.isSignUp){
      // Sign up Page start
      createUserWithEmailAndPassword(this.auth, f.email, f.password).then((userData) => {    
        if (userData.user != null){
          sendEmailVerification(userData.user);
        }
       updateProfile(userData.user,{displayName:f.name});

        let user = {
          "email": f.email,
          "displayName":f.name,
          "phoneNumber":f.phoneNumber
        }
        const docRef = doc(this.fireStore, "users", userData.user.uid );
        setDoc(docRef, user).then(data => {
          this.toastr.success("Congratulations, your account has been created! Please check your email and click the verification link to complete your registration.");
          this.loginPage();
        }).catch(err => {
          this.toastr.error('Something went wrong. Please try again,', err.message)
        })
      }).catch(err => {
        this.toastr.error('Something went wrong. Please try again,', err.message)
      })
      // Sign up Page End   
    }
  }
  loginPage() {
    this.showPage = {
      isLogin:true,
      isSignUp:false,
      isforgotPassword:false
    };
    this.PageName = "Sign In"
  }
  signUpPage() {
    this.showPage = {
      isLogin:false,
      isSignUp:true,
      isforgotPassword:false
    };
    this.PageName = "Sign Up"
  }
  forgotPassword() {
    this.PageName = "Forgot Password";
    this.showPage = {
      isLogin:false,
      isSignUp:false,
      isforgotPassword:true
    };
    
  }


}
