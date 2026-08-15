<template>
  <div class="intro" :style="{ backgroundImage: `url(${bg})` }">
    <div class="veil"></div>
    
    <!-- 🌸 FLEUR HAUT-GAUCHE (fixée) -->
    <img 
      v-if="flowerTopLeft"
      :src="flowerTopLeft" 
      alt="Fleur décoration" 
      class="flowerTopLeft"
      aria-hidden="true"
    />
    
    <!-- 🌸 FLEUR BAS-DROITE (fixée) -->
    <img 
      v-if="flowerBottomRight"
      :src="flowerBottomRight" 
      alt="Fleur décoration" 
      class="flowerBottomRight"
      aria-hidden="true"
    />

    <div class="content" ref="content">

      <div class="inviteLine">
        INVITATION AU <br> MARIAGE DE
      </div>

      <!-- NOMS (police style carte) -->
      <div class="names">
        <span class="n">{{ groom }}</span>
        <span class="amp">&</span>
        <span class="n">{{ bride }}</span>
      </div>

      

      <div class="names">
        <img class="nomCadre" :src="nomCadre" alt="Nom Cadre" ref="envImg" />
      </div>


      <!-- enveloppe -->
      <button class="envBtn" @click="open" :disabled="isAnimating" aria-label="Ouvrir l'invitation">
        <div class="tap">Cliquez sur l’enveloppe</div>
        <img class="envelope" :src="envelope" alt="Enveloppe" ref="envImg" />
      </button>

      <!-- Date style "SATURDAY | 29 | AT 10:00 AM" -->
      <div class="dateBox" v-if="date">
        <img class="dateImg" :src="date" alt="Date" ref="dateImg" />
      </div>
    </div>
  </div>

  <div class="info">
        Made by The Digital Architect <br> Whatsapp +226 60 21 12 90 
</div>

</template>

<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";

const props = defineProps({
  bride: { type: String, required: true },
  groom: { type: String, required: true },
  bg: { type: String, default: "/Fond.png" },
  nomCadre: { type: String, default: "/NomCadre.png" },
  envelope: { type: String, default: "/Enveloppe.png" },
  date: { type: String, default: "/Date.png" },
  flowerTopLeft: { type: String, default: "/flowerTopLeft.png" },
  flowerBottomRight: { type: String, default: "/flowerBottomRight.png" },
  // Date structurée (inspirée de ton exemple)
});

const emit = defineEmits(["opened"]);

const envImg = ref(null);
const content = ref(null);
const isAnimating = ref(false);

onMounted(() => {
  gsap.from(content.value, { opacity: 0, y: 14, duration: 0.75, ease: "power2.out" });

  // flottement léger de l’enveloppe
  gsap.to(envImg.value, {
    y: 8,
    rotate: -0.6,
    duration: 2.8,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });

  // ✨ Pulse sur l'enveloppe (effet "clique-moi")
  gsap.to(envImg.value, {
    scale: 1.04,
    duration: 1.2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -2,
  });
});

function open() {
  if (isAnimating.value) return;
  isAnimating.value = true;

  gsap.killTweensOf(envImg.value);

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    onComplete: () => emit("opened"),
  });

  tl.to(envImg.value, { scale: 1.04, rotate: 0, duration: 0.18 })
    .to(envImg.value, { y: -16, scale: 1.10, duration: 0.35 }, "<0.05")
    .to(content.value, { opacity: 0, y: -10, duration: 0.35 }, ">0.10");
}

/* Fleurs (SVG inline, sobre) */
const RoseCorner = {
  template: `
  <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="r" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(120 90) rotate(45) scale(120)">
        <stop stop-color="#a10f1a" stop-opacity=".95"/>
        <stop offset="1" stop-color="#a10f1a" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#2b6b52" stop-opacity=".65"/>
        <stop offset="1" stop-color="#2b6b52" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <!-- rose -->
    <circle cx="120" cy="92" r="56" fill="url(#r)" opacity=".35"/>
    <path d="M118 52c18 0 34 12 38 28 5 19-6 41-27 53-20 12-44 9-58-7-14-16-13-39 3-55 10-11 27-19 44-19Z"
      fill="#a10f1a" opacity=".20"/>

    <!-- leaves -->
    <path d="M70 150c18-20 40-26 70-18-18 18-38 28-70 18Z" fill="url(#g)" opacity=".55"/>
    <path d="M138 170c14-22 32-32 58-32-14 22-32 34-58 32Z" fill="url(#g)" opacity=".45"/>

    <!-- little stems -->
    <path d="M86 170c16-30 28-44 52-62" stroke="#2b6b52" stroke-opacity=".25" stroke-width="4" stroke-linecap="round"/>
  </svg>
  `,
};
</script>

