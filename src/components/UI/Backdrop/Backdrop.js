import React from 'react';

import './Backdrop.css';

const Backdrop = props =>
    props.show ? (
        <div className="Backdrop" onClick={props.backdropHandler} />
    ) : null;

export default Backdrop;
