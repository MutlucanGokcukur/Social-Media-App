//#region Imports
import { useGlobalContext } from '@/composables/GlobalContext';
import { onMounted, watch } from 'vue';
//#endregion

export function feedFunctionalities()
{
    //#region Global Context
    const { appAxios, reactive, toastStore, formatTextWithBreaks, feedSocket } = useGlobalContext();
    //#endregion
    //#region State
    const state = reactive
    ({
        posts: [],
        form : {},
    });
    //#endregion
    //#region On Mounted
    onMounted(async()=>
    {
        feedSocket.connectSocket();
        await getFeeds();
    });
    //#endregion
    //#region Watch Feed Socket Received Datas
    watch(() => feedSocket.receivedData, (data) => 
    {
        const action = data.action;
        if (action === 'created')
        {
            state.posts.unshift(data.post);
        }
        else if(action === 'deleted')
        {
            const findData = state.posts.find(i=> i.id === data.post.id);

            if (findData)
            {
                state.posts = state.posts.filter(i => i.id !== data.post.id);
            }
        }
    });
    //#endregion
    //#region Fetch Feeds
    async function getFeeds()
    {
        try
        {
            const feedResponse = await appAxios.get('/api/posts/');
            state.posts = feedResponse.data;
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
    //#region Return
    return {
        state,
        formatTextWithBreaks,
        submitForm,
    }
    //#endregion
}