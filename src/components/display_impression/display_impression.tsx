import React from 'react';
import { ArcanaCategory, Affinity, arcanaIcons } from '../../common/enum';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { affinityColors } from '../../config';

interface DisplayImpressionProps {
    impact: {
        categoryId: ArcanaCategory;
        points: Affinity;
    };
}

const DisplayImpression: React.FC<DisplayImpressionProps> = ({ impact }) => {
    const icon = arcanaIcons[impact.categoryId];
    const affinityColor = affinityColors[impact.points];
    const arcanaName = ArcanaCategory[impact.categoryId]; // Get the full name of the Arcana

    const styles = {
        backgroundColor: affinityColor,
        display: 'inline-block',
        margin: '2px',
        padding: '2px',
        borderRadius: '4px',
        border: '1px solid #000' // Add border
    };

    return (
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`tooltip-${impact.categoryId}`}>{`${arcanaName.replace('_', ' ')}: ${impact.points > 0 ? '+' : ''}${impact.points}`}</Tooltip>}
        >
            <div style={styles}>
                <img src={icon} alt={`icon-${impact.categoryId}`} width="24" height="24" />
            </div>
        </OverlayTrigger>
    );
};

export default DisplayImpression;
