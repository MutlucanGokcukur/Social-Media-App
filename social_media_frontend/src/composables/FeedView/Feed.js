import  { useGlobalContext } from '@/composables/GlobalContext';
import { onMounted } from 'vue';

export function feedFunctionalities()
{
    const { appAxios, reactive, toastStore, router, userStore } = useGlobalContext();
    
    const state = reactive({
        posts: [],
        form : {},
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
            state.posts = feedResponse.data;
        }
        catch (apiError)
        {
            console.error('API Error:', apiError);
            toastStore.showToast(5000, apiError.message, 'bg-red-300');
        }
    }

    async function submitForm()
    {
        try
        {
            const response = await appAxios.post('/api/posts/create/', state.form);
            
            if (response.status === 201)
            {
                toastStore.showToast(5000, response.statusText, 'bg-green-300');
            }
        }
        catch (apiError)
        {
            console.error('API Error:', apiError);
            toastStore.showToast(5000, apiError.message, 'bg-red-300');
        }
    }

    return {
        state,
        submitForm
    }
}