import { Component } from '@angular/core';
import { DataService } from '../Services/data-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  userType: string | undefined;
  constructor(private dataService:DataService){
    this.dataService.userType.subscribe(type => this.userType = type)
  }
  
  
}
