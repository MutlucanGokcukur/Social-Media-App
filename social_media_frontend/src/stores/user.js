import { defineStore } from 'pinia';
import SecureLS from 'secure-ls';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import appAxios from '@/utils/appAxios';
const ls = new SecureLS({ isCompression: false });

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: 
        {
            isAuthenticated: false,
            id             : null,
            name           : null,
            email          : null,
            access         : null,
            refresh        : null,
        },
    }),
    actions: 
    {
        initStore() 
        {
            if (localStorage.getItem('user.access'))
            {
                this.user.access          = localStorage.getItem('user.access');
                this.user.refresh         = localStorage.getItem('user.refresh');
                this.user.id              = localStorage.getItem('user.id');
                this.user.name            = localStorage.getItem('user.name');
                this.user.email           = localStorage.getItem('user.email');
                this.user.isAuthenticated = true;

                this.refreshToken();
            }
        },

        setToken(data)
        {
            console.log('setToken', data);

            this.user.access          = data.access;
            this.user.refresh         = data.refresh;
            this.user.isAuthenticated = true;

            localStorage.setItem('user.access', data.access);
            localStorage.setItem('user.refresh', data.refresh);
        },
        removeToken()
        {
            this.user.refresh         = null;
            this.user.access          = null;
            this.user.isAuthenticated = false;
            this.user.id              = null;
            this.user.name            = null;
            this.user.email           = null;

            localStorage.setItem('user.access', '');
            localStorage.setItem('user.refresh', '');
            localStorage.setItem('user.id', '');
            localStorage.setItem('user.name', '');
            localStorage.setItem('user.email', '');
        },

        setUserInfo(user)
        {
            this.user.id    = user.id;
            this.user.name  = user.name;
            this.user.email = user.email;

            localStorage.setItem('user.id', this.user.id);
            localStorage.setItem('user.name', this.user.name);
            localStorage.setItem('user.email', this.user.email);
        },

        refreshToken() {
            appAxios.post('/api/account/refresh/', 
            {
                refresh: this.user.refresh
            }).then((response) => 
            {
                this.user.access = response.data.access
                localStorage.setItem('user.access', response.data.access)
                axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
            }).catch((error)=>
            {
                console.log(error)

                this.removeToken()
            })
        },
    },
    persist: 
    {
        key: 'user',
        storage: 
        {
            getItem   : (key) => ls.get(key),
            setItem   : (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
        },
    },
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

export default pinia;
