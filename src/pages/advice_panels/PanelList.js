import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PanelDetail from './PanelDetail';
import { Link } from 'react-router-dom';

function PanelList() {
    const [panels, setPanels] = useState([]);
    const [selectedPanelId, setSelectedPanelId] = useState(null);

    useEffect(() => {
        // Fetch the list of panels when the component mounts
        axios.get('http://world-of-craft-670e0fb14b24.herokuapp.com/api/panels/')
            .then(response => {
                setPanels(response.data);
            })
            .catch(error => {
                console.error('Error fetching panels:', error);
            });
    }, []);

    const handlePanelClick = (panelId) => {
        setSelectedPanelId(panelId);
    };

    return (
        <div>
            <h2>Admin Advice Panels</h2>
            <ul>
                {panels.map(panel => (
                    <li key={panel.id} onClick={() => handlePanelClick(panel.id)}>
                        <Link to={`/panels/${panel.id}`}>{panel.title}</Link>
                    </li>
                ))}
            </ul>
            {selectedPanelId && <PanelDetail panelId={selectedPanelId} />}
        </div>
    );
}

export default PanelList