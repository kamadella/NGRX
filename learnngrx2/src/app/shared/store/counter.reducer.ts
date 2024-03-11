import { createReducer, on } from "@ngrx/store"
import { changechannelname, customincrement, decrement, increment, reset } from "./counter.actions"
import { initialState } from "./counter.state"; // pobieram initial state z counter.state - to moje wartości początkowe


//funkcja on,  przyjmuje typ akcji oraz funkcję, która określa, jak zmienić stan w odpowiedzi na tę akcję.
const _counterReducer = createReducer(initialState,
    on(increment, (state) => {
        return {
            ...state, //
            counter: state.counter + 1
        };
    }),
    on(decrement, (state) => {
        return {
            ...state,
            counter: state.counter - 1
        };
    }),
    on(reset, (state) => {
        return {
            ...state,
            counter: 0
        };
    }),
    on(customincrement, (state, action) => { //przyjmuje aktualny stan i obiekt akcji, 
        return { // a następnie zwraca nowy stan
            ...state,
            counter: action.action == 'add' ? state.counter + action.value : state.counter - action.value
        };
    }),
    on(changechannelname, (state, action) => {
        return {
            ...state,
            channelname: action.channel
        };
    })
)
/*
W każdym przypadku, gdy stan jest zmieniany, tworzona jest nowa kopia obiektu stanu
(za pomocą operatora rozproszenia ...state), a następnie modyfikowana
*/

export function counterReducer(state: any, action: any) {
    return _counterReducer(state, action)
}