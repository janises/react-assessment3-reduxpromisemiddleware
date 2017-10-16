import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteTask, completeTask} from './../ducks/reducer';
import {Link} from 'react-router-dom';

class Task extends Component {

    render() {
        let {deleteTask, completeTask} = this.props;
        // console.log(this.props)
        return(
            <div className="task-container">

                <div style={this.props.style} className={`${this.props.isCompleted}`} key={this.props.index}> {this.props.taskItem.title}</div> 
                <Link to={`/task/${this.props.taskItem.id}`}><button disabled={this.props.isCompleted}>Edit</button></Link>
                <button disabled={this.props.isCompleted} onClick={(e)=>completeTask(this.props.taskItem)}>Complete</button>
                <button onClick={(e)=> deleteTask(this.props.taskItem)}>Delete</button>
            </div>
            
        )
    }
}

function mapStateToProps(state) {
    let {list} = state;
    return {
        list
    }
}

export default connect(mapStateToProps, {deleteTask, completeTask})(Task);