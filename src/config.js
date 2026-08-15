/**
 * 🎊 CONFIGURATION D'INVITATION DE MARIAGE
 * =====================================
 * Customise TOUS les paramètres ici !
 * Tu n'as besoin de toucher à rien d'autre.
 */

export const weddingConfig = {
  // 👰 INFOS DU COUPLE
  groom: "Amina",
  bride: "Dan",
  
  // 📅 DATE & HEURE
  dayName: "VENDREDI",
  dayNumber: "21",
  time: "16:00",
  month: "Août",
  year: "2026",
  
  // 🏘️ PROGRAMME
  program: {
    groomFamily: "KONE",           // Famille du marié
    brideFamily: "ZIDA",            // Famille de la mariée
    date: "21 Août 2026",
    time: "16h00",
    mosqueName: "AS TRII RUA SENADOR CANEDO",
    receptionPlace: "Domicile de la mariée",
    mosqueIcon: "/mosque.png",
    homeIcon: "/home.png",
  },
  
  // 📍 LOCALISATIONS (cartes Google Maps)
  locations: [
    {
      title: "Lieu de réception",
      address: "Ouagadougou, Burkina Faso",
      embed: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4642.207396785558!2d-1.465659498220589!3d12.392533096723131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDIzJzMzLjYiTiAxwrAyNyc0Ni40Ilc!5e0!3m2!1sfr!2sbf!4v1786807320299!5m2!1sfr!2sbf",
      openLink: "https://maps.app.goo.gl/NwifyDnnfxNVTMGe9"
    }
  ], 
  
  // 🎵 MUSIQUE
  musicUrl: "/music.mp3",
  musicTitle: "Fally Ipupa - 8ème merveille",
  autoStartMusic: true,
  
  // 📞 CONTACT
  rsvp: "+226 75 01 01 50",
  
  // 📸 IMAGES & BACKGROUNDS
  bgImage: "/Fond.png",
  topDeco: "/topDeco.png",
  nomCoupleImage:  "/NomCouple.png",
  Menu: "/Menu.png",
  bottomDeco: "/bottomDeco.png",

  dateImage: "/Date.png",  // ← L'image de la date
  
  // Fleurs
  flowerTopLeft: "/flowerTopLeft.png",
  flowerBottomRight: "/flowerBottomRight.png",
  couplePhoto: "/Couple.png",
  
  // 🎨 COULEURS (optionnel si tu veux override les styles)
  colors: {
    primary: "rgba(142, 23, 33, .88)",    // Bordeaux
    secondary: "rgba(80, 60, 25, .70)",   // Beige
    accent: "rgba(163, 133, 76, .9)",     // Doré
  },
  
  // 📋 TEXTE PERSONNALISÉ
  islamicText: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux. " +
    "\"Et parmi ses signes il a créé de vous, pour vous, des épouses pour que vous viviez en tranquillité avec elles " +
    "et Il a mis entre vous de l'affection et de la bonté. Il y a en cela des preuves pour des gens qui réfléchissent. " +
    "(Sourate 30, verset 21)",
  
  // ⏰ DATE ISO pour countdown (format: YYYY-MM-DDTHH:mm:ss)
  dateISO: "2026-08-21T16:00:00",
  
  // 🌸 FLEURS DÉCORATIVES
  flowers: {
    enabled: true,
    style: "elegant",  // "elegant", "modern", "romantic"
    opacity: 0.7,
  },
  
  // 💫 ANIMATIONS
  enableAnimations: true,
  enableScrollAnimations: true,
};

export default weddingConfig;
