import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PanelDetail from './PanelDetail';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

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
        <Container className="text-center">
            <h2>Admin Advice Panels</h2>
            <br/>
            <br/>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    {panels.map(panel => (
                        <div key={panel.id} onClick={() => handlePanelClick(panel.id)} style={{ marginBottom: '15px' }}>
                            <Link to={`/panels/${panel.id}`} className="text-decoration-none">
                                <div className="border rounded p-3 d-flex align-items-center">
                                    {panel.image && <img src={panel.image} alt="Panel thumbnail" style={{ width: '50px', height: '50px', marginRight: '10px' }} />}
                                    <h4 style={{ marginLeft: '10px' }}>{panel.title}</h4>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Col>
            </Row>
            {selectedPanelId && <PanelDetail panelId={selectedPanelId} />}
        </Container>
    );
}

export default PanelList;
