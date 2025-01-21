import  { useGlobalContext } from '@/composables/GlobalContext';


export function useSignup() 
{
    const { appAxios, reactive, toastStore, router } = useGlobalContext();

    const state = reactive({
        form: 
        {
            name     : '',
            email    : '',
            password1: '',
            password2: '',
        },
        errors: [],
    })

    async function submitForm() 
    {
        try 
        {
            state.errors = [];

            if (state.name === '') 
            {
                state.errors.push('Name is required');
            }
    
            if (state.email === '') 
            {
                state.errors.push('Email is required');
            }
    
            if (state.password1 === '') 
            {
                state.errors.push('Password is required');
            }
    
            if (state.password1 !== state.password2) 
            {
                state.errors.push('Passwords do not match');
            }

            if (state.errors.length === 0) 
            {
                try 
                {
                    const response = await appAxios.post('/api/signup/', state.form);
    
                    if (response.data.status === 200) 
                    {
                        toastStore.showToast(5000, 'The user is registered. Please log-in', 'bg-green-300');
                        state.form = {};
                        router.push({ name: 'Login' });
                    } 
                    else 
                    {
                        toastStore.showToast(5000, 'Something went wrong. Please try again', 'bg-red-300');
                    }
                } 
                catch (apiError) 
                {
                    state.errors = apiError.response.data.errors;
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
