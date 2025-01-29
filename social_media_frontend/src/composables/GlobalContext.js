import { useUserStore } from '@/stores/user';
import { useToastStore } from '@/stores/toast';
import { reactive } from 'vue';
import  router from '@/router/index';
import { useRoute } from "vue-router";
import  appAxios from '@/utils/appAxios';
import { useFeedSocket } from '@/stores/sockets/FeedSocket';

export function useGlobalContext() 
{
    const userStore  = useUserStore();
    const toastStore = useToastStore();
    const feedSocket = useFeedSocket();
    const route = useRoute();

    //#region Editing enter keys in posts
    const formatTextWithBreaks = (text) => 
    {
        return text.replace(/\r?\n/g, '<br>');
    };
    //#endregion
    //#region Return
    return {      
        userStore,   
        toastStore,
        appAxios,
        route,
        router,
        reactive,
        feedSocket,
        formatTextWithBreaks
    };
    //#endregion
}
