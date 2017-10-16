import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {cancel, saveNewDescription, saveNewTitle, handleChange, getTasks} from './../ducks/reducer';

class DetailedView extends Component {
    constructor(props){
        super(props);

    }

    componentWillMount(){
        this.props.getTasks();
        let task = this.props.list.filter(task => {
            return +task.id === +this.props.match.params.id;
            
        })
    }

    // componentWillReceiveProps(nextProps){
    //     this.getItem(nextProps.match.params.id);
    // }

    // getItem(id){
    //     //query api
    // }

 

    saveNewTitle(title, task) {
        this.props.saveNewTitle(title, task);
        this.props.history.push('/')
        
    }

    saveNewDescription(description, task) {
        this.props.saveNewDescription(description, task);
        this.props.history.push('/')
        
    }


    render(){
        let tasks = this.props.list;
        // const id = this.props.match.params.id;
        const task = tasks.filter(task => {
            return +task.id === +this.props.match.params.id;
        })

       

        return(
            <div>
                {
                    task.length > 0 ?( <div>
                    <input onChange={(e)=>this.props.handleChange('newTitle', e)} placeholder= {task[0].title} value={this.props.newTitle}/>  
                    <button onClick={(e)=>this.saveNewTitle(this.props.newTitle, task[0])}>Save Title</button> 
                    <button onClick={()=> this.props.cancel('newTitle', task[0])}>Undo Title</button>
                    <br/>
                <input onChange={(e)=>this.props.handleChange('newDescription', e)} placeholder={task[0].description} value={this.props.newDescription}/>
                <button onClick={(e)=> this.saveNewDescription(this.props.newDescription, task[0])}>Save Description</button>
                <button onClick={()=> this.props.cancel('newDescription', task[0])}>Undo Description</button>
                <Link to="/"><button>Back to List</button></Link>
                    </div>) : null
                }
               
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {list, newDescription, newTitle} = state;
    return {
        list,
        newDescription,
        newTitle
    }
}

let outputActions={
    cancel,
    saveNewTitle,
    saveNewDescription,
    handleChange,
    getTasks
};

export default connect(mapStateToProps, outputActions)(DetailedView);