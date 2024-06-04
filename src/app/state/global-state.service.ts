import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    private states: { [key: string]: any } = {};
    // Инициализация реактивного состояния State
    private stateSubjects$: BehaviorSubject<[{}]> = new BehaviorSubject<[{}]>([{}]);

    private readonly state$ = this.stateSubjects$.asObservable();
    constructor() {}

    setState<T>(stateName: string, data: T): void {
        // this.states[stateName] = data;
        this.stateSubjects$.next([
            {
                stateName: stateName,
                data: data,
            },
        ]);
    }

    getState<T>(stateName: string): any {
        this.state$.subscribe(value => {
            // console.log('VALUE', Object.keys(value[0])[0]); ===> stateName
            console.log('VALUE[0]', value[0]);
            console.log('KEYS', value);
            // if (Object.keys(value[0])[0] === Object.keys(stateName)) {
            //     console.log('VALUE[0]', value[0]);
            // }
        });
    }
}
