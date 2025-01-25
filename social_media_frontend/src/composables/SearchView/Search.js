//#region Imports
import { useGlobalContext } from '@/composables/GlobalContext';
//#endregion

export function searchFunctionalities()
{
    //#region Global Context
    const { appAxios, reactive, toastStore, formatTextWithBreaks } = useGlobalContext();
    //#endregion
    //#region State
    const state = reactive
    ({
        query: '',
        users: [],
        posts: [],
    });
    //#endregion
    //#region Submit Form
    async function submitForm() 
    {
        try 
        {
            const response = await appAxios.post('/api/search/', {query: state.query});

            if (response.status === 200) 
            {
                state.users = response.data.users;
                state.posts = response.data.posts;
                toastStore.showToast(5000, response.statusText, 'bg-green-300');
            }
        } 
        catch (apiError) 
        {
            console.error('API Error:', apiError);
            toastStore.showToast(5000, apiError.message, 'bg-red-300');
        }
    }
    //#endregion
    //#region Return
    return {
        state,
        formatTextWithBreaks,
        submitForm,
    }
    //#endregion
}