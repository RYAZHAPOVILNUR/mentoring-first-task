import { createActionGroup, props } from "@ngrx/store";
import { User } from "../../../../Interfaces/user.interface";



export let UserActions = createActionGroup({
    source: 'Users',
    events: {
        set: props<{users: User[]}>(),
        edit: props<{user: User }>(),
        create: props<{user: User }>(),
        delete: props<{id: number}>(),
        
        
    }
})