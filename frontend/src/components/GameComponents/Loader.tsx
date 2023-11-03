import React from 'react';

interface loaderProps  {
    visibility: boolean;
}

const loader = ({visibility}: loaderProps) => {
    return (
      <>
        <div className="loader" id="gameLoader" style={{visibility: visibility ? 'visible' : 'hidden'}}>
            <div className="clear"></div>
            <div className="left_wall"></div>
            <div className="ball"></div>
            <div className="right_wall"></div>
            <div className="clear"></div>
        </div>
      </>
    );
  }

export default loader;