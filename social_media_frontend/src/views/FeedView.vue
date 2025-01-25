<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="main-center col-span-3 space-y-4">
            <div class="bg-white border border-gray-200 rounded-lg">
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
import PeopleYouMayNow from '@/components/PeopleYouMayNow.vue';
import Trends from '@/components/Trends.vue';
import FeedItem from '@/components/FeedItem.vue';
import { feedFunctionalities } from '@/composables/FeedView/Feed';

const { state, submitForm,formatTextWithBreaks } = feedFunctionalities();
</script>