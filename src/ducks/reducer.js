import axios from 'axios';

const initialState = {
    list: [],
    isDisabled: true,
    newTask: '',
    newTitle: '',
    newDescription: ''
}

const CREATE = 'CREATE',
      COMPLETE = 'COMPLETE',
      DELETE = 'DELETE',
      HANDLE_CHANGE = 'HANDLE_CHANGE',
      GET_TASKS = 'GET_TASKS', 
      CANCEL = 'CANCEL',
      SAVE_NEW_TITLE = 'SAVE_NEW_TITLE',
      SAVE_NEW_DESCRIPTION = 'SAVE_NEW_DESCRIPTION';


export function saveNewTitle(title, task){
    return {
        type: SAVE_NEW_TITLE,
        title,
        task,
        payload: axios.patch(`https://practiceapi.devmountain.com/api/tasks/${task.id}`, {title})
        .then(response => {
            return response.data
        })
    }
}


export function saveNewDescription(description, task) {
    return {
        type: SAVE_NEW_DESCRIPTION,
        description,
        task,
        payload: axios.patch(`https://practiceapi.devmountain.com/api/tasks/${task.id}`, {description})
        .then(response => {
            return response.data
        })
    }
}


export function cancel(input, task){
    return{
        type: CANCEL,
        input,
        payload: task
    }
}

export function getTasks(){
    return {
        type: GET_TASKS,
        payload: axios.get('https://practiceapi.devmountain.com/api/tasks/').then(response => {
            return response.data
        })
    }
}

export function handleChange(input, event){
    return {
        type: HANDLE_CHANGE,
        input,
        payload: event.target.value
    }
}

export function createTask(task, list){
    return {
        type: CREATE,
        payload: axios.post('https://practiceapi.devmountain.com/api/tasks/', {id: list[list.length-1].id + 1, title: task, description:'', completed: false})
    }
}      

export function completeTask(task){
    return {
        type: COMPLETE,
        task,
        payload: axios.patch(`https://practiceapi.devmountain.com/api/tasks/${task.id}`, {completed: true})
        .then(response => {
            return response.data
        })
    }
}

export function deleteTask(task){
    return {
        type: DELETE,
        payload: axios.delete('https://practiceapi.devmountain.com/api/tasks/' + task.id)
        .then(res => {
            let tasks = res.data.filter(tasks=> {
                return tasks.id !== +task.id
            })
            return res
        })
    }
}

function reducer(state = initialState, action) {
    let newItem,
        tasks,
        remainingTasks;
    switch(action.type){
        case CREATE+ '_FULFILLED':
        newItem = [{id: state.list[state.list.length-1]+1, title: action.payload, description:'', complete:false, isChecked: 'incomplete'}]

        return Object.assign({}, state, {list: state.list.concat(newItem), newTask: '', isDisabled: true})

        case CREATE + '_REJECTED':
            console.log('error with create')

        case COMPLETE + "_FULFILLED":
        // console.log(state.list)
        // tasks = state.list.map(e => {
        //     if(+e.id === +action.task.id) {
        //         e.completed = true
        //     }
        //     return e;
        // })
        console.log(action.task)
        return Object.assign({}, state, {list: action.payload});

        case COMPLETE + "_REJECTED":
        console.log('error completing task')

        case DELETE+ '_FULFILLED':
        return Object.assign({}, state, {list: action.payload});

        case DELETE + '_REJECTED':
        console.log('error deleting')

        case HANDLE_CHANGE:
        if(action.input === 'newTask') {
            return Object.assign({}, state, {isDisabled: false, newTask: action.payload});
        } else if(action.input === 'newTitle') {
            return Object.assign({}, state, {newTitle: action.payload});
        } else if(action.input === 'newDescription') {
            return Object.assign({}, state, {newDescription: action.payload});
        }
       
        case SAVE_NEW_TITLE + "_FULFILLED":
        console.log(action.title, action.task, action.payload)
            return Object.assign({}, state, {list: action.payload, newTitle: ''})

        case SAVE_NEW_TITLE + "_REJECTED":
        console.log('error saving title', action.title)

        case SAVE_NEW_DESCRIPTION + "_FULFILLED":
        console.log(action.payload)
            return Object.assign({}, state, {list: action.payload, newDescription: ''})

        case SAVE_NEW_DESCRIPTION + "_REJECTED":
        console.log('error saving description', action.description)

        case GET_TASKS + '_FULFILLED':
        // console.log(action.payload)
            let data = action.payload;
            return Object.assign({}, state, {list: data});

        case GET_TASKS + "_REJECTED":
            console.log('error getting tasks')

        case CANCEL:
        if(action.input === 'newTitle') {
            return Object.assign({}, state, {newTitle: action.payload.title})
        } else if( action.input === 'newDescription') {
            return Object.assign({}, state, {newDescription: action.payload.description})
        }
    
        default :
        break;
    }
    return state;
}

export default reducer;