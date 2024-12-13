import apiSlice from "../../../app/apiSlice";

const diagnosisApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllDiagnosis: build.query({
            query: () => ({
                url: "/api/diagnosis"
            }),
            providesTags: ["Diagnosises"]

        }),
        addDiagnosis: build.mutation({
            query: (diagnosis) => ({
               url: "/api/diagnosis",
                method: "POST",
                body: diagnosis
            }),
            invalidatesTags: ["Diagnosises"]
        }),
        updateDiagnosis: build.mutation({
            query: (diagnosis) => ({
                url: "/api/diagnosis",
                method: "PUT",
                body: diagnosis
            }),
            invalidatesTags: ["Diagnosises"]
        }),
        deleteDiagnosis: build.mutation({
            query: ({ id }) => ({
                url: `/api/diagnosis/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Diagnosises"]
        })
    })

})

export const { useGetAllDiagnosisQuery,
    useAddDiagnosisMutation,
    useUpdateDiagnosisMutation,
    useDeleteDiagnosisMutation

} = diagnosisApiSlice