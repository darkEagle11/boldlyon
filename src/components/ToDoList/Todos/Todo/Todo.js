import React, { useContext, useState } from 'react';
import classes from './stylesheets/Todo.css';
import PropTypes from 'prop-types';
import TodoContext from '../../../../context/TodoContext';

const todo = props => {
    const todoContext = useContext(TodoContext);
    //STATE
    const [buttonsState, setButtonsState] = useState({
        showChangeButtons: false,
    })

    const toggleChangeButtons = () => {
        setButtonsState({ showChangeButtons: !buttonsState.showChangeButtons })
    }

    //Add the default todo class, and if completed add the completed class also
    let todoClasses = [classes.Todo];
    let changeButtonsClasses = [classes.ChangeButtons];

    //PROPS 
    const todoText = props.todo.task;
    const isTodoCompleted = props.todo.isCompleted;
    const todoIndex = props.index;


    let todoOverlay = null;
    //FUNCTIONS to run when clicked
    let editFunc = todoContext.edit.bind(this, props.index);
    let deleteFunc = todoContext.delete.bind(this, props.index);
    let completedFunc = todoContext.complete.bind(this, props.index);

    if (props.todo.isCompleted) {
        todoClasses.push(classes.Completed);
    }

    // //If we are editing a todo
    if (todoContext.editState) {
        todoClasses.push(classes.DisabledTodo);
        editFunc = () => null;
        deleteFunc = () => null;
        completedFunc = () => null;
    }

    if (buttonsState.showChangeButtons) {
        changeButtonsClasses.push(classes.SlideChangeButtons);
        todoOverlay = <div className={classes.Overlay} onClick={toggleChangeButtons}></div>;
    }

    function runEditButton() {
        editFunc();
        toggleChangeButtons();
    }

    function runDeleteButton() {
        deleteFunc();
        toggleChangeButtons();
    }
    return (
        <li className={todoClasses.join(' ')}>
            <p className={classes.Index}>{todoIndex + 1}.</p>
            <label>
                <input
                    className={classes.Checkbox}
                    type='checkbox'
                    onChange={completedFunc}
                    checked={isTodoCompleted} />
            </label>

            <div className={classes.TodoText} onClick={toggleChangeButtons}>
                <p>{todoText}</p>
            </div>
            {todoOverlay}
            <div className={changeButtonsClasses.join(' ')}>
                <span className={classes.EditIcon} onClick={runEditButton}>
                    <i className="material-icons">edit</i>
                </span>

                <span className={classes.DeleteIcon} onClick={runDeleteButton}>
                    <i className="material-icons">delete_sweep</i>
                </span>
            </div>

        </li>

    );
}

todo.propTypes = {
    todo: PropTypes.object,
    index: PropTypes.number,
}

export default todo;