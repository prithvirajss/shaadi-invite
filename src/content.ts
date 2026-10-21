import type { WeddingEvent, FamilyGroup } from "./types";

/**
 * ============================================================
 *  SINGLE SOURCE OF TRUTH FOR ALL WEBSITE COPY & CONFIG
 *  Edit this file to change any text, dates, times or links.
 * ============================================================
 */

// ---------- CONFIG: fill these in (see README "Fill-in checklist") ----------
export const config = {
  groomPhone: "8889965231",
  senderPhone: "7566637973",
  whatsappShareNumber: "918889965231", // country code + number, no "+" or spaces
  weddingHashtag: "#PrithvirajSangPalak",
  shubhLagnaIso: "2026-11-21T13:00:00+05:30", // used for the live countdown
  mataPujanTimeHi: "प्रातः 9:30 बजे",
  mataPujanTimeEn: "9:30 AM",
  siteUrl: "https://prithvirajss.github.io/shaadi-invite", // GitHub Pages project site
};

// ---------- SITE META ----------
export const siteMeta = {
  titleHi: "पृथ्वीराज संग पलक",
  titleEn: "Prithviraj & Palak",
  ogTitle: "पृथ्वीराज संग पलक | 19–21 नवम्बर 2026",
  ogDescription: "हमारे विवाह समारोह में आपकी उपस्थिति हमारे लिए सौभाग्य की बात होगी।",
};

// ---------- OPENING SCREEN ----------
export const opening = {
  ganeshVandanaHi: "॥ श्री गणेशाय नमः ॥",
  shlokaHi:
    "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
  shlokaEn:
    "Vakratunda Mahakaya Suryakoti Samaprabha,\nNirvighnam Kuru Me Deva Sarva-Kaaryeshu Sarvada.",
  tapToOpenHi: "निमंत्रण खोलने हेतु स्पर्श करें",
  tapToOpenEn: "Tap to open the invitation",
  greetingPrefixHi: "प्रिय",
  greetingSuffixHi: ", आपका सादर स्वागत है",
  greetingPrefixEn: "Dear",
  greetingSuffixEn: ", you are warmly welcomed",
  defaultNameHi: "आदरणीय अतिथि",
  defaultNameEn: "Honoured Guest",
};

// ---------- COUPLE SECTION ----------
export const couple = {
  blessingLineHi:
    "कुलदेवी माता खिमज एवं कुलदेवता की असीम कृपा से हमारे परिवार में शुभ प्रसंग आया है।",
  blessingLineEn:
    "By the boundless grace of Kuldevi Mata Khimaj and our Kuldevta, this auspicious occasion has come to our family.",
  groom: {
    nameHi: "चि. कुँवर पृथ्वीराज सिंह (अर्पित)",
    nameEn: "Ch. Kunwar Prithviraj Singh (Arpit)",
    grandsonOfHi: "सुपौत्र : स्व.श्री ठा.सा. गोपाल सिंहजी सोलंकी",
    grandsonOfEn: "Grandson of: Late Shri Thakur Sa. Gopal Singhji Solanki",
    sonOfHi: "सुपुत्र : ठा.सा. मानसिंह सोलंकी",
    sonOfEn: "Son of: Thakur Sa. Mansingh Solanki",
  },
  sangHi: "संग",
  sangEn: "with",
  bride: {
    nameHi: "सौ.कां. पलक कँवर",
    nameEn: "Sau. Kan. Palak Kanwar",
    granddaughterOfHi: "सुपौत्री : स्व.ठा.सा. बाबूसिंहजी राठौड़",
    granddaughterOfEn: "Granddaughter of: Late Thakur Sa. Babu Singhji Rathore",
    daughterOfHi: "सुपुत्री : ठा.सा. विजयसिंहजी राठौड़",
    daughterOfEn: "Daughter of: Thakur Sa. Vijay Singhji Rathore",
  },
  countdownTitleHi: "शुभ लग्न",
  countdownTitleEn: "Countdown to the Shubh Lagna",
  countdownUnitsHi: { days: "दिन", hours: "घंटे", minutes: "मिनट", seconds: "सेकंड" },
  countdownUnitsEn: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
};

// ---------- EVENT TIMELINE ----------
export const timelineTitle = {
  hi: "मांगलिक पलों का सफ़र",
  en: "A Journey of Sacred Moments",
};

export const baratNote = {
  hi: "बारात श्रीमान ठा.सा. विजयसिंहजी राठौड़ (देवास) वालों के यहाँ शनिवार, 21 नवम्बर 2026 को सुबह 10 बजे रॉयल पैलेस रिसोर्ट (देवास) जावेगी।",
  en: "The groom's procession (Baraat) will arrive at the residence of Shri Thakur Sa. Vijay Singhji Rathore (Dewas) — Royal Palace Resort, Dewas — at 10:00 AM on Saturday, 21 November 2026.",
};

