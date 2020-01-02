<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard />
    <BaseIcon></BaseIcon>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
export default {
  name: 'event-card',
  components: { EventCard }
}
</script>
