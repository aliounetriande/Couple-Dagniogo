<script setup>
import { ref } from 'vue'
import Invitation from './components/Invitation.vue'
import IntroEnvelope from './components/IntroEnvelope.vue'
import AudioBar from './components/AudioBar.vue'
import { weddingConfig } from './config.js'

// État pour afficher l'enveloppe d'abord
const showEnvelope = ref(true)

// Utilise la configuration depuis config.js
const weddingData = {
  groom: weddingConfig.groom,
  bride: weddingConfig.bride,
  bg: weddingConfig.bgImage,
  topDeco: weddingConfig.topDeco,
  bottomDeco: weddingConfig.bottomDeco,
  floralDeco: "/flower.png",
  couplePhoto: weddingConfig.couplePhoto,
  
  dayName: weddingConfig.dayName,
  dayNumber: weddingConfig.dayNumber,
  time: weddingConfig.time,
  month: weddingConfig.month,
  year: weddingConfig.year,
  
  venue: `${weddingConfig.program.mosqueName}, Ouagadougou`,
  rsvp: weddingConfig.rsvp,
  
  program: {
    groomFamily: weddingConfig.program.groomFamily,
    brideFamily: weddingConfig.program.brideFamily,
    date: weddingConfig.program.date,
    time: weddingConfig.program.time,
    mosqueName: weddingConfig.program.mosqueName,
    receptionPlace: weddingConfig.program.receptionPlace,
    mosqueIcon: weddingConfig.program.mosqueIcon,
    homeIcon: weddingConfig.program.homeIcon,
  },
  
  dateISO: weddingConfig.dateISO,
  locations: weddingConfig.locations,
  
  flowers: weddingConfig.flowers,
}

// Date pour l'enveloppe d'intro
const envelopeDate = {
  dayName: weddingConfig.dayName,
  dayNumber: weddingConfig.dayNumber,
  month: weddingConfig.month,
  year: weddingConfig.year,
}

const handleEnvelopeOpened = () => {
  showEnvelope.value = false
}
</script>

<template>
  <div>
    <!-- ENVELOPPE D'INTRO (affichée en premier) -->
    <IntroEnvelope 
      v-if="showEnvelope"
      :groom="weddingConfig.groom"
      :bride="weddingConfig.bride"
      :date="weddingConfig.dateImage"
      @opened="handleEnvelopeOpened"
    />
    
    <!-- INVITATION PRINCIPALE (affichée après enveloppe) -->
    <Invitation 
      v-else
      v-bind="weddingData" 
    />
    
    <!-- Lecteur audio (toujours visible) -->
    <AudioBar
      :src="weddingConfig.musicUrl"
      :title="weddingConfig.musicTitle"
      :autoStart="weddingConfig.autoStartMusic"
    />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Inter, system-ui, sans-serif;
  overflow-x: hidden;
}
</style>