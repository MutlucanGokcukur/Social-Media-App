import { useUserStore } from '@/stores/user';
import { useToastStore } from '@/stores/toast';
import { reactive } from 'vue';
import  router from '@/router/index';
import { useRoute } from "vue-router";
import  appAxios from '@/utils/appAxios';

export function useGlobalContext() 
{
    const userStore  = useUserStore();
    const toastStore = useToastStore();
    const route = useRoute();

    return {      
        userStore,   
        toastStore,
        appAxios,
        route,
        router,
        reactive
    };
}
