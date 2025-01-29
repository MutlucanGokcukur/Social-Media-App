import { onBeforeMount } from 'vue';
import { useGlobalContext } from '@/composables/GlobalContext';

export function useAuth() 
{
    const { appAxios, userStore } = useGlobalContext();

    const initAuth = () => 
    {
        userStore.initStore();

        const token = userStore.user.access;

        if (token) 
        {
            appAxios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } 
        else 
        {
            appAxios.defaults.headers.common["Authorization"] = "";
        }
    };

    onBeforeMount(() => 
    {
        initAuth();
    });

    return {
        userStore,
    };
}
