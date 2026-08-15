<template>
  <div class="audioBar" :class="{ open: true }" role="region" aria-label="Lecteur audio">
    <button class="btn" @click="toggle" :aria-label="isPlaying ? 'Pause' : 'Lecture'">
      <span v-if="!isPlaying">▶</span>
      <span v-else>❚❚</span>
    </button>

    <div class="meta">
      <div class="title">{{ title }}</div>
      <input
        class="range"
        type="range"
        min="0"
        :max="duration || 0"
        step="0.1"
        v-model.number="current"
        @input="seek"
      />
      <div class="time">
        <span>{{ fmt(current) }}</span>
        <span class="sep">/</span>
        <span>{{ fmt(duration) }}</span>
      </div>
    </div>

    <audio ref="audio" :src="src" preload="metadata" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  src: { type: String, default: "/music.mp3" },
  title: { type: String, default: "Musique" },
  autoStart: { type: Boolean, default: false }, // conseillé: false (mobile)
});

const audio = ref(null);
const isPlaying = ref(false);
const duration = ref(0);
const current = ref(0);

let raf = null;

function fmt(s) {
  if (!s || Number.isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function sync() {
  if (!audio.value) return;
  current.value = audio.value.currentTime || 0;
  raf = requestAnimationFrame(sync);
}

function toggle() {
  if (!audio.value) return;

  // Sur mobile, la lecture doit être déclenchée par une action utilisateur (ce clic)
  if (audio.value.paused) {
    audio.value.play().then(() => {
      isPlaying.value = true;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    }).catch(() => {
      // si bloqué, on ne force pas
      isPlaying.value = false;
    });
  } else {
    audio.value.pause();
    isPlaying.value = false;
    cancelAnimationFrame(raf);
  }
}

function seek() {
  if (!audio.value) return;
  audio.value.currentTime = current.value;
}

onMounted(() => {
  if (!audio.value) return;

  const onLoaded = () => (duration.value = audio.value.duration || 0);
  const onEnd = () => {
    isPlaying.value = false;
    cancelAnimationFrame(raf);
  };

  audio.value.addEventListener("loadedmetadata", onLoaded);
  audio.value.addEventListener("ended", onEnd);

  if (props.autoStart) {
    // souvent bloqué sur mobile => à utiliser seulement si tu déclenches après un clic (ex: ouverture intro)
    audio.value.play().then(() => {
      isPlaying.value = true;
      raf = requestAnimationFrame(sync);
    }).catch(() => {});
  }

  onBeforeUnmount(() => {
    audio.value?.removeEventListener("loadedmetadata", onLoaded);
    audio.value?.removeEventListener("ended", onEnd);
    cancelAnimationFrame(raf);
  });
});
</script>

<style scoped>
.audioBar{
  position: fixed;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  width: min(560px, 94vw);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 699px;
  z-index: 998;

  /* mêmes tons que l’invitation */
  background: rgba(246, 241, 230, .92); /* ivoire */
  border: 1px solid rgba(163,133,76,.35); /* doré */
  box-shadow: 0 18px 60px rgba(0,0,0,.22);
  backdrop-filter: blur(10px);
}

.btn{
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgb(212 173 84);
  background: linear-gradient(180deg, rgba(142, 23, 33, .14), rgba(163,133,76,.10));
  color: rgb(37 125 76);
  font-weight: 900;
  cursor: pointer;
}

.meta{ flex:1; min-width: 0; }
.title{
  font-size: 12px;
  letter-spacing: .10em;
  text-transform: uppercase;
  color: rgb(37 125 76);
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.range{
  width: 100%;
  accent-color: rgb(212 173 84);
}

.time{
  margin-top: 4px;
  font-size: 11px;
  color: rgb(37 125 76);
  display: flex;
  justify-content: flex-end;
  gap: 6px;
}
.sep{ opacity:.6; }
</style>
