import  { useGlobalContext } from '@/composables/GlobalContext';
import { onMounted } from 'vue';

export function feedFunctionalities()
{
    const { appAxios, reactive, toastStore, router, userStore } = useGlobalContext();
    
    const state = reactive({
        posts:[],
    });

    onMounted(async()=>
    {       
        await getFeeds();
    });

    async function getFeeds()
    {
        try
        {
            const feedResponse = await appAxios.get('/api/posts/');
            console.log(feedResponse.data);
            state.posts = feedResponse.data;
        }
        catch (apiError)
        {
            console.error('API Error:', apiError);
            toastStore.showToast(5000, apiError.message, 'bg-red-300');
        }
    }

    return {
        state
    }
}