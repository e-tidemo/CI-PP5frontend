import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PanelDetail({ panelId }) {
    const [panel, setPanel] = useState(null);
  
    useEffect(() => {
      // Fetch the details of a specific panel when the component mounts
      axios.get(`http://world-of-craft-670e0fb14b24.herokuapp.com/api/panels/${panelId}/`)
        .then(response => {
          setPanel(response.data);
        })
        .catch(error => {
          console.error('Error fetching panel details:', error);
        });
    }, [panelId]);
  
    if (!panel) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h3>{panel.title}</h3>
        <p>{panel.content}</p>
        {/* Display other panel details as needed */}
      </div>
    );
  }

export default PanelDetail