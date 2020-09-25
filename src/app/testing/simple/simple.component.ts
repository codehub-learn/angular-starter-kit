import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../simple.service';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html'
})
export class SimpleComponent implements OnInit {

  loggedIn: string;
  title = 'Simple component works';

  constructor(private simpleService: SimpleService) { }

  ngOnInit(): void {
    this.loggedIn = this.simpleService.isLoggedIn ? 'logged in' : 'not logged in';
  }

  onClick(): void {
    this.simpleService.doSomething();
  }

}
