import React, { useEffect, useState } from 'react';
import styles from '../../styles/Post.module.css';
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from '../../api/axiosDefault';

const Panel = () => {
    const [panels, setPanels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPanels = async () => {
            try {
                const response = await axiosRes.get('/admin/panel/');
                setPanels(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching panels:', error);
                setLoading(false);
            }
        };

        fetchPanels();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {panels.map(panel => (
                <Card key={panel.id} className={styles.Post}>
                    <Card.Body>
                        <Media className="align-items-center justify-content-between">
                            <Link to={`/profiles/${panel.owner.profile_id}`}>
                                <Avatar src={panel.owner.profile_image} height={55} />
                                {panel.owner.username}
                            </Link>
                            <div className="d-flex align-items-center">
                                <span>{panel.updated_at}</span>
                            </div>
                        </Media>
                    </Card.Body>
                    {panel.image && (
                        <Link to={`/posts/${panel.id}`}>
                            <Card.Img src={panel.image} alt={panel.title} />
                        </Link>
                    )}
                    <Card.Body>
                        {panel.title && <Card.Title className="text-center">{panel.title}</Card.Title>}
                        {panel.content && <Card.Text>{panel.content}</Card.Text>}
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default Panel;
