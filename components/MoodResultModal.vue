<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h3 class="font-semibold">Интерпретация результатов опросника от {{ formatDate(moodEntry.created_at) }}</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
        </div>
      </template>
      <div v-for="result in totalResult" class="mb-4">
        <h3 class="font-semibold">{{ result.resultName }}</h3>
        <div>{{ result.resultDescription }}</div>
      </div>
      <div>
        <div class="mb-4">
          <div class="font-semibold">Суицидальные мысли</div>
          <div v-if="moodEntry.suicidal_1 >= 1">
            Если вы в депрессии или чувствуете бессилие, повышенные баллы по этому пункту весьма распространены. У
            большинства людей в депрессии периодически возникают суицидальные мысли, которые обычно не опасны, если вы
            не
            строите конкретных планов действий. Однако будет мудрым решением проконсультироваться
            со специалистом в
            области психического здоровья
            , если у вас возникают суицидальные фантазии или импульсы, или если чувства
            депрессии и бессилия длятся более недели или двух. Помните, ваша жизнь ценна, и такие мысли требуют
            внимательного отношения.
          </div>
          <div v-else>Суицидальные мысли отсутствуют</div>
        </div>
        <div class="font-semibold">Суицидальные импульсы</div>
        <div v-if="moodEntry.suicidal_2 >= 1" class="font-bold">
          Любой балл от 1 и выше может быть опасен, и профессиональное лечение настоятельно рекомендовано. Если у
          вас
          есть желание покончить с собой, немедленно позвоните по телефону экстренной помощи 112 и обратитесь за
          профессиональной помощью. Ваша безопасность и благополучие являются наивысшим приоритетом.
        </div>
        <div v-else>Суицидальные импульсы отсутствуют</div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup>
import { moodResults } from '~/constants';
const props = defineProps({
  moodEntry: Object,
})
const isOpen = defineModel('isOpen')

function getResult(moodResults, points) {
  return moodResults.find(result =>
    points >= result.pointsRange[0] && points <= result.pointsRange[1]
  );
}

const categories = [
  { key: 'anxiousResults', sumKey: 'anxious_sum' },
  { key: 'physicalResults', sumKey: 'physical_sum' },
  { key: 'depressionResults', sumKey: 'depression_sum' },
];

const totalResult = categories.map(({ key, sumKey }) =>
  getResult(moodResults[key].results, props.moodEntry[sumKey])
);
</script>