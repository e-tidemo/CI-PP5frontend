import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../../styles/Panel.module.css';


function PanelDetail() {
    const { id } = useParams();
    const [panel, setPanel] = useState(null);
  
    useEffect(() => {
      const fetchPanelDetails = async () => {
        try {
          // Fetch panel details using axiosReq.get
          const response = await axiosReq.get(`/api/panels/${id}/`);
          setPanel(response.data);
        } catch (error) {
          console.error('Error fetching panel details:', error);
        }
      };

      fetchPanelDetails();
    }, [id]);

    if (!panel) {
        return <div>Panel not found</div>;
    }

    return (
        <Container className={styles.Container}>
            <Row className="justify-content-center">
                <Col md={8}>
                    <div className={`${styles.Title} text-center p-3 mb-3`}>{panel.title}</div>
                    {panel.image && 
                        <img src={panel.image} alt={panel.alt_text} className="img-fluid rounded" />
                    }
                    {panel.video_url && 
                        <iframe src={panel.video_url} title="Panel Video" className="embed-responsive embed-responsive-16by9 mt-3" />
                    }
                    <br/>
                    <br/>
                    <p>{panel.content}</p>
                </Col>
            </Row>
        </Container>
    );
}


export default PanelDetail;
