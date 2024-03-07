import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterMOdel } from '../../shared/store/counter.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-counterdisplay',
  templateUrl: './counterdisplay.component.html',
  styleUrl: './counterdisplay.component.css'
})
export class CounterdisplayComponent implements OnInit{
  constructor(private store:Store<{counter: CounterMOdel}>) {

  }


  counterDisplay!:number;
  channelName!:string;
  countersubscribe!: Subscription;
  counter$!:Observable<CounterMOdel>;

  ngOnInit(): void {
    this.counter$ = this.store.select('counter');
  }
  
  
}
