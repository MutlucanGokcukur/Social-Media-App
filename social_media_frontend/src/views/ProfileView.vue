<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="main-left col-span-1">
            <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
                <img src="@/assets/images/default_user_1/default_user_1_300.jpeg" class="mb-6 rounded-full">
                
                <p><strong>{{ state.user.name }}</strong></p>

                <div class="mt-6 flex space-x-8 justify-around">
                    <RouterLink :to="{ name: 'Friends', params: { id: state.user.id } }" class="text-xs text-gray-500"><p class="text-xs text-gray-500">{{ state.user.friends_count }} friends</p></RouterLink>
                    <p class="text-xs text-gray-500">120 posts</p>
                </div>

                <div class="mt-6">
                    <button class="inline-block py-4 px-3 bg-purple-600 text-xs text-white rounded-lg" @click="sendFriendshipRequest">Send friendship request</button>
                </div>

            </div>
        </div>

        <div class="main-center col-span-2 space-y-4">
            <div 
                class="bg-white border border-gray-200 rounded-lg"
                v-if="userStore.user.id === state.user.id"
            >
                <form action="post" @submit.prevent="submitForm">
                    <div class="p-4">  
                        <textarea 
                            v-model="state.form.body"
                            class="p-4 w-full bg-gray-100 rounded-lg" 
                            placeholder="What are you thinking about?"
                        ></textarea>
                    </div>

                    <div class="p-4 border-t border-gray-100 flex justify-between">
                        <a href="#" class="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg">Attach image</a>

                        <button class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg">Post</button>
                    </div>
                </form>
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
import  PeopleYouMayNow from '@/components/PeopleYouMayNow.vue';
import  Trends from '@/components/Trends.vue';
import FeedItem from '@/components/FeedItem.vue';
import { profileFunctionalities } from '@/composables/ProfileView/Profile';
import { RouterLink } from 'vue-router';

const { state, userStore, formatTextWithBreaks, submitForm, sendFriendshipRequest } = profileFunctionalities();
</script>