// Replace the placeholder lat/lng in each mapUrl with the real venue coordinates.
const DEVAS_VENUE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=22.9917628,76.0145183"; // The Royal Palace, Dewas
const INDORE_VENUE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=22.736381,75.774671"; // 384, Sharad Madhav Vihar, Gomatgiri, Nainod, Indore

export const events: WeddingEvent[] = [
  {
    key: "mataPujan",
    shortCode: "mp",
    nameHi: "माता पूजन",
    nameEn: "Mata Pujan",
    dayDateHi: "गुरुवार, 19 नवम्बर 2026",
    dayDateEn: "Thursday, 19 November 2026",
    timeHi: config.mataPujanTimeHi,
    timeEn: config.mataPujanTimeEn,
    venueHi: "निज निवास, 384, शरद माधव विहार, ड्रीम वर्ल्ड रिसोर्ट के पास, गोमटगिरी, नैनोद, इन्दौर",
    venueEn: "Residence, 384, Sharad Madhav Vihar, near Dream World Resort, Gomatgiri, Nainod, Indore",
    startIso: "2026-11-19T09:30:00+05:30",
    endIso: "2026-11-19T11:30:00+05:30",
    mapUrl: INDORE_VENUE_MAP_URL,
  },
  {
    key: "ganeshPujan",
    shortCode: "gp",
    nameHi: "श्री गणेश पूजन",
    nameEn: "Shri Ganesh Pujan",
    dayDateHi: "शुक्रवार, 20 नवम्बर 2026",
    dayDateEn: "Friday, 20 November 2026",
    timeHi: "प्रातः 10 बजे",
    timeEn: "10:00 AM",
    venueHi: "रॉयल पैलेस रिसोर्ट, देवास",
    venueEn: "Royal Palace Resort, Dewas",
    startIso: "2026-11-20T10:00:00+05:30",
    endIso: "2026-11-20T11:30:00+05:30",
    mapUrl: DEVAS_VENUE_MAP_URL,
  },
  {
    key: "mandap",
    shortCode: "md",
    nameHi: "मण्डप",
    nameEn: "Mandap",
    dayDateHi: "शुक्रवार, 20 नवम्बर 2026",
    dayDateEn: "Friday, 20 November 2026",
    timeHi: "दोपहर 12 बजे",
    timeEn: "12:00 PM",
    venueHi: "रॉयल पैलेस रिसोर्ट, देवास",
    venueEn: "Royal Palace Resort, Dewas",
    noteHi: "मामेरा प्रथा बंद है।",
    noteEn: "Note: the Mamera ceremony will not be held.",
    startIso: "2026-11-20T12:00:00+05:30",
    endIso: "2026-11-20T13:00:00+05:30",
    mapUrl: DEVAS_VENUE_MAP_URL,
  },
  {
    key: "haldi",
    shortCode: "hl",
    nameHi: "हल्दी कार्निवाल",
    nameEn: "Haldi Carnival",
    dayDateHi: "शुक्रवार, 20 नवम्बर 2026",
    dayDateEn: "Friday, 20 November 2026",
    timeHi: "दोपहर 1 बजे",
    timeEn: "1:00 PM",
    venueHi: "रॉयल पैलेस रिसोर्ट, देवास",
    venueEn: "Royal Palace Resort, Dewas",
    startIso: "2026-11-20T13:00:00+05:30",
    endIso: "2026-11-20T15:00:00+05:30",
    mapUrl: DEVAS_VENUE_MAP_URL,
  },
  {
    key: "sangeet",
    shortCode: "sg",
    nameHi: "महिला संगीत",
    nameEn: "Mahila Sangeet",
    dayDateHi: "शुक्रवार, 20 नवम्बर 2026",
    dayDateEn: "Friday, 20 November 2026",
    timeHi: "शाम 7:30 बजे",
    timeEn: "7:30 PM",
    venueHi: "रॉयल पैलेस रिसोर्ट, देवास",
    venueEn: "Royal Palace Resort, Dewas",
    startIso: "2026-11-20T19:30:00+05:30",
    endIso: "2026-11-20T22:00:00+05:30",
    mapUrl: DEVAS_VENUE_MAP_URL,
  },
  {
    key: "varNikasi",
    shortCode: "vn",
    nameHi: "वर निकासी",
    nameEn: "Var Nikasi",
    dayDateHi: "शनिवार, 21 नवम्बर 2026",
    dayDateEn: "Saturday, 21 November 2026",
    timeHi: "प्रातः 10 बजे",
    timeEn: "10:00 AM",
    venueHi: "रॉयल पैलेस रिसोर्ट, देवास",
    venueEn: "Royal Palace Resort, Dewas",
    startIso: "2026-11-21T10:00:00+05:30",
    endIso: "2026-11-21T12:00:00+05:30",
    mapUrl: DEVAS_VENUE_MAP_URL,
  },
  {
    key: "shubhLagna",
    shortCode: "sl",
    nameHi: "शुभ लग्न",
    nameEn: "Shubh Lagna",
    dayDateHi: "शनिवार, 21 नवम्बर 2026",
    dayDateEn: "Saturday, 21 November 2026",
    timeHi: "दोपहर 1 बजे",
    timeEn: "1:00 PM",
    venueHi: "रॉयल पैलेस रिसोर्ट, देवास",
    venueEn: "Royal Palace Resort, Dewas",
    startIso: "2026-11-21T13:00:00+05:30",
    endIso: "2026-11-21T15:00:00+05:30",
    mapUrl: DEVAS_VENUE_MAP_URL,
  },
  {
    key: "ashirwad",
    shortCode: "as",
    nameHi: "आशीर्वाद समारोह एवं स्वरुचि भोज",
    nameEn: "Ashirwad Ceremony & Dinner",
    dayDateHi: "शनिवार, 21 नवम्बर 2026",
    dayDateEn: "Saturday, 21 November 2026",
    timeHi: "शाम 8 बजे से आपके आगमन तक",
    timeEn: "8:00 PM onwards, at your convenience",
    venueHi: "रॉयल पैलेस रिसोर्ट, उज्जैन रोड (बायपास), देवास (म.प्र.)",
    venueEn: "Royal Palace Resort, Ujjain Road (Bypass), Dewas (M.P.)",
    startIso: "2026-11-21T20:00:00+05:30",
    endIso: "2026-11-21T23:30:00+05:30",
    mapUrl: DEVAS_VENUE_MAP_URL,
  },
];

