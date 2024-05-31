import React from 'react';
import PropTypes from 'prop-types';

page.propTypes = {
    
};

function page(props) {
    const arr = ['component1','component2','component3','component4']
    return (
        <>
            {arr.map((i) => {
                return <div key={i}>{i}</div>
            })}
        </>
    );
}

export default page;