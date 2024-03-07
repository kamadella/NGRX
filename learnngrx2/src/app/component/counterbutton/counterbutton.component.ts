import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { changechannelname, decrement, increment, reset } from '../../shared/store/counter.actions';
import { CounterMOdel } from '../../shared/store/counter.model';

@Component({
  selector: 'app-counterbutton',
  templateUrl: './counterbutton.component.html',
  styleUrl: './counterbutton.component.css'
})
export class CounterbuttonComponent {

  constructor(private store:Store<{counter:CounterMOdel}>){

  }
  OnIncrement(){
    this.store.dispatch(increment())
  }
  OnDecrement(){
    this.store.dispatch(decrement())
  }
  OnReset(){
    this.store.dispatch(reset())
  }
  OnRename(){
    this.store.dispatch(changechannelname({channel: 'Welcome siemaneiro rename działa'}))
  }
}
