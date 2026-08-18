<template>
  <section class="inviteWrap">
    <div class="inviteCard" :style="{ backgroundImage: `url(${bg})` }" ref="card">
      <!-- overlay pour harmoniser la couleur -->
      <div class="tone"></div>

      <!-- décor haut -->
      <img v-if="topDeco" class="topDeco" :src="topDeco" alt="" aria-hidden="true" />

      <!-- contenu -->
      <div class="inner">
        
        <!-- ==================== -->
        <!-- 1️⃣ TITRE INVITATION (IMAGE) -->
        <!-- ==================== -->
        <img v-if="titleInvitationImage" :src="Menu" alt="Invitation" class="MenuTitle" />

        <!-- NOMS DU COUPLE -->
        <div class="names">
          <img v-if="titleInvitationImage" :src="nomCoupleImage" alt="Invitation" class="nameCouple" />
        </div>

        

        
        
        <div class="invitationText" v-html="invitationText1">
        </div>

        <div class="dateBox" v-if="date">
          <img class="dateImg" :src="date" alt="Date" ref="dateImg" />
        </div>

        <div class="invitationText" v-html="invitationText2">
        </div>

        <!-- ==================== -->
        <!-- 2️⃣ PHOTO DU COUPLE -->
        <!-- ==================== -->
        <div class="photoBlock" v-if="couplePhoto">
          <img class="photo" :src="couplePhoto" alt="Photo du couple" />
        </div>


        <!-- ==================== -->
        <!-- 3️⃣ TITRE LOCALISATION (IMAGE) -->
        <!-- ==================== -->
        <img v-if="titleLocalisationImage" :src="titleLocalisationImage" alt="Localisation" class="sectionTitle" />

        <div class="mapsSub">
          Cliquez sur <span class="chip">Ouvrir</span> pour lancer l'itinéraire sur Google Maps.
        </div>

        <!-- MAPS GRID -->
        <div class="mapsGrid" v-if="locations?.length">
          <div class="mapCard reveal" v-for="loc in locations" :key="loc.title">
            <div class="mapTop">
              <div class="mapText">
                <div class="mapName" translate="no">{{ loc.title }}</div>
                <div class="mapAddr">{{ loc.address }}</div>
              </div>

              <a class="mapBtn" :href="loc.openLink" target="_blank" rel="noreferrer">
                Ouvrir ↗
              </a>
            </div>

            <div class="mapFrameWrap">
              <iframe
                class="mapFrame"
                :src="loc.embed"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>


        <!-- ==================== -->
        <!-- 4️⃣ TITRE COUNTDOWN (IMAGE) -->
        <!-- ==================== -->
        <img v-if="titleCountdownImage" :src="titleCountdownImage" alt="Compte à rebours" class="sectionTitle" />

        <div class="countSub">Plus que…</div>

        <!-- COUNTDOWN GRID -->
        <div class="countGrid reveal">
          <div class="countTile">
            <div class="n">{{ cd.days }}</div>
            <div class="t">Jours</div>
          </div>
          <div class="countTile">
            <div class="n">{{ cd.hours }}</div>
            <div class="t">Heures</div>
          </div>
          <div class="countTile">
            <div class="n">{{ cd.minutes }}</div>
            <div class="t">Minutes</div>
          </div>
          <div class="countTile">
            <div class="n">{{ cd.seconds }}</div>
            <div class="t">Secondes</div>
          </div>
        </div>

        <div class="countDone reveal" v-if="cd.isOver">
          C'est le grand jour ! Qu'Allah bénisse cette union. 🤍
        </div>


        <!-- ==================== -->
        <!-- 5️⃣ TITRE INFOLINE (IMAGE) -->
        <!-- ==================== -->
        <img v-if="titleInfollineImage" :src="titleInfollineImage" alt="Infoline" class="sectionTitle" />

        <p>Pour toute information, veuillez contacter les numéros suivants:</p>

        <div class="rsvp" v-if="rsvp">
          <div class="rsvpLine" v-html="rsvp"></div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, reactive } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  /* images de fond et déco */
  bg: { type: String, default: "/Fond.png" },
  topDeco: { type: String, default: "/topDeco.png" },
  bottomDeco: { type: String, default: "/bottomDeco.png" },

  /* noms du couple */
  nomCoupleImage: { type: String, default: "/NomCouple.png" },

  /* photo menu */
  Menu: { type: String, default: "/Menu.png" },

  /* photo du couple */
  couplePhoto: { type: String, default: "/Couple.png" },

  date: { type: String, default: "/Date.png" },

  /* IMAGES DES TITRES */
  titleInvitationImage: { type: String, default: "/titleInvitation.png" },
  titleLocalisationImage: { type: String, default: "/titleLocalisation.png" },
  titleCountdownImage: { type: String, default: "/titleCountdown.png" },
  titleInfollineImage: { type: String, default: "/titleInfoline.png" },

  /* texte invitation */
  invitationText1: { 
    type: String, 
    default: "ont l’immense joie de vous inviter  à célébrer leur union le "
  },

  invitationText2: { 
    type: String, 
    default: "Nous serions heureux de vous avoir à nos côtés pour des moments remplies de joie et d’amour."
  },

  /* date pour countdown */
  dateISO: { type: String, required: true },

  /* localisations (Google Maps) */
  locations: { type: Array, default: () => [] },

  /* numéro RSVP */
  rsvp: { type: String, default: "+226 XX XX XX XX" },
});

