import React from 'react';
import { Category, Question, Result } from '../../common/interfaces';
import ResultsTable from '../results_table/results_table';

interface QuestionnaireProps {
    questions: Question[];
    categories: Category[];
    selectedOptions: Record<number, number>;
    onOptionSelect: (questionId: number, optionId: number) => void;
    onSubmit: () => void;
    onClear: () => void;
    onRandomize: () => void;
    results: Result[];
}

const Questionnaire: React.FC<QuestionnaireProps> = ({
                                                         questions,
                                                         categories,
                                                         selectedOptions,
                                                         onOptionSelect,
                                                         onSubmit,
                                                         onClear,
                                                         onRandomize,
                                                         results
                                                     }) => {
    const renderQuestionSelector = (question: Question) => {
        return (
            <div key={question.id} className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{question.text}</h5>
                    <div className="btn-group">
                        {question.options.map(option => (
                            <button
                                key={option.id}
                                className={`btn ${selectedOptions[question.id] === option.id ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => onOptionSelect(question.id, option.id)}
                            >
                                {option.text}
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
                <button className="btn btn-success" onClick={onSubmit}>
                    Submit
                </button>
                <button className="btn btn-info" onClick={onRandomize}>
                    Randomize
                </button>
                <button className="btn btn-secondary" onClick={onClear}>
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