// ---------- FAMILY ----------
export const familyTitle = { hi: "परिवार", en: "Family" };

export const familyGroups: FamilyGroup[] = [
  {
    titleHi: "विनीत",
    titleEn: "With regards",
    namesHi: "ठा.सा. मानसिंहजी सोलंकी, श्रीमती सरिता सोलंकी",
    namesEn: "Thakur Sa. Mansinghji Solanki, Smt. Sarita Solanki",
  },
  {
    titleHi: "स्वागतातुर (भैय्या–भाभी)",
    titleEn: "Eager to welcome you",
    namesHi: "लवेन्द्रसिंहजी–सौ. अभिरुचि सोलंकी; सुरेन्द्रसिंहजी–सौ. वंदना सोलंकी",
    namesEn: "Lavendrasinghji–Sau. Abhiruchi Solanki; Surendrasinghji–Sau. Vandana Solanki",
  },
  {
    titleHi: "दर्शनाभिलाषी",
    titleEn: "Seeking your blessings",
    namesHi:
      "ठा.सा. देवीसिंहजी–सौ. लक्ष्मीदेवी सोलंकी; श्रीमती कलावती चौहान; ठा.सा. राजेन्द्रसिंहजी–सौ. पुष्पादेवी राठौड़; ठा.सा. बहादुरसिंहजी–सौ. संगीता राठौड़; ठा.सा. सोहनसिंहजी–सौ. रेखा चौहान; ठा.सा. भरतसिंहजी–सौ. किरण सिसोदिया",
    namesEn:
      "Thakur Sa. Devisinghji–Sau. Laxmidevi Solanki; Smt. Kalawati Chauhan; Thakur Sa. Rajendrasinghji–Sau. Pushpadevi Rathore; Thakur Sa. Bahadursinghji–Sau. Sangeeta Rathore; Thakur Sa. Sohansinghji–Sau. Rekha Chauhan; Thakur Sa. Bharatsinghji–Sau. Kiran Sisodia",
  },
  {
    titleHi: "ननिहाल पक्ष",
    titleEn: "Maternal family",
    namesHi: "श्रीमती गीता कुँ. गेहलोत; ठा.सा. जितेन्द्रसिंहजी–सौ. राधा गेहलोत एवं समस्त गेहलोत परिवार",
    namesEn: "Smt. Geeta Kun. Gehlot; Thakur Sa. Jitendrasinghji–Sau. Radha Gehlot and the entire Gehlot family",
  },
  {
    titleHi: "बाल मनुहार",
    titleEn: "Little ones awaiting you",
    namesHi: "परिधी (पाखी) सोलंकी, तेजससिंह सोलंकी",
    namesEn: "Paridhi (Pakhi) Solanki, Tejas Singh Solanki",
  },
];