const card = ref(null);

onMounted(() => {
  // 1️⃣ Animation d'entrée de la carte
  gsap.from(card.value, { 
    y: 40, 
    opacity: 0, 
    duration: 1, 
    ease: "power3.out" 
  });

  // 2️⃣ Animation des noms
  gsap.from(".name", {
    opacity: 0,
    y: 20,
    duration: 2,
    stagger: 0.3,
    ease: "power2.out",
    delay: 0.6
  });

  // 3️⃣ Animation des titres (images)
  gsap.from(".sectionTitle", {
    y: 30,
    opacity: 0,
    duration: 1.5,
    stagger: 0.25,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".sectionTitle",
      start: "top 85%",
    }
  });

  // 4️⃣ Texte invitation
  gsap.from(".invitationText", {
    y: 20,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".invitationText",
      start: "top 85%",
    }
  });

  // 5️⃣ Photo avec ScrollTrigger
  gsap.from(".photoBlock", {
    scale: 0.9,
    opacity: 0,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".photoBlock",
      start: "top 85%",
    }
  });

  // 6️⃣ Cartes Maps (apparition une par une)
  gsap.from(".mapCard", {
    y: 60,
    opacity: 0,
    duration: 2,
    stagger: 0.25,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".mapsGrid",
      start: "top 80%",
    }
  });

  // 7️⃣ Tiles du countdown (effet scale)
  gsap.from(".countTile", {
    scale: 0.5,
    opacity: 0,
    duration: 2,
    stagger: 0.1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".countGrid",
      start: "top 85%",
    }
  });

  // 8️⃣ Section RSVP/Infoline
  gsap.from(".rsvp", {
    y: 40,
    opacity: 0,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".rsvp",
      start: "top 85%",
    }
  });

  // 9️⃣ Pulse subtil sur les noms
  gsap.to(".name", {
    scale: 1.02,
    duration: 2.5,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });

  // Timer countdown
  tick();
  timer = setInterval(tick, 1000);
});

const cd = reactive({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: false });
let timer = null;

function tick() {
  const now = new Date().getTime();
  const target = new Date(props.dateISO).getTime();
  const diff = target - now;

  if (diff <= 0) {
    cd.isOver = true;
    cd.days = cd.hours = cd.minutes = cd.seconds = 0;
    return;
  }
  cd.isOver = false;

  const s = Math.floor(diff / 1000);
  cd.days = Math.floor(s / (3600 * 24));
  cd.hours = Math.floor((s % (3600 * 24)) / 3600);
  cd.minutes = Math.floor((s % 3600) / 60);
  cd.seconds = Math.floor(s % 60);
}

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>

<style scoped>
.inviteWrap {
  width: 100%;
  margin: 0;
}

.inviteCard {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background-size: cover;
  background-position: center;
}

.tone {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(900px 520px at 50% 10%, rgba(255,255,255,.40), rgba(255,255,255,.10) 55%, rgba(0,0,0,.05) 100%);
  pointer-events: none;
}

.topDeco {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 560px;
  height: auto;
  z-index: 2;
  pointer-events: none;
}

.bottomDeco {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 560px;
  height: auto;
  z-index: 2;
  pointer-events: none;
}

.inner {
  position: relative;
  z-index: 3;
  padding: 110px 22px 140px;
  text-align: center;
  color: rgba(40, 32, 20, .85);
}

.bismi {
  font-size: 34px;
  color: rgba(163, 133, 76, .88);
  margin-bottom: 20px;
}

/* NOMS */
.names {
  margin: 20px 0 30px;
  font-family: "Great Vibes", cursive;
  font-size: clamp(44px, 10vw, 74px);
  line-height: 1;
  color: rgba(142, 23, 33, .92);
}

.amp {
  font-family: Inter, system-ui;
  font-size: 18px;
  font-weight: 600;
  opacity: .55;
  margin: 0 10px;
}

.MenuTitle {
  width: min(120px, 75vw);
  height: auto;
  display: block;
  margin: 40px auto 20px;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.10));
}

.dateBox {
  margin: -10px auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
}

.dateImg {
  width: min(180px, 65vw);  /* Pas énorme */
  height: auto;
  display: block;
  object-fit: contain;      /* Garde l'aspect ratio */
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.10));
}

.nameCouple {
  width: min(380px, 85vw);
  height: auto;
  display: block;
  margin: 0 auto 30px;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.10));
}

