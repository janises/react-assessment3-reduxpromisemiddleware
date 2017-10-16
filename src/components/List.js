import React, {Component} from 'react';
import Task from './Task';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {handleChange, createTask, getTasks} from './../ducks/reducer';
import DetailedView from './DetailedView';

class List extends Component {
    componentDidMount(){
        this.props.getTasks();
    }
    componentWillUpdate(){
        this.props.getTasks();
    }

    render(){
       const divStyle = {
        paddingRight: 10
       };

       let {createTask, handleChange, newTask, isDisabled, list} = this.props;

        return (
            <div className="container">
                <input value={newTask} placeholder="task" type='text' onChange={(e)=> handleChange('newTask', e)}/> 
                <button onClick={(e)=>createTask(newTask, list)} disabled={isDisabled}> Add Task </button>
                <div className="list">
                    <h3>Tasks </h3>
                    
                        {
                            list.length > 0 ? (
                                list.map((item)=> {
                                
                                    return <Task style={divStyle} isCompleted={item.completed} index={item.key} taskItem={item}/>
                                     
                                })
                            ) : null
                        }
                    
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {list, key, isDisabled, newTask} = state;
    return {
        list,
        key,
        isDisabled,
        newTask
    }
}

let outputActions = {
    handleChange,
    createTask,
    getTasks
}


export default connect(mapStateToProps, outputActions)(List);