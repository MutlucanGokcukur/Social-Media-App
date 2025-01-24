import { useUserStore } from '@/stores/user';
import { useToastStore } from '@/stores/toast';
import { reactive } from 'vue';
import  router from '@/router/index';
import  appAxios from '@/utils/appAxios';

export function useGlobalContext() 
{
    const userStore  = useUserStore();
    const toastStore = useToastStore();

    return {      
        userStore,   
        toastStore,
        appAxios,
        router,
        reactive
    };
}
