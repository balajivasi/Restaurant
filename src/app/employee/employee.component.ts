import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent {
  @Input() EmployeeDetails:EmployeeDetails|undefined;
  salary:number=10000;
  today: number = Date.now();

}

interface EmployeeDetails {
  Workday: Date;
  Experience: number;
  Salary: number;
}
