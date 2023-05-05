import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { TeamDetails } from 'src/app/Interface/team-details';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit{
  PageName: string = "Team Members";
  PageSubTitle: string = "Our Master Chefs";

  TeamDetails: TeamDetails|any;
  

  constructor(private fireStore:Firestore){}

  ngOnInit(): void {
    this.loadTeam()
  }
  loadTeam(){
    const docRef=collection(this.fireStore,'OurTeam')
    collectionData(docRef,{idField:'id'}).subscribe(data=>{
      this.TeamDetails=data;
    })
  }
}
