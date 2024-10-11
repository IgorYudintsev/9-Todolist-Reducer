import {TasksStateType} from '../App'
import {v1} from "uuid";
import {addTodolistAC, AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const todolistId = action.payload.todolistId
            const taskId = action.payload.taskId
            return {...state, [todolistId]: state[todolistId].filter(t => t.id !== taskId)}
        }
        case "ADD_TASK": {
            const todolistId = action.payload.todolistId
            const newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return {...state, [todolistId]: [newTask, ...state[todolistId]]}

        }
        case "CHANGE_TASK_STATUS": {
            const todolistId = action.payload.todolistId
            const taskId = action.payload.taskId
            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id == taskId ? {...t, isDone: action.payload.isDone} : t)
            }

        }
        case "CHANGE_TASK_TITLE": {
            const {taskId, title, todolistId} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id == taskId ? {...t, title: action.payload.title} : t)
            }
        }
        case "ADD-TODOLIST":{
            const todolistId = action.payload.todolistId
            return {...state, [todolistId]: []}
        }
        case "REMOVE-TODOLIST":{
            const todolistId = action.payload.id
            const newState = { ...state }
            delete newState[todolistId]
            return newState
            }
        default:
            throw new Error("I don't understand this type")
    }
}

// Action creators
export const removeTaskAC = (payload: { taskId: string, todolistId: string }) => {
    return {
        type: 'REMOVE-TASK',
        payload
    } as const
}
export const addTaskAC = (payload: { title: string, todolistId: string }) => {
    return {
        type: "ADD_TASK",
        payload
    } as const
}

export const changeTaskStatusAC = (payload: { taskId: string, isDone: boolean, todolistId: string }) => {
    return {
        type: "CHANGE_TASK_STATUS",
        payload
    } as const
}


export const changeTaskTitleAC = (payload: { taskId: string, title: string, todolistId: string }) => {
    debugger
    return {
        type: "CHANGE_TASK_TITLE",
        payload
    } as const
}


// Actions types
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
type ActionsType = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodolistActionType
    | RemoveTodolistActionType