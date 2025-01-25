<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="main-center col-span-3 space-y-4">
            <div class="bg-white border border-gray-200 rounded-lg">
                <form 
                    class="p-4 flex space-x-4"
                    @submit.prevent="submitForm"
                    >  
                        <input 
                            v-model     = state.query
                            type        = "search"
                            class       = "p-4 w-full bg-gray-100 rounded-lg"
                            placeholder = "What are you looking for?"
                        >

                    <button class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>  
                    </button>
                </form>
            </div>

            <div 
                class="p-4 bg-white border border-gray-200 rounded-lg grid grid-cols-4 gap-4"
                v-if="state.users.length>0"
            >
                <div 
                    class="p-4 text-center bg-gray-100 rounded-lg"
                    v-for="user in state.users"
                    :key="user.id"
                >
                    <img src="@/assets/images/default_user_2/default_user_2_300.jpeg" class="mb-6 rounded-full">
                
                    <p>
                        <strong>
                            <RouterLink :to="{ name: 'Profile', params: { id: user.id } }">{{ user.name }}</RouterLink>
                        </strong>
                    </p>

                    <div class="mt-6 flex space-x-8 justify-around">
                        <p class="text-xs text-gray-500">182 friends</p>
                        <p class="text-xs text-gray-500">120 posts</p>
                    </div>
                </div>
            </div>

            <div 
                class="p-4 bg-white border border-gray-200 rounded-lg"
                v-for="post in state.posts"
                :key="post.id"
            >
                <FeedItem :post="post" :formatTextWithBreaks="formatTextWithBreaks"/>
            </div>
        </div>

        <div class="main-right col-span-1 space-y-4">
            
            <PeopleYouMayNow/>

            <Trends/>

        </div>
    </div>
</template>

<script setup>
import PeopleYouMayNow from '@/components/PeopleYouMayNow.vue';
import Trends from '@/components/Trends.vue';
import FeedItem from '@/components/FeedItem.vue';
import { searchFunctionalities } from '@/composables/SearchView/Search';

const { state, submitForm, formatTextWithBreaks } = searchFunctionalities();
</script>