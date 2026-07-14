// ============================================================
// CENTRAL TEMPLE CONTENT DATA
// Edit this file to update text across the whole site.
// When connecting to Spring Boot + MySQL later, replace the
// static exports below with API calls that return the same shape.
// ============================================================

export const templeInfo = {
  nameTamil1: "ஸ்ரீ பூமி அளந்த பெருமாள் திருக்கோவில்",
  nameEnglish1: "Sri Bhoomi Alantha Perumal Temple",
  nameTamil2: "ஸ்ரீ இசக்கி அம்மன் திருக்கோவில்",
  nameEnglish2: "Sri Isakki Amman Temple",
  welcomeTamil: "அனைத்து பக்தர்களையும் அன்புடன் வரவேற்கிறோம்",
  welcomeEnglish: "All devotees are warmly welcomed",

  // Village / location
  villageTamil: "உசரத்துகுடியிருப்பு",
  villageEnglish: "Usarathukudieruppu",
  district: "Tirunelveli District, Tamil Nadu, India",
  village: "உசரத்துகுடியிருப்பு", // kept for backward compatibility with older components

  templePhone: "8122983050",
  donationPhone: "9976767670",
  whatsapp: "918122983050",
  donationWhatsapp: "919976767670",
  upiName: "VELMURUGAN P",
  upiId: "velmurugansky7670-1@oksbi",

  // Google Maps — search-based embed for Usarathukudieruppu (no API key required).
  // If exact temple coordinates become available, replace this with a precise
  // "!1d...!2d...!3d..." embed URL from Google Maps > Share > Embed a map.
  mapsQuery: "Usarathukudieruppu, Tirunelveli District, Tamil Nadu, India",
  mapsEmbed:
    "https://www.google.com/maps?q=Usarathukudieruppu%2C+Tirunelveli+District%2C+Tamil+Nadu%2C+India&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Usarathukudieruppu%2C+Tirunelveli+District%2C+Tamil+Nadu%2C+India",
  directionsLink:
    "https://www.google.com/maps/dir/?api=1&destination=Usarathukudieruppu%2C+Tirunelveli+District%2C+Tamil+Nadu%2C+India",

  // WhatsApp community group — set groupLink once you have an active
  // group invite (looks like https://chat.whatsapp.com/XXXXXXXXXXXXX).
  // Until then, the QR code image is shown prominently instead.
  whatsappGroupLink: "",

  // Footer / site credit
  developerName: "Mathan S/o Rajalingam",
  developerPhone: "6382008656",
  developerEmail: "mathanrsm6596@gmail.com",
  copyrightYear: 2026,
};

// -------------------- CONTACT PERSONS --------------------
export const contactPersons = [
  { name: "பரமசிவன் நாடார்", phone: "+91 8122983050" },
  { name: "வேல்முருகன்", phone: "+91 9976767670" },
];


// -------------------- 21 SACRED PEEDAMS (Main Deities) --------------------
export const mainDeities = [
  { id: 1, tamil: "குருசாமி", english: "Gurusamy" },
  { id: 2, tamil: "சிவபெருமான்", english: "Sivaperuman" },
  { id: 3, tamil: "சக்தி அம்மன்", english: "Sakthi Amman" },
  { id: 4, tamil: "ஸ்ரீ இசக்கி அம்மன்", english: "Sri Isakki Amman" },
  { id: 5, tamil: "பேச்சியம்மன்", english: "Pechiyamman" },
  { id: 6, tamil: "முண்டன்", english: "Mundan" },
  { id: 7, tamil: "சப்பாணி மாடன்", english: "Sappani Maadan" },
  { id: 8, tamil: "ஸ்ரீ பூமி அளந்த பெருமாள்", english: "Sri Bhoomi Alantha Perumal" },
  { id: 9, tamil: "தேரடி மாடன்", english: "Therady Maadan" },
  { id: 10, tamil: "சுடலை மாடன்", english: "Sudalai Maadan" },
  { id: 11, tamil: "கால பைரவர்", english: "Kaala Bhairavar" },
].map((d) => ({
  ...d,
  description: `${d.tamil} சன்னிதி — இறையருள் நிறைந்த புனித தலம். [விளக்கத்தை இங்கு சேர்க்கவும்]`,
}));

export const parivaraDeities = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  tamil: `பரிவார தெய்வம் ${i + 1}`,
  english: `Parivara Deity ${i + 1}`,
  description: "பரிவார தெய்வ சன்னிதி. [விளக்கத்தை இங்கு சேர்க்கவும்]",
}));

// -------------------- WEEKLY POOJA --------------------
export const weeklyPooja = {
  days: ["செவ்வாய்க்கிழமை", "வெள்ளிக்கிழமை"],
  daysEnglish: ["Tuesday", "Friday"],
  time: "12:00 PM",
  descriptionTamil:
    "ஒவ்வொரு செவ்வாய்க்கிழமையும் மற்றும் வெள்ளிக்கிழமையும் மதியம் 12:00 மணிக்கு சிறப்பு பூஜை நடைபெறும். அனைத்து பக்தர்களும் கலந்து கொண்டு இறையருள் பெற அன்புடன் அழைக்கப்படுகிறார்கள்.",
  descriptionEnglish:
    "Special pooja is held every Tuesday and Friday at 12:00 PM. All devotees are lovingly invited to attend and receive divine blessings.",
};

