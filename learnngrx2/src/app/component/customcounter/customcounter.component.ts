import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { customincrement } from '../../shared/store/counter.actions';
import { CounterMOdel } from '../../shared/store/counter.model';

@Component({
  selector: 'app-customcounter',
  templateUrl: './customcounter.component.html',
  styleUrl: './customcounter.component.css'
})
export class CustomcounterComponent {
  constructor(private store: Store<{counter: CounterMOdel}>){

  }
  counterInput!:number;
  actionType:string='add';

  OnIncrement(){
    this.store.dispatch(customincrement({value : +this.counterInput, action : this.actionType}));
  }
}