/* IMAGES DES TITRES */
.sectionTitle {
  width: min(700px, 98vw);
  max-width: none;  /* ← Force pas de limite max */
  height: auto;
  display: block;
  margin: 40px auto 0px;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.10));
}

/* TEXTE INVITATION */
.invitationText {
  width: min(520px, 92vw);
  margin: -20px auto 10px;
  font-size: 13px;
  line-height: 1.8;
  color: rgba(80, 60, 25, .75);
}

/* PHOTO DU COUPLE */
.photoBlock {
  margin: 20px 0;
}

.photo {
  width: min(420px, 88vw);
  height: auto;
  max-height: 450px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  border-radius: 12px;
  /* box-shadow: 0 18px 48px rgba(0, 0, 0, .18); */
  /* #border: 1px solid rgba(163, 133, 76, .30); */
}

/* MAPS */
.mapsSub {
  font-size: 12px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgb(37 125 76);
  margin: 20px 0;
  line-height: 1.6;
}

.chip {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid rgb(212 173 84);
  background: rgba(255, 255, 255, .35);
  color: rgb(37 125 76);
  letter-spacing: .10em;
}

.mapsGrid {
  width: min(520px, 92vw);
  margin: 20px auto 0;
  display: grid;
  gap: 14px;
}

.mapCard {
  padding: 12px;
  border-radius: 18px;
  border: 1px solid rgb(212 173 84);
  background: rgba(255, 255, 255, .35);
  backdrop-filter: blur(8px);
}

.mapTop {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.mapName {
  font-weight: 900;
  color: rgb(37 125 76);
}

.mapAddr {
  margin-top: 4px;
  font-size: 13px;
  color: rgb(37 125 76);
  line-height: 1.35;
}

.mapBtn {
  text-decoration: none;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid rgb(212 173 84);
  background: linear-gradient(180deg, rgba(142, 23, 33, .14), rgba(163, 133, 76, .10));
  color: rgb(37 125 76);
  transition: transform .15s ease;
}

.mapBtn:hover {
  transform: translateY(-1px);
}

.mapFrameWrap {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(163, 133, 76, .18);
  box-shadow: 0 18px 48px rgba(0, 0, 0, .10);
}

.mapFrame {
  width: 100%;
  height: 240px;
  border: 0;
  display: block;
}

/* COUNTDOWN */
.countSub {
  font-size: 12px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(80, 60, 25, .55);
  margin: 20px 0;
}

.countGrid {
  width: min(520px, 92vw);
  margin: 20px auto 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  align-items: stretch;
}

.countTile {
  border-radius: 18px;
  border: 1px solid rgba(163, 133, 76, .22);
  background: rgba(255, 255, 255, .35);
  backdrop-filter: blur(8px);
  padding: 12px 10px;
}

.countTile .n {
  font-weight: 900;
  font-size: 22px;
  color: rgba(80, 60, 25, .82);
}

.countTile .t {
  margin-top: 6px;
  font-size: 11px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: rgba(80, 60, 25, .55);
}

.countDone {
  width: min(520px, 92vw);
  margin: 20px auto 0;
  font-size: 12px;
  letter-spacing: .10em;
  text-transform: uppercase;
  color: rgba(80, 60, 25, .58);
}

/* RSVP / INFOLINE */
.rsvp {
  margin-top: 30px;
}

.rsvpLine {
  margin-top: 6px;
  font-size: 18px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: rgba(80, 60, 25, .55);
}

/* 🌸 FLEURS */
.flowersDivider {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 40px 0 20px;
  opacity: 0.65;
}

.flowersDivider .flowerIcon {
  font-size: 24px;
  animation: flowersFloat 4s ease-in-out infinite;
}

.flowersDivider .flowerIcon:nth-child(1) {
  animation-delay: 0s;
}

.flowersDivider .flowerIcon:nth-child(2) {
  animation-delay: 0.4s;
  font-size: 28px;
}

.flowersDivider .flowerIcon:nth-child(3) {
  animation-delay: 0.8s;
}

.flowersDecor {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 20px 0;
  opacity: 0.75;
  animation: flowersFloat 3s ease-in-out infinite;
}

.flowersDecor.flowersBottom {
  margin-top: 50px;
  margin-bottom: 30px;
  gap: 28px;
}

.flowerIcon {
  font-size: 28px;
  display: inline-block;
  animation: flowersFloat 3.5s ease-in-out infinite;
}

.flowersDecor .flowerIcon:nth-child(1) {
  animation-delay: 0s;
}

.flowersDecor .flowerIcon:nth-child(2) {
  animation-delay: 0.3s;
  font-size: 32px;
}

.flowersDecor .flowerIcon:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes flowersFloat {
  0%, 100% {
    transform: translateY(0px);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-8px);
    opacity: 0.9;
  }
}

@media (max-width: 420px) {
  .inner {
    padding: 90px 18px 130px;
  }

  .countGrid {
    grid-template-columns: repeat(2, 1fr);
  }

  .sectionTitle {
    width: min(200px, 75vw);
  }
}
</style>