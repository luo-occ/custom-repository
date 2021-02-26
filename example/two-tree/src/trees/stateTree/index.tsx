import React from 'react';
import './index.css';
function StateTree() {
  return (
    <div>
        state1
        <div className='sub-tree'>   
            <div>
                state2
            </div>
            <div>
                state3
            </div>
        </div>
    </div>
  );
}

export default StateTree;