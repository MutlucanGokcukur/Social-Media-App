//#region Imports
import { useGlobalContext } from '@/composables/GlobalContext';
import { onMounted, watch } from 'vue';
import { feedPostSocketFunctionalities } from '@/sockets/FeedView/FeedSocket';
//#endregion

export function profileFunctionalities()
{
    //#region Global Context
    const { appAxios, reactive, toastStore, userStore, route, formatTextWithBreaks } = useGlobalContext();
    //#endregion
    //#region State
    const state = reactive
    ({
        posts: [],
        form : {},
        user : 
        {
            id:null,
        },
    });
    //#endregion
    //#region On Mounted
    onMounted(async () => 
    {
        await getProfileFeeds();
        feedPostSocketFunctionalities(addNewPost); 
    });
    //#endregion
    //#region Watch Profile Link ID
    watch(() => route.params.id,async (newId, oldId) => 
    {
        await getProfileFeeds();
    },
    {immediate: true,});
    //#endregion
    //#region Add New Post
    function addNewPost(newPostData) 
    {
        state.posts.unshift(newPostData);
    };
    //#endregion   
    //#region Fetch Feeds
    async function getProfileFeeds()
    {
        try
        {
            const userID        = route.params.id;
            const response      = await appAxios.get(`/api/posts/profile/${userID}/`);
            state.posts         = response.data.posts;
            state.user          = response.data.user;

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
            const response      = await appAxios.post(`/api/friends/${userID}/request/`);
            
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
    //#region Return
    return {
        state,
        userStore,
        formatTextWithBreaks,
        submitForm,
        sendFriendshipRequest,
    }
    //#endregion
}