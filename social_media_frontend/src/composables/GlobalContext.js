import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import {useToastStore} from '@/stores/toast';
import { inject, reactive } from 'vue';

export function useGlobalContext() 
{
    const userStore  = useUserStore();
    const toastStore = useToastStore();
    const router     = useRouter();
    const appAxios   = inject('appAxios');

    return {      
        userStore,   
        toastStore,
        appAxios,
        router,
        reactive
    };
}
