<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="main-left col-span-2">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <h1 class="mb-6 text-2xl font-semibold">Sign Up</h1>

                <p class="mb-6 text-gray-500">
                    Welcome! Create an account to enjoy personalized features and seamless access to all our services. 
                    Signing up is quick and easy!
                </p>

                <p class="font-bold">
                    Already have an account? 
                    <router-link :to="{name:'Login'}" class="underline text-purple-600">
                        Click here
                    </router-link> 
                    to log in!
                </p>
            </div>
        </div>

        <div class="main-center col-span-2 space-y-4">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <form class="space-y-6" @submit.prevent="submitForm">
                    <div>
                        <label for="name" class="block text-gray-700 font-medium">Name</label>
                        <input
                            v-model="state.form.name"
                            id="name"
                            type="text" 
                            placeholder="Your full name" 
                            class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        >
                    </div>

                    <div>
                        <label for="email" class="block text-gray-700 font-medium">E-mail Address</label>
                        <input 
                            v-model="state.form.email"
                            id="email"
                            type="email" 
                            placeholder="Enter your e-mail address" 
                            class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        >
                    </div>

                    <div>
                        <label for="password" class="block text-gray-700 font-medium">Password</label>
                        <input
                            v-model="state.form.password1"
                            id="password"
                            type="password" 
                            placeholder="Create a strong password" 
                            class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        >
                    </div>

                    <div>
                        <label for="confirm-password" class="block text-gray-700 font-medium">Confirm Password</label>
                        <input
                            v-model="state.form.password2"
                            id="confirm-password"
                            type="password" 
                            placeholder="Repeat your password" 
                            class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                            @paste.prevent
                            @copy.prevent
                            @cut.prevent
                        >
                    </div>

                    <template v-if="state.errors.length > 0">
                        <div class="bg-red-300 text-white rounded-lg p-6">
                            <p v-for="error in state.errors" :key="error">{{ error }}</p>
                        </div>
                    </template>

                    <div class="flex justify-end">
                        <button 
                            type="submit" 
                            class="w-25 py-4 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useSignup} from '@/composables/SignupView/Signup';
const { submitForm, state } = useSignup();
</script>