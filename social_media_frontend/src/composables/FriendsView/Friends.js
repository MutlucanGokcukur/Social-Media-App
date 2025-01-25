//#region Imports
import { useGlobalContext } from '@/composables/GlobalContext';
import { onMounted } from 'vue';
//#endregion

export function friendsFunctionalities()
{
    //#region Global Context
    const { appAxios, reactive, toastStore, userStore, route, formatTextWithBreaks } = useGlobalContext();
    //#endregion
    //#region State
    const state = reactive
    ({
        friendshipRequests: [],
        friends           : [],
        user              : {},
    });
    //#endregion
    //#region On Mounted
    onMounted(async () => 
    {
        getFriends();
    });
    //#endregion
    //#region Fetch Friends
    async function getFriends()
    {
        try
        {
            const userID                   = route.params.id;
            const response                 = await appAxios.get(`/api/friends/${userID}/`);
            console.log(response.data);
            state.friendshipRequests       = response.data.requests;
            state.friends                  = response.data.friends;
            state.user                     = response.data.user;

        }
        catch (apiError)
        {
            console.error('API Error:', apiError);
            toastStore.showToast(5000, apiError.message, 'bg-red-300');
        }
    }
    //#endregion
    //#region Submit Form
    async function submitForm()
    {
        try
        {
            const response = await appAxios.post('/api/posts/create/', state.form);
            
            if (response.status === 201)
            {
                state.form = {};
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
    //#region Send Friendship Request
    async function sendFriendshipRequest()
    {
        try
        {
            const userID        = route.params.id;
            const response      = await appAxios.post(`/api/friends/request/${userID}/`);
            
            if (response.status === 201)
            {
                toastStore.showToast(5000, response.data.message, 'bg-green-300');
            }
        }
        catch (apiError)
        {
            console.error('API Error:', apiError);
            toastStore.showToast(5000, apiError.message, 'bg-red-300');
        }
    }
    //#endregion

    async function handleRequest(status, pk)
    {
        try
        {
            const response      = await appAxios.post(`/api/friends/${pk}/${status}/`);
            console.log(response.data);
            
            if (response.status === 200)
            {
                toastStore.showToast(5000, response.data.message, 'bg-green-300');
            }
        }
        catch (apiError)
        {
            console.error('API Error:', apiError);
            toastStore.showToast(5000, apiError.message, 'bg-red-300');
        }
    }
    //#region Return
    return {
        state,
        userStore,
        formatTextWithBreaks,
        submitForm,
        sendFriendshipRequest,
        handleRequest,
    }
    //#endregion
}