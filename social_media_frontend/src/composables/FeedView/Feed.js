//#region Imports
import { useGlobalContext } from '@/composables/GlobalContext';
import { onMounted } from 'vue';
import { feedPostSocketFunctionalities } from '@/sockets/FeedView/FeedSocket';
//#endregion

export function feedFunctionalities()
{
    //#region Global Context
    const { appAxios, reactive, toastStore, formatTextWithBreaks } = useGlobalContext();
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
        await getFeeds();
        feedPostSocketFunctionalities(addNewPost); 
    });
    //#endregion
    //#region Add New Post
    function addNewPost(newPostData) 
    {
        state.posts.unshift(newPostData);
    };
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