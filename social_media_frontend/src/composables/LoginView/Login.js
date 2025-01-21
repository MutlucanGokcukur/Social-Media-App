import  { useGlobalContext } from '@/composables/GlobalContext';

export function useLogin() 
{
    const { appAxios, reactive, toastStore, router, userStore } = useGlobalContext();

    const state = reactive({
        form: 
        {
            email   : '',
            password: '',
        },
        errors: [],
    })

    async function submitForm() 
    {
        try 
        {
            state.errors = [];
    
            if (state.email === '') 
            {
                state.errors.push('Email is missing');
            }
    
            if (state.password === '') 
            {
                state.errors.push('Password is missing');
            }

            if (state.errors.length === 0) 
            {
                try 
                {
                    const loginResponse = await appAxios.post('/api/login/', state.form);
                    userStore.setToken(loginResponse.data);

                    appAxios.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.data.access}`;

                    const userResponse = await appAxios.get('/api/me/');
                    userStore.setUserInfo(userResponse.data);
                    router.push({ name: 'Feed' });
                } 
                catch (apiError) 
                {
                    state.errors.push(apiError.response.data.detail);
                    toastStore.showToast(5000, apiError.message, 'bg-red-300');
                }
            } 
            else 
            {
                toastStore.showToast(5000, 'Please fix the errors before submitting.', 'bg-red-300');
            }
        } 
        catch (error) 
        {
            console.error('General Error:', error);
            toastStore.showToast(5000, 'An error occurred. Please try again later.', 'bg-red-300');
        }
    }

    return { submitForm, state };
}
