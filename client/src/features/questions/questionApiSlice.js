
import apiSlice from "../../app/apiSlice";


const questionAnswerApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllQuestionsAnswers: build.query({
            query: () => ({
                url: "/api/question/",
            }),
            providesTags: ["QuestionsAnswers"],
        }),
        addQuestion: build.mutation({
            query: (newQuestion) => ({
                url: "/api/question//addQuestion",
                method: "POST",
                body: newQuestion,
            }),
            invalidatesTags: ["QuestionsAnswers"],
        }),
        addAnswer: build.mutation({
            query: ({ id, answer }) => ({
                url: "/api/question/addAnswer",
                method: "POST",
                body: { id, answer },
            }),
            invalidatesTags: ["QuestionsAnswers"],
        }),
        updateQuestionAnswer: build.mutation({
            query: (updatedData) => ({
                url: "/api/question/",
                method: "PUT",
                body: updatedData,
            }),
            invalidatesTags: ["QuestionsAnswers"],
        }),
        deleteQuestionAnswer: build.mutation({
            query: ({ id }) => ({
                url: `/api/question/`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: ["QuestionsAnswers"],
        }),
    }),
});

export const {
    useGetAllQuestionsAnswersQuery,
    useAddQuestionMutation,
    useAddAnswerMutation,
    useUpdateQuestionAnswerMutation,
    useDeleteQuestionAnswerMutation,
} = questionAnswerApiSlice;

