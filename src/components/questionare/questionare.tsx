import React from 'react';
import {Category, Question, Result} from '../../common/interfaces';
import ResultsTable from '../results_table/results_table';
import {Affinity} from '../../common/enum';
import DisplayImpression from '../display_impression/display_impression';
import './questionare.css';

interface QuestionnaireProps {
    questions: Question[];
    categories: Category[];
    selectedOptions: Record<number, number>;
    onOptionSelect: (questionId: number, optionId: number) => void;
    onSubmit: () => void;
    onClear: () => void;
    onRandomize: () => void;
    results: Result[];
    displayAffinities: Record<Affinity, boolean>; // Add displayAffinities to props
    showImpactPointsOnTooltip: boolean;
    hideIconsUntilSelected: boolean;
}

const Questionnaire: React.FC<QuestionnaireProps> = (
    {
        questions,
        selectedOptions,
        onOptionSelect,
        onSubmit,
        onClear,
        onRandomize,
        results,
        displayAffinities,
        showImpactPointsOnTooltip,
        hideIconsUntilSelected
    }
) => {

    const renderQuestionSelector = (question: Question) => {
        return (
            <div key={question.id} className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{question.text}</h5>
                    <div className="btn-group" style={{ width: '100%' }}>
                        {question.options.map(option => (
                            <button
                                key={option.id}
                                className={`btn ${selectedOptions[question.id] === option.id ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => onOptionSelect(question.id, option.id)}
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    minHeight: '100px', // Adjust the height as needed
                                    color: selectedOptions[question.id] === option.id ? '#fff' : '#000' // black if unselected, white if selected
                                }}
                            >
                                <div>{option.text}</div>
                                <br />
                                <div
                                    className={`d-flex flex-wrap ${(!hideIconsUntilSelected || selectedOptions[question.id] === option.id) ? 'fade-in' : 'hidden'}`}
                                    style={{
                                        marginTop: 'auto', // Push impressions to the bottom
                                        justifyContent: 'flex-start', // Align impressions to the left
                                        alignSelf: 'flex-start' // Ensure the container itself is aligned to the left
                                    }}>
                                    {option.impacts.map(impact =>
                                            displayAffinities[impact.points as Affinity] && (
                                                <DisplayImpression
                                                    key={impact.categoryId}
                                                    impact={impact}
                                                    showImpactPointsOnTooltip={showImpactPointsOnTooltip}
                                                />
                                            )
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };


    const renderQuestionCards = () => questions.map(renderQuestionSelector);

    const renderControlButtons = () => {
        return (
            <div className="btn-group mt-3">
                <button className="btn btn-success mx-1" onClick={onSubmit}>
                    Submit
                </button>
                <button className="btn btn-info mx-1" onClick={onRandomize}>
                    Randomize
                </button>
                <button className="btn btn-secondary mx-1" onClick={onClear}>
                    Clear
                </button>
            </div>
        );
    };

    return (
        <div className="container">
            <div className="row justify-content-around">
                <div className="col-md-9" style={{ marginBottom: '2rem' }}>
                    {renderQuestionCards()}
                    {renderControlButtons()}
                </div>
                <div>
                    <ResultsTable results={results} />
                </div>
            </div>
        </div>
    );
};

export default Questionnaire;
