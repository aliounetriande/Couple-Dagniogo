# 💜 Guide de Customisation - Invitation de Mariage Vue

## 🎯 Démarrage rapide

**TOUT se customise dans UN SEUL FICHIER:** `src/config.js`

Tu n'as besoin de rien d'autre toucher. Promis.

---

## 📋 Comment changer les infos du couple

Ouvre `src/config.js` et change:

```javascript
// 👰 INFOS DU COUPLE
groom: "AMINA",        // Change le prénom du marié
bride: "DAN",          // Change le prénom de la mariée
```

---

## 📅 Comment changer la date

```javascript
// 📅 DATE & HEURE
dayName: "VENDREDI",   // Jour (LUNDI, MARDI, etc.)
dayNumber: "21",       // Numéro du jour (1-31)
time: "16:00",         // Heure (HH:mm en format 24h)
month: "Août",         // Mois (Janvier, Février, etc.)
year: "2026",          // Année
```

**Important:** Change aussi la date ISO pour le countdown:
```javascript
dateISO: "2026-08-21T16:00:00",  // Format: YYYY-MM-DDTHH:mm:ss
```

---

## 🏘️ Comment changer le programme

```javascript
program: {
  groomFamily: "KONE",              // Nom de famille du marié
  brideFamily: "ZIDA",              // Nom de famille de la mariée
  date: "21 Août 2026",
  time: "16h00",
  mosqueName: "AS TRII RUA...",     // Adresse/nom de la mosquée
  receptionPlace: "Domicile...",    // Lieu de réception
},
```

---

## 🎵 Musique

```javascript
musicUrl: "/music.mp3",          // Lien vers ta chanson
musicTitle: "Notre Chanson",     // Titre
autoStartMusic: true,            // Auto-play?
```

---

## 📍 Google Maps

Cherche le lien embed sur Google Maps et colle-le ici:

```javascript
locations: [
  {
    title: "Mosquée",
    address: "Ouagadougou",
    embed: "https://www.google.com/maps/embed?pb=...",
    openLink: "https://maps.google.com/?q=..."
  }
]
```

---

## 📸 Photos

```javascript
bgImage: "/fond.png",          // Fond
couplePhoto: "/couple.png",    // Photo du couple
```

Mets tes fichiers dans `public/` et change les chemins.

---

## 🚀 Commandes

```bash
npm install     # Installe les dépendances
npm run dev     # Lance en local
npm run build   # Build pour production
```

---

## 📤 Déployer sur Vercel

```bash
vercel
```

Ou push sur GitHub → connect à Vercel → auto-deploy! 🚀

---

## ✅ Avant de déployer

- [ ] Couple names changés
- [ ] Date correcte + dateISO
- [ ] Photo uploadée
- [ ] Google Maps liens
- [ ] Numéro RSVP
- [ ] Musique

**Le design est déjà bluffant!** Customise juste `src/config.js` et c'est bon! 💜
