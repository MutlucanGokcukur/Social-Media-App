<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="main-left col-span-1">
            <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
                <img src="@/assets/images/default_user_1/default_user_1_300.jpeg" class="mb-6 rounded-full">
                
                <p><strong>{{ state.user.name }}</strong></p>

                <div class="mt-6 flex space-x-8 justify-around">
                    <p class="text-xs text-gray-500">{{ state.user.friends_count }} friends</p>
                    <p class="text-xs text-gray-500">120 posts</p>
                </div>
                
            </div>
        </div>

        <div class="main-center col-span-2 space-y-4">
            <div 
                class="p-4 bg-white border border-gray-200 rounded-lg grid"
                v-if="state.friendshipRequests.length>0"
            >
                <h2 class="mb-6 text-xl">Friendship Requests</h2>
                <div 
                    class="p-4 text-center bg-gray-100 rounded-lg"
                    v-for="friendshiprequest in state.friendshipRequests"
                    :key="friendshiprequest.id"
                >
                    <img src="@/assets/images/default_user_2/default_user_2_300.jpeg" class="mb-6 mx-auto rounded-full">
                
                    <p>
                        <strong>
                            <RouterLink :to="{ name: 'Profile', params: { id: friendshiprequest.created_by.id } }">{{ friendshiprequest.created_by.name }}</RouterLink>
                        </strong>
                    </p>

                    <div class="mt-6 flex space-x-8 justify-around">
                        <p class="text-xs text-gray-500">{{ friendshiprequest.friends_count }} friends</p>
                        <p class="text-xs text-gray-500">120 posts</p>
                    </div>

                    <div class="mt-6 space-x-4">
                        <button 
                            class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg"
                            @click="handleRequest('accepted', friendshiprequest.created_by.id)"
                        >
                            Accept
                        </button>

                        <button 
                            class="inline-block py-4 px-6 bg-red-600 text-white rounded-lg"
                            @click="handleRequest('rejected', friendshiprequest.created_by.id)"
                        >
                            Reject
                        </button>
                    </div>
                </div>
                <hr>
            </div>

            <div 
                class="p-4 bg-white border border-gray-200 rounded-lg grid"
                v-if="state.friends.length>0"
            >
                <div 
                    class="p-4 text-center bg-gray-100 rounded-lg"
                    v-for="user in state.friends"
                    :key="user.id"
                >
                    <img src="@/assets/images/default_user_2/default_user_2_300.jpeg" class="mb-6 mx-auto rounded-full">
                
                    <p>
                        <strong>
                            <RouterLink :to="{name: 'Profile', params:{'id': user.id}}">{{ user.name }}</RouterLink>
                        </strong>
                    </p>

                    <div class="mt-6 flex space-x-8 justify-around">
                        <p class="text-xs text-gray-500">{{ user.friends_count }} friends</p>
                        <p class="text-xs text-gray-500">120 posts</p>
                    </div>

                </div>
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
import { friendsFunctionalities } from '@/composables/FriendsView/Friends';

const { state, userStore, formatTextWithBreaks, submitForm, sendFriendshipRequest, handleRequest } = friendsFunctionalities();
</script>