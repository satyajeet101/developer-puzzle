import { Component , OnInit} from '@angular/core';
import { APP_CONST } from './constants/app.constant'
@Component({
  selector: 'coding-challenge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = APP_CONST.TITLE;
  public welComeMsg: string = APP_CONST.WELCOME_MSG;
 }
