import React from 'react';
import { ArcanaCategory, Affinity, arcanaIcons } from '../../common/enum';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import {affinityColors, defaultShowImpactPointsOnTooltip} from '../../config';

interface DisplayImpressionProps {
    impact: {
        categoryId: ArcanaCategory;
        points: Affinity;
    },
    showImpactPointsOnTooltip: boolean | undefined
}

const DisplayImpression: React.FC<DisplayImpressionProps> = ({ impact, showImpactPointsOnTooltip}) => {
    const icon = arcanaIcons[impact.categoryId];
    const affinityColor = affinityColors[impact.points];
    const arcanaName = ArcanaCategory[impact.categoryId]; // Get the full name of the Arcana
    const showImpactPointsSetting = showImpactPointsOnTooltip!==undefined ? showImpactPointsOnTooltip : defaultShowImpactPointsOnTooltip

    const styles = {
        backgroundColor: affinityColor,
        display: 'inline-block',
        margin: '2px',
        padding: '2px',
        borderRadius: '4px',
        border: '1px solid #000' // Add border
    };

    const formatArcanaName = (name: string) => {
        return name
            .toLowerCase()
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <OverlayTrigger
            placement="bottom-start"
            overlay={
            <Tooltip id={`tooltip-${impact.categoryId}`}>
                { showImpactPointsSetting ?
                    `${formatArcanaName(arcanaName)}: ${impact.points > 0 ? '+' : ''}${impact.points}`
                    : `${formatArcanaName(arcanaName)}`
                }
            </Tooltip>
        }
        >
            <div style={styles}>
                <img src={icon} alt={`icon-${impact.categoryId}`} width="32" height="32" />
            </div>
        </OverlayTrigger>
    );
};

export default DisplayImpression;
