<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="main-left col-span-2">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <h1 class="mb-6 text-2xl font-semibold">Welcome Back!</h1>

                <p class="mb-6 text-gray-500">
                    Log in to your account to access personalized features and continue where you left off. 
                    We’re happy to see you again!
                </p>

                <p class="font-bold">
                    Don’t have an account yet? 
                    <router-link :to="{name:'Signup'}" class="underline text-purple-600">
                        Sign up here
                    </router-link> 
                    to get started!
                </p>
            </div>
        </div>

        <div class="main-center col-span-2 space-y-4">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <form class="space-y-6" @submit.prevent="submitForm">
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
                            v-model="state.form.password"
                            id="password"
                            type="password" 
                            placeholder="Enter your password" 
                            class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
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
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useLogin } from '@/composables/LoginView/Login.js';

const { submitForm, state } = useLogin();
</script>
