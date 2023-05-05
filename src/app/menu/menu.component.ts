import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  pageName:string="Menu";
  FoodMenuTitle:string = "Food Menu";
  FoodMenuSubTitle:string="Most Popular Items";
  selectedItems:string="1";

  selectedMenu(selected:string){
    this.selectedItems=selected;
  }

}
