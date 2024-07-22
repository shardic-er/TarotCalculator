import React, {useEffect, useState} from 'react';
import Questionnaire from '../questionare/questionare'; // Use the incorrect spelling as specified
import { Category, Question, Result } from '../../common/interfaces';
import ParticipantsResultsTable from '../participants_results_table/participants_results_table';
import {Affinity} from "../../common/enum";
import {defaultHideImpressionIconsUntilSelected, defaultShowImpactPointsOnTooltip} from '../../config';

interface ParticipantsTabsProps {
    questions: Question[];
    categories: Category[];
    participants: number;
}

// Function to generate random names (mock for now)
const generateRandomName = () => {
    const names = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'];
    return names[Math.floor(Math.random() * names.length)];
};

const errorMethods = {
    simpleDifference: (score: number) => 100 - score,
    squaredError: (score: number) => (100 - score) ** 2
};

// Error calculation function
const calculateError = (results: Record<number, Result[]>, assignments: Record<number, string>, categories: Category[]): Record<number, number> => {
    const participantErrors: Record<number, number> = {};
    Object.keys(results).forEach(participantId => {
        const participantResults = results[parseInt(participantId)];
        const assignedCategory = assignments[parseInt(participantId)];
        const assignedCategoryId = categories.find(category => category.name === assignedCategory)?.id;
        const assignedResult = participantResults.find(result => result.id === assignedCategoryId);
        participantErrors[parseInt(participantId)] = assignedResult ? 100 - assignedResult.score : 100;
    });
    return participantErrors;
};

