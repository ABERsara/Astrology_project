import apiSlice from "../app/apiSlice"

const contactApiSlice = apiSlice.injectEndpoints(
    {
        endpoints: (build) => ({
            getAllContacts: build.query({
                query: () => ({
                    url: "api/contacts"
                }),
                providesTags:["contacts"]

            }),
            getContact: build.query({
                query: (id) => ({
                  url: `api/contacts/${id}`,
                  method: "GET",
                }),
                providesTags: ["contacts"],
              }),
              
            addContact:build.mutation({
                query: (contact) => ({
                    url: "api/contacts",
                    method:"POST",
                    body:contact
                }),
                invalidatesTags:["contacts"]
            }),
            updateContact:build.mutation({
                query: (contact) => ({
                    url: "api/contacts",
                    method:"PUT",
                    body:contact
                }),
                invalidatesTags:["contacts"]
            }),
            deleteContact:build.mutation({
                query: ({id}) => ({
                    url:    `api/contacts/${id}`,
                    method:"PUT",
                    body:{id}
                }),
                invalidatesTags:["contacts"]
            }),
        })
    }
)

export const {useGetAllContactsQuery,
    useAddContactMutation,
    useUpdateContactMutation,
useDeleteContactMutation,useGetContactQuery}=contactApiSlice