// -------------------- ANNUAL FESTIVAL --------------------
export const annualFestival = {
  titleTamil: "கோவில் கொடை விழா",
  titleEnglish: "Temple Kodai Festival",
  scheduleTamil: "ஆண்டுதோறும் ஆடி மாதம் இரண்டாவது செவ்வாய்க்கிழமை",
  scheduleEnglish: "Second Tuesday of the Tamil month of Aadi, every year",
  descriptionTamil:
    "ஆண்டுதோறும் ஆடி மாதம் இரண்டாவது செவ்வாய்க்கிழமை கோவில் கொடை விழா மிக விமரிசையாக நடைபெறும்.",
  descriptionEnglish:
    "The temple's annual Kodai festival is celebrated with great grandeur on the second Tuesday of Aadi month every year.",
  highlights: [
    { tamil: "சிறப்பு அபிஷேகம்", english: "Special Abishegam" },
    { tamil: "சிறப்பு அலங்காரம்", english: "Special Alangaram" },
    { tamil: "தீபாராதனை", english: "Deeparadhanai" },
    { tamil: "அன்னதானம்", english: "Annadhanam" },
    { tamil: "பக்தர்கள் காணிக்கை", english: "Devotee Offerings" },
  ],
  // Set the next festival date (YYYY-MM-DDTHH:mm:ss) to power the countdown timer
  nextFestivalDate: "2027-08-10T09:00:00",
};

// -------------------- ANNOUNCEMENTS --------------------
export const announcements = [
  {
    tamil: "🛕 ஆடி மாத கொடை விழா தேதி விரைவில் அறிவிக்கப்படும்.",
    english: "Aadi month Kodai Festival date will be announced soon.",
  },
  {
    tamil: "🙏 செவ்வாய் மற்றும் வெள்ளிக்கிழமை மதியம் 12:00 மணிக்கு சிறப்பு பூஜை.",
    english: "Special pooja every Tuesday & Friday at 12:00 PM.",
  },
  {
    tamil: "💛 கோவில் புனரமைப்பு பணிக்கு நன்கொடை வழங்கி ஆசீர்வதிக்கவும்.",
    english: "Kindly contribute to the temple renovation fund.",
  },
];

// -------------------- WHATSAPP GROUP --------------------
export const whatsappGroup = {
  titleTamil: "ஸ்ரீ பூமி அளந்த பெருமாள் WhatsApp Group",
  titleEnglish: "Sri Bhoomi Alantha Perumal WhatsApp Group",
  descriptionTamil:
    "கோவில் நிகழ்வுகள், திருவிழா அறிவிப்புகள் மற்றும் முக்கிய தகவல்களை உடனுக்குடன் பெற எங்கள் WhatsApp குழுவில் இணையுங்கள்.",
  descriptionEnglish:
    "Join our WhatsApp group to instantly receive temple event updates, festival announcements, and important information.",
};

// -------------------- KODAI VIZHA FESTIVAL SCHEDULE --------------------
// Shown inline on the Pooja & Festival page under "விழா".
export const festivalDaySchedule = [
  { time: "காலை 7.00 மணி", event: "மங்கல இசை" },
  { time: "காலை 8.00 மணி", event: "சிற்றுண்டி" },
  { time: "காலை 8.30 மணி", event: "கும்பாபிஷேகம் ஆரம்பம்" },
  { time: "காலை 10.30 மணி", event: "விமான அபிஷேகம்" },
  { time: "காலை 11.00 மணி", event: "சுவாமி அம்மன் சிறப்பு அபிஷேகம்" },
  { time: "மதியம் 12.00 மணி", event: "சுவாமி அம்பாளுக்கு கும்பாபிஷேகம்" },
  { time: "மதியம் 12.30 மணி", event: "அலங்கார பூஜை" },
  { time: "மதியம் 1.00 மணி", event: "அன்னதானம்" },
  { time: "மாலை 7.00 மணி", event: "மங்கல இசை" },
  { time: "இரவு 8.00 மணி", event: "சிற்றுண்டி" },
  { time: "இரவு 9.00 மணி", event: "வில்லிசை" },
  { time: "இரவு 12.00 மணி", event: "சிறப்பு அலங்கார பூஜை" },
  { time: "இரவு 3.00 மணி", event: "உணவு எடுத்தல்" },
];

// -------------------- NAV LINKS --------------------
export const navLinks = [
  { path: "/", tamil: "முகப்பு", english: "Home" },
  { path: "/deities", tamil: "21 பீடங்கள்", english: "Deities" },
  { path: "/pooja-festival", tamil: "பூஜை & விழா", english: "Pooja & Festival" },
  { path: "/gallery", tamil: "புகைப்படங்கள்", english: "Gallery" },
  { path: "/donation", tamil: "நன்கொடை", english: "Donation" },
  { path: "/contact", tamil: "தொடர்பு", english: "Contact" },
];
