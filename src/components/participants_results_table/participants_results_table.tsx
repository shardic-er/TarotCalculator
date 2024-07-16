import React from 'react';
import { Category, Result } from '../../common/interfaces';

interface ParticipantsResultsTableProps {
    results: Record<number, Result[]>;
    participants: number;
    categories: Category[];
    names: Record<number, string>; // Add names to the props
    assignments: Record<number, string>; // Add assignments to the props
    calculateError: (results: Record<number, Result[]>, assignments: Record<number, string>, categories: Category[]) => Record<number, number>; // Add calculateError function as prop
}

const ParticipantsResultsTable: React.FC<ParticipantsResultsTableProps> = ({ results, participants, categories, names, assignments, calculateError }) => {
    // Calculate total errors for each participant
    const participantErrors = calculateError(results, assignments, categories);

    // Sort participants by total errors
    const sortedParticipants = Object.keys(participantErrors).sort((a, b) => participantErrors[parseInt(a)] - participantErrors[parseInt(b)]);

    const renderHeader = () => {
        return (
            <thead className="thead-light">
            <tr>
                <th>Arcana</th>
                {sortedParticipants.map(participantId => (
                    <th key={participantId}>{names[parseInt(participantId)]}</th> // Display participant names
                ))}
            </tr>
            </thead>
        );
    };

    const renderRows = () => {
        return categories.map(category => (
            <tr key={category.id}>
                <td>{category.name}</td>
                {sortedParticipants.map(participantId => (
                    <td key={participantId}>
                        {results[parseInt(participantId)]?.find(result => result.id === category.id)?.score || 0}
                        {assignments[parseInt(participantId)] === category.name && ' (Assigned)'} {/* Display assignment */}
                    </td>
                ))}
            </tr>
        ));
    };

    const renderErrorRow = () => {
        return (
            <tr>
                <td><strong>Total Error</strong></td>
                {sortedParticipants.map(participantId => (
                    <td key={participantId}>
                        {participantErrors[parseInt(participantId)]}
                    </td>
                ))}
            </tr>
        );
    };

    return (
        <div className="table-responsive mt-4">
            <table className="table table-hover">
                {renderHeader()}
                <tbody>
                {renderErrorRow()} {/* Render the total error row */}
                {renderRows()}
                </tbody>
            </table>
        </div>
    );
};

export default ParticipantsResultsTable;
