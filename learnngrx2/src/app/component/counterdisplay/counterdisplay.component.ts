import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterMOdel } from '../../shared/store/counter.model';

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

  ngOnInit(): void {
    this.store.select('counter').subscribe(data=>{
      this.counterDisplay = data.counter;
      this.channelName = data.channelname
    })
  }
}
