import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterModel } from '../../shared/store/counter.model';
import { Observable, Subscription } from 'rxjs';
import { AppStateModel } from '../../shared/store/Global/AppState.Model';

@Component({
  selector: 'app-counterdisplay',
  templateUrl: './counterdisplay.component.html',
  styleUrl: './counterdisplay.component.css'
})
export class CounterdisplayComponent implements OnInit{
  constructor(private store:Store<AppStateModel>) {

  }

  counter$!:Observable<CounterModel>;

  ngOnInit(): void {
    this.counter$ = this.store.select('counter');
  }
  
  
}
