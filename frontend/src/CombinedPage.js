import React from 'react';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';
import './CombinedPage.css'; 

const CombinedPage = () => {
  return (
    <div className="combined-container">
      <div className="component component-a">
        <ComponentA />
      </div>
      <div className="component component-b">
        <ComponentB />
      </div>
    </div>
  );
};

export default CombinedPage;