// ---------- RSVP ----------
export const rsvp = {
  titleHi: "उपस्थिति की पुष्टि",
  titleEn: "RSVP",
  subtitleHi: "कृपया अपनी उपस्थिति की पुष्टि करें",
  subtitleEn: "Please confirm your presence",
  nameLabelHi: "आपका नाम",
  nameLabelEn: "Your Name",
  phoneLabelHi: "मोबाइल नंबर",
  phoneLabelEn: "Phone Number",
  guestCountLabelHi: "अतिथियों की संख्या",
  guestCountLabelEn: "Number of Guests",
  eventsLabelHi: "आप किन समारोहों में उपस्थित रहेंगे?",
  eventsLabelEn: "Which events will you attend?",
  submitHi: "पुष्टि करें",
  submitEn: "Submit RSVP",
  submittingHi: "भेजा जा रहा है...",
  submittingEn: "Submitting...",
  thankYouTitleHi: "धन्यवाद!",
  thankYouTitleEn: "Thank You!",
  thankYouMessageHi: "आपकी उपस्थिति की पुष्टि प्राप्त हो गई है। हम आपका स्वागत करने हेतु उत्सुक हैं।",
  thankYouMessageEn: "Your RSVP has been received. We look forward to welcoming you.",
  errorNameHi: "कृपया अपना नाम दर्ज करें",
  errorNameEn: "Please enter your name",
  errorPhoneHi: "कृपया मान्य मोबाइल नंबर दर्ज करें",
  errorPhoneEn: "Please enter a valid phone number",
  errorEventsHi: "कृपया कम से कम एक समारोह चुनें",
  errorEventsEn: "Please select at least one event",
  errorGenericHi: "कुछ त्रुटि हुई, कृपया पुनः प्रयास करें",
  errorGenericEn: "Something went wrong, please try again",
  errorRateLimitHi: "आपने हाल ही में पुष्टि भेजी है। कृपया कुछ समय बाद पुनः प्रयास करें।",
  errorRateLimitEn: "You've already submitted recently. Please try again later.",
};

// ---------- BLESSINGS WALL ----------
export const blessings = {
  titleHi: "आशीर्वाद दीवार",
  titleEn: "Blessings Wall",
  subtitleHi: "अपना आशीर्वाद एवं शुभकामनाएं यहाँ साझा करें",
  subtitleEn: "Share your blessings and wishes here",
  nameLabelHi: "आपका नाम",
  nameLabelEn: "Your Name",
  messageLabelHi: "आशीर्वाद / शुभकामना संदेश",
  messageLabelEn: "Your Blessing",
  messagePlaceholderHi: "नवविवाहित जोड़े के लिए अपना आशीर्वाद लिखें...",
  messagePlaceholderEn: "Write your blessing for the newlyweds...",
  submitHi: "आशीर्वाद भेजें",
  submitEn: "Send Blessing",
  submittingHi: "भेजा जा रहा है...",
  submittingEn: "Sending...",
  thankYouHi: "आपका आशीर्वाद प्राप्त हुआ! स्वीकृति के पश्चात यह दीवार पर दिखाई देगा।",
  thankYouEn: "Your blessing was received! It will appear on the wall after approval.",
  emptyStateHi: "सबसे पहले आशीर्वाद देने वाले बनें!",
  emptyStateEn: "Be the first to leave a blessing!",
  maxChars: 300,
  errorEmptyHi: "कृपया अपना आशीर्वाद लिखें",
  errorEmptyEn: "Please write your blessing",
  errorProfanityHi: "कृपया उचित शब्दों का उपयोग करें",
  errorProfanityEn: "Please use appropriate language",
};

// ---------- CONTACT ----------
export const contact = {
  titleHi: "संपर्क",
  titleEn: "Contact",
  callHi: "कॉल करें",
  callEn: "Call",
  whatsappHi: "व्हाट्सएप पर संदेश भेजें",
  whatsappEn: "Message on WhatsApp",
  senderHi: "प्रेषक",
  senderEn: "Sent by",
  senderNameHi: "ठा.सा. मानसिंह सोलंकी",
  senderNameEn: "Thakur Sa. Mansingh Solanki",
  senderAddressHi: "384, शरद माधव विहार, ड्रीम वर्ल्ड रिसोर्ट के पास, गोमटगिरी, नैनोद, इन्दौर",
  senderAddressEn: "384, Sharad Madhav Vihar, near Dream World Resort, Gomatgiri, Nainod, Indore",
};

// ---------- MISC UI ----------
export const ui = {
  calendarButtonHi: "कैलेंडर में जोड़ें",
  calendarButtonEn: "Add to Calendar",
  directionsButtonHi: "दिशा-निर्देश",
  directionsButtonEn: "Directions",
  langToggleHi: "English",
  langToggleEn: "हिंदी",
  musicOnHi: "संगीत चालू करें",
  musicOnEn: "Play music",
  musicOffHi: "संगीत बंद करें",
  musicOffEn: "Mute music",
};
