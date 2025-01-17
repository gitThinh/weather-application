<template>
  <div>
    <HeadlessPopover>
      <HeadlessPopoverButton class="outline-none">
        <p class="font-medium">{{ props.title }}</p>
      </HeadlessPopoverButton>

      <HeadlessTransitionRoot
        enter="transition-opacity ease-linear duration-100"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <HeadlessPopoverPanel
          v-slot="{ close }"
          class="fixed w-full flex flex-col -translate-x-4 p-4 rounded-se-3xl rounded-ss-3xl border-info-normal border h-5/6 overflow-hidden bg-info-light bottom-0"
        >
          <div class="w-16 h-1 mx-auto rounded-full bg-info-normal mb-2"></div>
          <HeadlessTabGroup>
            <HeadlessTabList class="w-full flex justify-around">
              <HeadlessTab as="template" v-slot="{ selected }">
                <p
                  :class="{
                    'font-medium cursor-default': selected,
                    'cursor-pointer': !selected,
                  }"
                >
                  {{ t("moreDetail") }}
                </p>
              </HeadlessTab>
              <HeadlessTab as="template" v-slot="{ selected }">
                <p
                  :class="{
                    'font-medium cursor-default': selected,
                    'cursor-pointer': !selected,
                  }"
                >
                  {{ t("dailyWeather") }}
                </p>
              </HeadlessTab>
            </HeadlessTabList>

            <HeadlessTabPanels
              class="mt-4 flex-1 overflow-y-auto overscroll-contain px-4"
            >
              <HeadlessTabPanel>
                <MobileDetailWeather />
              </HeadlessTabPanel>
              <HeadlessTabPanel>
                <MobileDailyWeather />
              </HeadlessTabPanel>
            </HeadlessTabPanels>
          </HeadlessTabGroup>
        </HeadlessPopoverPanel>
      </HeadlessTransitionRoot>
    </HeadlessPopover>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const props = defineProps({
  title: {
    type: String,
    default: "Show more",
  },
});
</script>
