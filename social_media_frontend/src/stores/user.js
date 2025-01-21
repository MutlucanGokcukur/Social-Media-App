import { defineStore } from 'pinia';
import SecureLS from 'secure-ls';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import appAxios from '@/utils/appAxios';

const ls = new SecureLS({ encodingType: 'aes', isCompression: false });

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: {
            isAuthenticated: false,
            id             : null,
            name           : null,
            email          : null,
            access         : null,
            refresh        : null,
        },
    }),
    actions: {
        initStore() {
            const encryptedUser = ls.get('user');

            if (encryptedUser && encryptedUser.access) 
            {
                this.user.access          = encryptedUser.access;
                this.user.refresh         = encryptedUser.refresh;
                this.user.id              = encryptedUser.id;
                this.user.name            = encryptedUser.name;
                this.user.email           = encryptedUser.email;
                this.user.isAuthenticated = true;

                this.refreshToken();
            }
        },

        setToken(data) 
        {
            this.user.access          = data.access;
            this.user.refresh         = data.refresh;
            this.user.isAuthenticated = true;

            this._updateSecureStorage();
        },

        removeToken() 
        {
            this.user.refresh         = null;
            this.user.access          = null;
            this.user.isAuthenticated = false;
            this.user.id              = null;
            this.user.name            = null;
            this.user.email           = null;

            ls.remove('user');
        },

        setUserInfo(user) 
        {
            this.user.id    = user.id;
            this.user.name  = user.name;
            this.user.email = user.email;

            this._updateSecureStorage();
        },

        refreshToken() 
        {
            appAxios.post('/api/refresh/', 
            {
                refresh: this.user.refresh,
            }).then((response) => 
            {
                    this.user.access = response.data.access;
                    this._updateSecureStorage();

                    appAxios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access;
            }).catch((error) => 
            {
                    console.log(error);
                    this.removeToken();
            });
        },

        _updateSecureStorage() 
        {
            ls.set('user', 
            {
                access         : this.user.access,
                refresh        : this.user.refresh,
                id             : this.user.id,
                name           : this.user.name,
                email          : this.user.email,
                isAuthenticated: this.user.isAuthenticated,
            });
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
