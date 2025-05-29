const QuestionAnswer = require("../models/Questions");

// קבלת כל השאלות והתשובות
const getQuestionsAnswers = async (req, res) => {
    try {
        const questionsAnswers = await QuestionAnswer.find({}).lean();
        if (!questionsAnswers.length) {
            return res.status(400).json({
                error: true,
                message: "No questions or answers found",
                data: null
            });
        }
        res.json({
            error: false,
            message: '',
            data: questionsAnswers
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            message: 'Error fetching questions and answers',
            data: null
        });
    }
};

// קבלת שאלה ותשובה בודדת לפי מזהה
const getQuestionAnswer = async (req, res) => {
    const { id } = req.params;
    try {
        const questionAnswer = await QuestionAnswer.findById(id).lean();
        if (!questionAnswer) {
            return res.status(400).json({
                error: true,
                message: 'No question or answer found',
                data: null
            });
        }
        res.json({
            error: false,
            message: '',
            data: questionAnswer
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            message: 'Error fetching question and answer',
            data: null
        });
    }
};

// הוספת שאלה חדשה בלבד
const addQuestion = async (req, res) => {
    const { firstName, phone, question } = req.body;

    if (!firstName || !phone || !question) {
        return res.status(400).json({
            error: true,
            message: 'Fields firstName, phone, and question are required',
            data: null
        });
    }

    try {
        const newQuestion = await QuestionAnswer.create({
            firstName,
            phone,
            question
        });
        res.status(201).json({
            error: false,
            message: 'New question created',
            data: newQuestion
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            message: 'Error creating question',
            data: null
        });
    }
};

// הוספת תשובה לשאלה קיימת
const addAnswer = async (req, res) => {
    const { id, answer } = req.body;

    if (!id || !answer) {
        return res.status(400).json({
            error: true,
            message: 'Fields id and answer are required',
            data: null
        });
    }

    try {
        const questionAnswer = await QuestionAnswer.findById(id);
        if (!questionAnswer) {
            return res.status(400).json({
                error: true,
                message: 'Question not found',
                data: null
            });
        }

        questionAnswer.answer = answer;
        const updatedQuestionAnswer = await questionAnswer.save();
        res.json({
            error: false,
            message: 'Answer added successfully',
            data: updatedQuestionAnswer
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Error adding answer',
            data: null
        });
    }
};

// עדכון שאלה ותשובה קיימת
const updateQuestionAnswer = async (req, res) => {
    const { id, firstName, phone, question, answer } = req.body;

    if (!id || !firstName || !phone || !question) {
        return res.status(400).json({
            error: true,
            message: 'Fields id, firstName, phone, and question are required',
            data: null
        });
    }

    try {
        const questionAnswer = await QuestionAnswer.findById(id);
        if (!questionAnswer) {
            return res.status(400).json({
                error: true,
                message: 'Question and answer not found',
                data: null
            });
        }

        questionAnswer.firstName = firstName;
        questionAnswer.phone = phone;
        questionAnswer.question = question;
        questionAnswer.answer = answer;

        const updatedQuestionAnswer = await questionAnswer.save();
        res.json({
            error: false,
            message: `${updatedQuestionAnswer.firstName} updated`,
            data: updatedQuestionAnswer
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            message: 'Error updating question and answer',
            data: null
        });
    }
};

// מחיקת שאלה ותשובה
const deleteQuestionAnswer = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            error: true,
            message: 'Id is required',
            data: null
        });
    }

    try {
        const questionAnswer = await QuestionAnswer.findById(id);
        if (!questionAnswer) {
            return res.status(400).json({
                error: true,
                message: 'Question and answer not found',
                data: null
            });
        }

        const deletedQuestionAnswer = await questionAnswer.deleteOne();
        res.status(200).json({
            error: false,
            message: '',
            data: deletedQuestionAnswer
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            message: 'Error deleting question and answer',
            data: null
        });
    }
};

module.exports = {
    getQuestionsAnswers,
    getQuestionAnswer,
    addQuestion,
    addAnswer,
    updateQuestionAnswer,
    deleteQuestionAnswer
};