<style scoped>
.intro{
  position: fixed;
  inset: 0;
  z-index: 999;
  background-size: cover;
  background-position: center;
  display: grid;
  place-items: center;
  padding: 18px;
}

.topFlower{
  position: fixed;         /* FIXÉ en haut de l’écran */
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: min(220px, 96vw); /* responsive */
  height: auto;
  z-index: 2;              /* au-dessus du fond, sous le contenu si besoin */
  pointer-events: none;    /* ne bloque pas le clic sur enveloppe/boutons */
  opacity: .95;
  filter: drop-shadow(0 18px 22px rgba(0,0,0,.10));
}


/* voile léger pour garder ton fond visible */
.veil{
  position: absolute;
  inset: 0;
  background:
    radial-gradient(900px 520px at 50% 10%, rgba(255,255,255,.42), rgba(255,255,255,.14) 55%, rgba(0,0,0,.05) 100%);
  pointer-events: none;
}

/* 🌸 FLEUR HAUT-GAUCHE */
.flowerTopLeft {
  position: fixed;
  top: -20px;
  left: -20px;
  width: min(200px, 30vw);
  height: auto;
  z-index: 10;
  opacity: 0.85;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12));
  pointer-events: none;
  
  
}

/* 🌸 FLEUR BAS-DROITE */
.flowerBottomRight {
  position: fixed;
  bottom: -20px;
  right: -20px;
  width: min(200px, 30vw);
  height: auto;
  z-index: 10;
  opacity: 0.85;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12));
  pointer-events: none;
  

}

/* Animation de flottement subtil */
@keyframes floatFlower {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-12px) rotate(1.2deg);
  }
}

/* Mobile: réduire la taille */
@media (max-width: 420px) {
  .flowerTopLeft {
    top: -20px;
    left: -20px;
    width: min(300px, 40vw);
  }
  
  .flowerBottomRight {
    bottom: -40px;
    right: -20px;
    width: min(300px, 40vw);
  }
}

.content{
  position: relative;
  width: min(520px, 92vw);
  text-align: center;
  padding: 14px 14px 8px;
}

/* small invite line */
.inviteLine{
  font-family: Inter, system-ui;
  font-size: 20px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: rgb(212 173 84);
  margin-bottom: 16px;
  margin-top: 70px;
}

/* info */
.info{
position:absolute;
  font-family: Inter, system-ui;
  margin-top: 810px;
  font-size: 12px;
  text-align: center;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: rgba(80, 60, 25, .55);
  margin-bottom: 16px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 560px;
  height: auto;
  z-index: 2;
  pointer-events:none;
}

/* names — style carte */
.names{
  font-family: "Great Vibes", cursive;
  font-size: clamp(44px, 10vw, 78px);
  line-height: 1;
  color: rgb(37 125 76); /* rouge profond mariage */
  text-shadow: 0 10px 28px rgba(0,0,0,.08);
}
.amp{
  font-family: Inter, system-ui;
  font-size: 18px;
  font-weight: 600;
  opacity: .55;
  margin: 0 10px;
  vertical-align: middle;
}

/* date block — inspiré du modèle */
/* Date image — pas grosse, centrée */
.dateBox {
  margin: -10px auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
}

.dateImg {
  width: min(300px, 65vw);  /* Pas énorme */
  height: auto;
  display: block;
  object-fit: contain;      /* Garde l'aspect ratio */
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.10));
}

.dateRow{
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  gap: 10px;
  color: rgba(80,60,25,.70);
  font-family: Inter, system-ui;
  letter-spacing: .10em;
  text-transform: uppercase;
  font-size: 20px;
}
.dateCenter{
  font-family: Inter, system-ui;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: .08em;
  color: rgba(142, 23, 33, .85);
  line-height: 1;
}
.dateMonth{
  margin-top: 6px;
  font-family: Inter, system-ui;
  font-size: 24px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(80,60,25,.55);
}

/* enveloppe */
.envBtn{
  margin-top: 10px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.envelope{
  width: min(380px, 70vw);
  height: auto;
  display: block;
  margin: -20px auto;
  filter: drop-shadow(0 26px 46px rgba(0,0,0,.18));
}

.nomCadre{
  width: min(150px, 75vw);
  height: auto;
  display: block;
  margin: 0 auto;
  filter: drop-shadow(0 26px 46px rgba(0,0,0,.18));
}

.tap{
  margin-top: 8px;
  font-family: Inter, system-ui;
  font-size: 16px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(80, 60, 25, .55);
}

/* mobile */
@media (max-width: 420px){
  .bismi{ font-size: 20px; }
  .flower{ width: 150px; height: 150px; opacity:.60; }
  .dateCenter{ font-size: 28px; }
}


.infos{
position:absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 560px;
  height: auto;
  z-index: 2;
  pointer-events:none;
  }

</style>
