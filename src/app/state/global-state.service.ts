import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IState } from '../interfaces/state-interfaces';

@Injectable({
    providedIn: 'root',
})
export class GlobalStateService {
    // Инициализация реактивного состояния State
    private stateSubjects$: BehaviorSubject<IState[]> = new BehaviorSubject<IState[]>([]);

    public readonly state$ = this.stateSubjects$.asObservable();

    constructor() {}
}
