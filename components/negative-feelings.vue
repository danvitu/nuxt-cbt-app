<template>
  <div class="grid grid-cols-4 border-b pb-4 mb-4 gap-4">
    <div class="flex flex-wrap gap-2 col-span-3 items-center">
      <span class="p-2 border rounded-xl text-sm" v-for="feeling in feelingsGroup">
        {{ feeling }}
      </span>
    </div>
    <div class="flex gap-4 justify-end items-center">
      <UFormGroup label="% До">
        <UInput type="number" class="w-20" />
      </UFormGroup>
      <UFormGroup label="% После">
        <UInput type="number" class="w-20" />
      </UFormGroup>
    </div>
  </div>
</template>

<script setup>
defineProps({
  feelingsGroup: Array
})
</script>