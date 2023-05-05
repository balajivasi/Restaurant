import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html'
})
export class AboutUSComponent {
  PageTitle:string="About Us";
  WebSiteTitle:string="Sri Padmavathi Foods";
  ExpYears:number=15;
  MasterChefs:number=10;
  AboutUsDetails:string='<p class="mb-4">Welcome to Sri Padmavathi Foods, where we bring you a taste of authentic Indian cuisine. We take pride in serving our customers with the most delicious and authentic dishes from all over India. Our experienced chefs use only the freshest ingredients and traditional cooking methods to create mouth-watering meals that are sure to satisfy your cravings. Whether you\'re in the mood for a spicy curry, a buttery naan or a sweet dessert, we have something for everyone.</p><p class="mb-4">At Sri Padmavathi Foods, we believe that food is not just about satisfying hunger but also about creating memories. We strive to create an inviting atmosphere where you can enjoy a warm meal with your loved ones, catch up with friends or simply take a break from your daily routine. Our friendly staff is dedicated to ensuring that you have a pleasant dining experience, from the moment you step into our restaurant until you leave. Come and savor the flavors of India with us, and experience the warmth of our hospitality that keeps our customers coming back for more.</p>'
}
