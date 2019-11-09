import React, { Fragment } from 'react';
import classes from './stylesheets/TodoHeader.css';
import TodoMsg from '../../../UI/todoMsg/todoMsg';

import PropTypes from 'prop-types';

const todoHeader = props => {
    let editHeader = null;
    let emptyHeader = null;
    //If we are editing a todo
    if (props.state.editing) {
        editHeader = (
            <TodoMsg
                styles={classes.EditHeader}
                message={`Continue editing todo #${props.state.editingIndex + 1}... `}
                close={props.cancelEdit} />
        );
    }
    //If the todo sumbitted is empty
    if (props.state.empty) {
        emptyHeader = (
            <TodoMsg
                styles={classes.EmptyHeader}
                message={!props.state.editing ? 'Please enter something to submit' : 'Please replace the previous todo'}
                close={props.emptyMsgReceived} />
        );
    }
    const saveButtonClasses = ["material-icons", classes.SaveButton];
    if (!props.state.savedChanges) {
        saveButtonClasses.push(classes.ShowToSave);
    }
    return (
        <Fragment>
            <div className={classes.TodoHeader}>
                <div>
                    <h3 className={classes.TodoTitle}>bold lyon</h3>
                    <p className={classes.Tracker}>
                        Task(s) Completed: {props.state.tasksCompleted}/{props.state.totalTasks}
                    </p>
                </div>

                {/* <button className={classes.SaveButton}>Save Changes</button> */}
                <i onClick={props.saveChanges} className={saveButtonClasses.join(' ')}>
                    save
                </i>
            </div>
            {editHeader}
            {emptyHeader}
        </Fragment>
    )
}

todoHeader.propTypes = {
    tasksCompleted: PropTypes.number,
    totalTasks: PropTypes.number,
}


export default todoHeader;