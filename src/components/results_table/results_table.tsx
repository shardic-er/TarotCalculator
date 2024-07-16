import React from 'react';
import { Result } from "../../common/interfaces";

interface ResultsTableProps {
    results: Result[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
    if (results.length === 0) {
        return null; // Return null if there are no results to display
    }

    // Create a sorted copy of results array in descending order by score
    const sortedResults = [...results].sort((a, b) => b.score - a.score);

    return (
        <div className="table-responsive mt-4">
            <table className="table table-hover">
                <thead className="thead-light">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th className="score-column">Score</th>
                </tr>
                </thead>
                <tbody>
                {sortedResults.map((result, index) => (
                    <tr key={index} className={index % 2 === 0 ? "table-row-even" : ""}>
                        <td>{result.id}</td>
                        <td>{result.name}</td>
                        <td>{result.description}</td>
                        <td className="score-column">{result.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;
