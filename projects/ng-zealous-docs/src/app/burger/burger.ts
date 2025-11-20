import { Component, ViewEncapsulation } from '@angular/core';
import { ZBurgerModule } from 'ng-zealous/burger';
import { ZDemoModule, zDemoProp } from 'ng-zealous/demo';

@Component({
  selector: 'app-burger',
  imports: [ZBurgerModule, ZDemoModule],
  templateUrl: './burger.html',
  encapsulation: ViewEncapsulation.None,
})
export default class Burger {
  protected demoState = {
    active: zDemoProp([false, true]),
  };
}
