import { useContext, useState } from "react";
import { DataContext } from "../App";
import QuestionsData from "../data/QuestionsData"; 

const Quiz = () => {
    const [current, setCurrent] = useState(0);
    
    const [userAnswers, setUserAnswers] = useState(new Array(QuestionsData.length).fill(""));
    const { setScore, setAppState } = useContext(DataContext);

    const handleSelectChoice = (choice) => {
        const newAnswers = [...userAnswers];
        newAnswers[current] = choice; 
        setUserAnswers(newAnswers);
    };

    const previousQuestion = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    };

    const nextQuestion = () => {
        if (current < QuestionsData.length - 1) {
            setCurrent(current + 1);
        }
    };

    const submitQuiz = () => {
        let finalScore = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === QuestionsData[index].answer) {
                finalScore += 1;
            }
        });
        setScore(finalScore);
        setAppState("score"); 
    };

    return (
        <div className="quiz">
            <h1>{QuestionsData[current].question}</h1>
            <div className="choices">
                
                <button 
                    className={userAnswers[current] === "A" ? "selected" : ""} 
                    onClick={() => handleSelectChoice("A")}
                >
                    {QuestionsData[current].A}
                </button>
                <button 
                    className={userAnswers[current] === "B" ? "selected" : ""} 
                    onClick={() => handleSelectChoice("B")}
                >
                    {QuestionsData[current].B}
                </button>
                <button 
                    className={userAnswers[current] === "C" ? "selected" : ""} 
                    onClick={() => handleSelectChoice("C")}
                >
                    {QuestionsData[current].C}
                </button>
                <button 
                    className={userAnswers[current] === "D" ? "selected" : ""} 
                    onClick={() => handleSelectChoice("D")}
                >
                    {QuestionsData[current].D}
                </button>
            </div>
            
            <p>{current + 1} / {QuestionsData.length}</p>
            
           
            <div className="navigation">
               
                <button onClick={previousQuestion} disabled={current === 0}>
                    ย้อนกลับ
                </button>

                {current === QuestionsData.length - 1 ? (
                    <button onClick={submitQuiz}>ส่งคำตอบ</button>
                ) : (
                    <button onClick={nextQuestion}>ถัดไป</button>
                )}
            </div>
        </div>
    );
};

export default Quiz;