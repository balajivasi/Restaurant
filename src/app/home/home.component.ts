import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

    HomeBannerTitle:string="Enjoy Our <br /> Delicious Meal";
    HomeBannerDetails:string="Indulge in a gastronomic experience like no other. Our restaurant offers a delectable range of dishes that will tantalize your taste buds. Come and savor our mouth-watering meals and enjoy a dining experience you'll never forget.";
    HomeBanner:string="https://firebasestorage.googleapis.com/v0/b/sripadmavathi-foods.appspot.com/o/hero.png?alt=media&token=00d805f9-c877-4c3f-8434-ba01a79aad1e";
    FoodMenuTitle:string = "Food Menu";
    FoodMenuSubTitle:string="Most Popular Items";


    
}