const ParticipantsTabs: React.FC<ParticipantsTabsProps> = ({ questions, categories, participants }) => {
    const [selectedOptions, setSelectedOptions] = useState<Record<number, Record<number, number>>>({});
    const [results, setResults] = useState<Record<number, Result[]>>({});
    const [assignments, setAssignments] = useState<Record<number, string>>({});
    const [activeTab, setActiveTab] = useState(0);
    const [names, setNames] = useState<Record<number, string>>({});
    const [displayAffinities, setDisplayAffinities] = useState<Record<Affinity, boolean>>({
        [Affinity.ANTI]: true,
        [Affinity.NONE]: false,
        [Affinity.SLIGHT]: false,
        [Affinity.MODERATE]: false,
        [Affinity.STRONG]: true
    });
    const [showImpactPointsOnTooltip, setShowImpactPointsOnTooltip] = useState(defaultShowImpactPointsOnTooltip);
    const [hideIconsUntilSelected, setHideIconsUntilSelected] = useState(defaultHideImpressionIconsUntilSelected);

    // Initialize names with random values (mock for now)
    useEffect(() => {
        const initialNames: Record<number, string> = {};
        for (let i = 0; i < participants; i++) {
            initialNames[i] = generateRandomName();
        }
        setNames(initialNames);
    }, [participants]);

    const handleSelectOption = (participantId: number, questionId: number, optionId: number) => {
        setSelectedOptions(prevSelectedOptions => ({
            ...prevSelectedOptions,
            [participantId]: {
                ...prevSelectedOptions[participantId],
                [questionId]: optionId
            }
        }));
    };

    const handleSubmit = (participantId: number) => {
        if (checkQuizCompletion(participantId)) {
            const scores = calculateScores(participantId);
            setResults(prevResults => ({
                ...prevResults,
                [participantId]: scores
            }));
        }
    };

    const handleClear = (participantId: number) => {
        setResults(prevResults => ({
            ...prevResults,
            [participantId]: [] // Clear the results for the participant
        }));
        setSelectedOptions(prevSelectedOptions => ({
            ...prevSelectedOptions,
            [participantId]: {} // Clear selections for the participant
        }));
    };

    const handleRandomize = (participantId: number) => {
        const randomSelections: Record<number, number> = {};
        questions.forEach(question => {
            randomSelections[question.id] = question.options[Math.floor(Math.random() * question.options.length)].id;
        });
        setSelectedOptions(prevSelectedOptions => ({
            ...prevSelectedOptions,
            [participantId]: randomSelections
        }));
    };

    const handleScoreAll = () => {
        for (let i = 0; i < participants; i++) {
            handleSubmit(i);
        }
        console.log("All participants' data:", selectedOptions, results);
    };

    const handleRandomizeAll = () => {
        for (let i = 0; i < participants; i++) {
            handleRandomize(i);
        }
    };

    const handleSortParticipants = () => {
        const sortedAssignments: Record<number, string> = {};
        const assignedCategories: Set<number> = new Set();

        const participantErrors: Array<{ participantId: number, categoryId: number, error: number }> = [];

        Object.keys(results).forEach((participantId: string) => {
            results[parseInt(participantId)].forEach((result: Result) => {
                const error = 100 - result.score;
                participantErrors.push({ participantId: parseInt(participantId), categoryId: result.id, error });
            });
        });

        participantErrors.sort((a, b) => a.error - b.error);

        participantErrors.forEach(({ participantId, categoryId }) => {
            if (!assignedCategories.has(categoryId) && !(participantId in sortedAssignments)) {
                sortedAssignments[participantId] = categories.find(category => category.id === categoryId)?.name || '';
                assignedCategories.add(categoryId);
            }
        });

        setAssignments(sortedAssignments);
        console.log("Sorted Assignments:", sortedAssignments);
    };

    const handleNameChange = (participantId: number, newName: string) => {
        setNames(prevNames => ({
            ...prevNames,
            [participantId]: newName
        }));
    };

    const handleAffinityChange = (affinity: Affinity) => {
        setDisplayAffinities(prev => ({
            ...prev,
            [affinity]: !prev[affinity]
        }));
    };

    const checkQuizCompletion = (participantId: number): boolean => {
        return questions.every(question => selectedOptions[participantId]?.[question.id] !== undefined);
    };

    const calculateScores = (participantId: number): Result[] => {
        const totalPointsAvailable: Record<number, number> = {};
        const categoryScores: Record<number, number> = {};

        // Initialize total points and user scores using category IDs
        categories.forEach(category => {
            totalPointsAvailable[category.id] = 0; // Initialize total points to 0
            categoryScores[category.id] = 0; // Initialize every category's score to 0
        });

        // Calculate total points available for each category, considering only the highest possible score for each category per question
        questions.forEach(question => {
            const maxImpact: Record<number, number> = {}; // To track the maximum impact for each category in this question
            question.options.forEach(option => {
                option.impacts.forEach(impact => {
                    if (impact.points > (maxImpact[impact.categoryId] || 0)) {
                        maxImpact[impact.categoryId] = impact.points;
                    }
                });
            });
            // Add the maximum impacts to the total points available
            Object.entries(maxImpact).forEach(([categoryId, points]) => {
                if (points > 0) { // Exclude zero
                    totalPointsAvailable[parseInt(categoryId)] += points;
                }
            });
        });

        // Calculate user scores based on selected options
        Object.entries(selectedOptions[participantId]).forEach(([questionId, optionId]) => {
            const question = questions.find(q => q.id === parseInt(questionId));
            const option = question?.options.find(o => o.id === optionId);
            option?.impacts.forEach(impact => {
                categoryScores[impact.categoryId] += impact.points; // Accumulate points for categories
            });
        });

        // Calculate the proportion of points and convert to a rounded percentage
        const proportionScores: Record<number, number> = {};
        Object.entries(categoryScores).forEach(([categoryId, score]) => {
            const totalPoints = totalPointsAvailable[parseInt(categoryId)];
            proportionScores[parseInt(categoryId)] = totalPoints ? Math.round((score / totalPoints) * 100) : 0;
        });

        // Construct an array of results, including category details and scores
        const scores = categories.map(category => ({
            id: category.id,
            name: category.name,
            score: proportionScores[category.id] || 0,
            description: category.description
        }));

        // Using calculateError function to get the error
        const errors = calculateError({ [participantId]: scores }, assignments, categories);

        console.log(`Participant ${participantId} Errors:`, errors);

        return scores;
    };

    const renderTabs = () => {
        return (
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 0 ? 'active' : ''}`}
                        onClick={() => setActiveTab(0)}
                    >
                        Results Summary
                    </button>
                </li>
                {[...Array(participants)].map((_, idx) => (
                    <li className="nav-item" key={idx}>
                        <button
                            className={`nav-link ${activeTab === idx + 1 ? 'active' : ''}`}
                            onClick={() => setActiveTab(idx + 1)}
                        >
                            {names[idx]} {/* Display participant name */}
                        </button>
                    </li>
                ))}
            </ul>
        );
    };

    const renderNameCard = (idx: number) => {
        return (
            <div className="card mb-3" style={{ maxWidth: "300px" }}>
                <div className="card-body">
                    <label htmlFor={`participant-name-${idx}`} className="form-label">Name: </label>
                    <input
                        type="text"
                        id={`participant-name-${idx}`}
                        className="form-control mb-2"
                        value={names[idx] || ''}
                        onChange={(e) => handleNameChange(idx, e.target.value)}
                    />
                    <button
                        className="btn btn-secondary mb-3"
                        onClick={() => handleClear(idx)}
                    >
                        Clear
                    </button>
                    {renderAffinityCheckboxes()}
                </div>
            </div>
        );
    };

    const renderTabContent = () => {
        return (
            <div className="tab-content">
                <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="results-summary" role="tabpanel">
                    <ParticipantsResultsTable results={results} participants={participants} categories={categories} names={names} assignments={assignments} calculateError={calculateError} />
                </div>
                {[...Array(participants)].map((_, idx) => (
                    <div
                        className={`tab-pane fade ${activeTab === idx + 1 ? 'show active' : ''}`}
                        id={`participant-${idx + 1}`}
                        role="tabpanel"
                        key={idx}
                    >
                        <div className="d-flex flex-wrap">
                            {renderNameCard(idx)}
                            <div className="card mb-3 flex-grow-1">
                                <div className="card-body">
                                    <Questionnaire
                                        questions={questions}
                                        categories={categories}
                                        selectedOptions={selectedOptions[idx] || {}}
                                        onOptionSelect={(questionId: number, optionId: number) => handleSelectOption(idx, questionId, optionId)}
                                        onSubmit={() => handleSubmit(idx)}
                                        onClear={() => handleClear(idx)}
                                        onRandomize={() => handleRandomize(idx)}
                                        results={results[idx] || []}
                                        displayAffinities={displayAffinities}
                                        showImpactPointsOnTooltip={showImpactPointsOnTooltip}
                                        hideIconsUntilSelected={hideIconsUntilSelected}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderControlButtons = () => {
        return (
            <div className="btn-group mt-3 m-2">
                <button className="btn btn-primary" onClick={handleScoreAll}>
                    Score All
                </button>
                <button className="btn btn-warning" onClick={handleRandomizeAll}>
                    Randomize All
                </button>
                <button className="btn btn-success" onClick={handleSortParticipants}>
                    Sort
                </button>
            </div>
        );
    };

    const renderAffinityCheckboxes = () => {
        return (
            <div className="card mb-3" style={{ maxWidth: "300px" }}>
                <div className="card-body">
                    <h5 className="card-title">Configure Affinities</h5>
                    {Object.values(Affinity).filter(value => typeof value === 'number').map((affinity, index) => (
                        <div className="form-check" key={index}>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`affinity-${affinity}`}
                                checked={displayAffinities[affinity as Affinity]}
                                onChange={() => handleAffinityChange(affinity as Affinity)}
                            />
                            <label className="form-check-label" htmlFor={`affinity-${affinity}`}>
                                {Affinity[affinity as Affinity]}
                            </label>
                        </div>
                    ))}
                    <div className="form-check mt-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="show-impact-points"
                            checked={showImpactPointsOnTooltip}
                            onChange={() => setShowImpactPointsOnTooltip(prev => !prev)}
                        />
                        <label className="form-check-label" htmlFor="show-impact-points">
                            Show Impact Points
                        </label>
                    </div>
                    <div className="form-check mt-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="show-impact-points"
                            checked={hideIconsUntilSelected}
                            onChange={() => setHideIconsUntilSelected(prev => !prev)}
                        />
                        <label className="form-check-label" htmlFor="show-impact-points-only-after-selection">
                            Hide impacts until selection
                        </label>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            {renderTabs()}
            {renderControlButtons()}
            {renderTabContent()}
        </div>
    );
};

export default ParticipantsTabs;
