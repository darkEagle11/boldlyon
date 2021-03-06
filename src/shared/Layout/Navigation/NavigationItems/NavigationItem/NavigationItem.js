import React from 'react';
import { NavLink } from 'react-router-dom';

const navigationItem = props => (
    <li>
        <NavLink
            to={props.link}
            className={props.styles}
            exact={props.exact}
            activeClassName={props.activeClass}>
            {props.children}
        </NavLink>
    </li>
)

export default navigationItem;