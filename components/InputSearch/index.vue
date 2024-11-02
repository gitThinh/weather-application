<template>
  <div class="w-full">
    <div class="relative z-50">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg text-left border shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
      >
      <input
      @focusin="isOpen = true"
      @focusout="closeDropdownWithDelay"
          type="text"
          class="w-full border-none outline-none py-2 pl-3 pr-5 text-sm leading-5 bg-neutral-500 bg-opacity-30 text-neutral-50 focus:ring-0"
          placeholder="search location..."
          v-model="query"
        />
        <span
          v-if="query"
          class="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 w-4 h-4 hover:bg-neutral-200 rounded-full -translate-x-1/2 z-10 hover:"
        >
          <!-- @click.stop="query = ''" -->
          <NuxtIcon name="ic:outline-close" class="w-4 h-4" />
        </span>
      </div>
      <HeadlessTransitionRoot
        :show="isOpen"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @afterLeave="query = query"
      >
        <!-- show recent search -->
        <div v-if="!query">
          <div
            v-if="recentSelected.length > 0"
            class="absolute py-3 px-2 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ul
              v-for="(recent, index) in recentSelected.slice(0, 5)"
              :key="recent.lat + recent.lon"
            >
              <!-- @click="() => console.log(recent)" -->
              <li
                class="relative cursor-pointer select-none text-neutral-900 py-2 px-3 rounded-md hover:bg-neutral-50"
                @click="handleSelectedLocation(recent)"
              >
                <p class="truncate w-11/12 font-normal">
                  {{ convertLocation(recent) }}
                </p>
                <span
                  class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 hover:bg-neutral-200 rounded-full -translate-x-1/2 z-10 hover:"
                  @click.stop="deleteRecentSuggestion(index)"
                >
                  <NuxtIcon name="ic:outline-close" class="w-4 h-4" />
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- show suggestion search -->
        <div
          v-else
          class="absolute py-3 px-2 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          <!-- show loading search -->
          <div
            v-if="pending"
            class="relative cursor-default select-none px-4 py-2 text-gray-700"
          >
            loading...
          </div>

          <!-- show not found search -->
          <div
            v-else-if="suggestions.length === 0 && query !== ''"
            class="relative cursor-default select-none px-4 py-2 text-gray-700"
          >
            Nothing found.
          </div>

          <!-- show result search -->
          <ul
            v-for="suggestion in suggestions"
            :key="suggestion.lat + suggestion.lon"
            v-else
          >
            <li
              class="relative cursor-pointer select-none py-2 px-3 text-neutral-900 rounded-md hover:bg-neutral-50"
              @click="handleSelectedLocation(suggestion)"
            >
              <span
                class="block truncate font-normal"
                :class="{ 'font-medium': suggestion.name === selected?.name }"
              >
                {{ suggestion?.local_names?.vi ?? suggestion?.name }}
              </span>
              <div class="text-sm font-medium text-neutral-400">
                {{ convertLocation(suggestion, false) }}
              </div>
            </li>
          </ul>
        </div>
      </HeadlessTransitionRoot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  selectLocation: {
    type: Function,
    required: false,
  },
});
import _ from "lodash";
import convertLocation from "~/composables/convert/convertLocation";
import type { SuggestionResult } from "~/composables/useSuggestLocation";

const weatherStore = useWeatherStore();

const {
  suggestions,
  recentSelected,
  pending,
  fetchSuggestions,
  saveRecentSuggestion,
  deleteRecentSuggestion,
} = useSuggestLocation();

let selected = ref<SuggestionResult | null>(null);
let query = ref("");
let isOpen = ref(false);

const handleSelectedLocation = (item: SuggestionResult) => {
  weatherStore.setSelectedLocation(item);
  isOpen.value = false;
  saveRecentSuggestion(item);
};

const debouncedFetchSuggestions = _.debounce(() => {
  if (query.value) {
    fetchSuggestions(query.value);
  } else {
    suggestions.value = [];
  }
}, 300);

watch(query, debouncedFetchSuggestions, { immediate: false });

// keep dropdown when blur input
const closeDropdownWithDelay = () => {
  setTimeout(() => {
    props.selectLocation && props.selectLocation();
  }, 300);
};
</script>
