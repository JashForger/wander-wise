/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Compass, Plane, Wallet, Sparkles, PieChart, Mail, MapPin, Award, LogOut,
  ArrowRight, Check, Star, Menu, X, Send, Calendar, Clock, Globe, Heart,
  Shield, ArrowUpRight, Search, Activity, ChevronRight, Smile, Landmark,
  User, Settings, CloudSun, DollarSign, BookOpen, Compass as TripIcon
} from "lucide-react";

// --- MOCK DATA ---

const FEATURES = [
  {
    title: "AI Trip Planner",
    desc: "Generate custom hyper-personalized day-by-day itineraries optimized for weather, travel flow, and public crowds.",
    icon: Sparkles,
    color: "from-teal-500/20 to-emerald-500/20",
    iconColor: "text-teal-400"
  },
  {
    title: "City Explorer",
    desc: "Unearth local hidden gems, secret food alleys, historical landmarks, and cultural events tailored to your vibe.",
    icon: Compass,
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-rose-400"
  },
  {
    title: "Smart Budget Tracker",
    desc: "Set thresholds, track expenditures in real-time across dynamic currencies, and bypass costly tourist traps.",
    icon: Wallet,
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400"
  },
  {
    title: "AI Concierge Globi",
    desc: "Chat with your 24/7 dedicated local assistant. Translate menus, book transit, and resolve emergency hurdles.",
    icon: Smile,
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400"
  },
  {
    title: "Travel Insights",
    desc: "Access localized safety scores, weather forecasts, packing recommendations, and transport connectivity reports.",
    icon: Globe,
    color: "from-purple-500/20 to-violet-500/20",
    iconColor: "text-purple-400"
  },
  {
    title: "Email Itineraries",
    desc: "Forward booking emails to instantly synthesize complex plans into beautiful, cohesive, offline travel maps.",
    icon: Mail,
    color: "from-cyan-500/20 to-teal-500/20",
    iconColor: "text-cyan-400"
  }
];

const STEPS = [
  {
    num: "01",
    title: "Choose Vibe & Budget",
    desc: "Input your preferences, travel timeline, preferred pacing, and total financial allocation."
  },
  {
    num: "02",
    title: "AI Draft Synthesis",
    desc: "WanderWise crawls millions of global spots to generate an optimal, rich day-by-day itinerary."
  },
  {
    num: "03",
    title: "Fine-tune & Sync",
    desc: "Refine slots easily, sync travel tickets, and download materials offline to prepare."
  },
  {
    num: "04",
    title: "Go Explore Seamlessly",
    desc: "Embark safely with real-time crowd alerts, navigation routing, and live assistant guidance."
  }
];

const PRICING = [
  {
    name: "Free",
    price: "0",
    desc: "Best for casual, light weekend getaways.",
    features: [
      "2 AI Itineraries per month",
      "Standard Budget Tracking",
      "Essential Safety Scores",
      "Offline Itinerary Support (PDF/JPEG)"
    ],
    popular: false,
    cta: "Start Planning"
  },
  {
    name: "Explorer",
    price: "99",
    desc: "Perfect for active nomads and global travelers.",
    features: [
      "Unlimited AI Itineraries",
      "Advanced Budget Optimizer",
      "Interactive Weather & Packing Guide",
      "Standard Globi Chat Concierge",
      "Export to Google Calendar"
    ],
    popular: true,
    cta: "Claim Explorer"
  },
  {
    name: "Wanderer",
    price: "199",
    desc: "Ultimate coverage for premium explorers.",
    features: [
      "Everything in Explorer tier",
      "Priority 24/7 Globi Premium Chat",
      "Real-time Flight Delay Auto-rebook",
      "Smart Multi-currency Split Bill Engine",
      "Immersive Offline Map Navigation Files"
    ],
    popular: false,
    cta: "Go Wanderer"
  }
];

const TESTIMONIALS = [
  {
    quote: "WanderWise completely replaced my 20-tab travel spreadsheets. The AI mapped a Kyoto trip that felt deeply local, away from crowded areas.",
    name: "Clarissa Vance",
    role: "Digital Nomad",
    avatar: "CV",
    rating: 5,
    tag: "Solo Traveler"
  },
  {
    quote: "Globi was a lifesaver in Rome when our train was cancelled. It instantly recommended alternative luxury buses and translated ticket queries.",
    name: "Marcus Sterling",
    role: "Freelance Designer",
    avatar: "MS",
    rating: 5,
    tag: "Culture Explorer"
  },
  {
    quote: "The multi-currency budget optimization is unmatched. Kept our 2-week family trip through Europe strictly on budget with smart meal alerts.",
    name: "Emily & Joe Chen",
    role: "Family Travelers",
    avatar: "EJ",
    rating: 5,
    tag: "Family Route"
  }
];

const MOCK_MESSAGES_INIT = [
  { sender: "assistant", text: "Hey there! I am Globi, your personal 24/7 AI travel concierge. Ask me anything about flights, packing, restaurant recommendations, tipping culture, or local survival tips!", time: "Recently" }
];

const PRESET_QUERIES = [
  { title: "🗼 Best cafes in Tokyo", prompt: "Give me 3 amazing off-beat cafes in Tokyo with cozy atmosphere and rich drip coffee." },
  { title: "💶 Tipping in Paris", prompt: "What are the local rules and etiquette for tipping in Paris restaurants and taxis?" },
  { title: "🧳 Packing light tips", prompt: "Write a high-efficiency 7-item checklist to pack extremely light for an summer trip." }
];

const MOCK_GLOBI_REPLIES: Record<string, string> = {
  "Give me 3 amazing off-beat cafes in Tokyo with cozy atmosphere and rich drip coffee.": 
    "Here are 3 exquisite off-the-beaten-path cafes in Tokyo:\n\n1. **Aoyama Flower Market Tea House** (Minami-Aoyama) - Dine inside a stunning, aromatic greenhouse surrounded by lush seasonal blooms.\n2. **Chatei Hatou** (Shibuya) - A legendary, quiet kissaten where the master matches a unique porcelain cup to your specific personality. Celebrated for slow-drip dark coffee.\n3. **Cafe de L'Ambre** (Ginza) - An iconic old-world coffee sanctuary serving strictly aged beans (some since the 1970s). Cozy, warm, and highly authentic.",
  
  "What are the local rules and etiquette for tipping in Paris restaurants and taxis?": 
    "In Paris, tipping is straightforward and never stressful:\n\n- **Restaurants/Cafes**: A 15% service charge (*service compris*) is legally included in your bill. You do not need to tip. However, leaving small coins (1-2 Euros for coffee, or 5% for an outstanding dinner) is a warm gesture locals do.\n- **Taxis**: It is customary to round up to the nearest Euro, or give €1-€2 for polite drivers who carry bags.\n- **Hotel Porters**: Usually €1-€2 per large suitcase is the golden standard.",
  
  "Write a high-efficiency 7-item checklist to pack extremely light for an summer trip.": 
    "Here is your WanderWise high-efficiency summer packing matrix:\n\n1. **3 Quick-dry Merino-wool Shirts** (Odor resistant, wear multiple times seamlessly).\n2. **2 Smart Tech Shorts/Trousers** (Convertible or water-resistant, ideal for walking and dinner).\n3. **1 Lightweight Travel Blazer or Windbreaker** (For sudden weather shifts or premium dine-ins).\n4. **1 High-mileage Barefoot/Comfort Walkers** (Neutral look to mesh with any outfit).\n5. **4 Pairs of Compression socks & Tech briefs** (Wash easily in any hotel sink, dry overnight).\n6. **1 Ultra-thin Passport pouch** (RFID blocking, keeping cards, papers close on body).\n7. **1 Solid travel shampoo/soap bar** (Bypasses liquids check, zero luggage spills)."
};

// --- CORE COMPONENT ---

export default function App() {
  const [view, setView] = useState<"landing" | "login" | "onboarding" | "app">("landing");
  const [activeTab, setActiveTab] = useState<"dashboard" | "trips" | "explore" | "concierge" | "profile">("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication Local States
  const [users, setUsers] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem("users");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState<any>(() => {
    try {
      const stored = localStorage.getItem("currentUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [userProfile, setUserProfile] = useState<any>(() => {
    try {
      const stored = localStorage.getItem("userProfile");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  // Onboarding Wizard States
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [obName, setObName] = useState("");
  const [obDob, setObDob] = useState("");
  const [obHomeCity, setObHomeCity] = useState("");
  const [obCurrency, setObCurrency] = useState("USD");
  const [obTravelStyle, setObTravelStyle] = useState("Adventure");
  const [obTripDuration, setObTripDuration] = useState("Weekend");
  const [obBudgetTier, setObBudgetTier] = useState("Mid-range");
  const [obAccommodation, setObAccommodation] = useState<string[]>([]);
  const [obCompanions, setObCompanions] = useState("Solo");
  const [obFoodPrefs, setObFoodPrefs] = useState<string[]>(["No Preference"]);
  const [obInterests, setObInterests] = useState<string[]>([]);
  const [obLanguages, setObLanguages] = useState<string[]>(["English"]);
  const [obMobility, setObMobility] = useState("Moderate");
  
  const [showFinalSummary, setShowFinalSummary] = useState(false);
  const [previewProfile, setPreviewProfile] = useState<any>(null);

  // Prefill onboarding name from current user
  useEffect(() => {
    if (currentUser) {
      setObName(currentUser.name || currentUser.fullName || "");
    }
  }, [currentUser]);

  // App Shell states
  const [budgetLimit, setBudgetLimit] = useState(2500);
  const [expenses, setExpenses] = useState([
    { id: 1, category: "Lodging", desc: "Kyoto Ryokan Stay", amount: 1200, icon: Landmark },
    { id: 2, category: "Transit", desc: "Bullet Train (Shinkansen)", amount: 320, icon: Plane },
    { id: 3, category: "Dining", desc: "Omakase Sushi Meal", amount: 240, icon: Compass },
    { id: 4, category: "Leisure", desc: "Tea Ceremony Ticket", amount: 60, icon: Calendar }
  ]);
  const [newExpDesc, setNewExpDesc] = useState("");
  const [newExpAmount, setNewExpAmount] = useState("");
  const [newExpCat, setNewExpCat] = useState("Dining");

  // Trips Generator states
  const [destQuery, setDestQuery] = useState("");
  const [tripVibe, setTripVibe] = useState("Adventurous");
  const [tripDuration, setTripDuration] = useState("3 Days");
  const [generatedItinerary, setGeneratedItinerary] = useState<any[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Places search state
  const [placeSearch, setPlaceSearch] = useState("");
  const [favoriteSpots, setFavoriteSpots] = useState<string[]>(["Arashiyama Bamboo Grove", "Fushimi Inari Gates"]);

  // Quick Action Modals
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [weatherCity, setWeatherCity] = useState("Kyoto");
  const [showTranslatorModal, setShowTranslatorModal] = useState(false);
  const [phraseInput, setPhraseInput] = useState("");

  // AI Concierge Chat State
  const [chatMessages, setChatMessages] = useState<any[]>(MOCK_MESSAGES_INIT);
  const [userInput, setUserInput] = useState("");

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const budgetPercentage = Math.min(100, Math.round((totalExpense / budgetLimit) * 100));

  // Currency utility helper
  const getCurrencySymbol = (curr: string) => {
    switch (curr) {
      case "INR": return "₹";
      case "EUR": return "€";
      case "GBP": return "£";
      default: return "$";
    }
  };

  const currentCurrency = getCurrencySymbol(userProfile?.currency || "USD");

  const profileName = userProfile?.name || currentUser?.name || "Guest Traveller";
  const profileEmail = currentUser?.email || "guest@wanderwise.ai";
  const profileInitials = profileName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() || "GT";
  const profilePersona = userProfile?.travelPersona || "Elite Explorer";

  // Auto scroll back to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  // Synchronize dynamic budget configurations on profile load or changes
  useEffect(() => {
    if (userProfile) {
      const db = userProfile.dailyBudget || 250;
      setBudgetLimit(db * 7); // Calculate beautiful weekly budget allocation
    }
  }, [userProfile]);

  // Auth Action Handlers
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    if (!signUpName.trim() || !signUpEmail.trim() || !signUpPassword.trim() || !signUpConfirmPassword.trim()) {
      setAuthError("All fields are strictly required.");
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setAuthError("Passwords do not match. Please verify.");
      return;
    }

    const emailLower = signUpEmail.toLowerCase().trim();
    if (users.find((u) => u.email.toLowerCase() === emailLower)) {
      setAuthError("An account with this email address already exists.");
      return;
    }

    const newUser = {
      name: signUpName.trim(),
      email: emailLower,
      password: signUpPassword
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setAuthSuccess("Account successfully created! Ready for calibration...");
    
    // Proceed straight to onboarding
    setTimeout(() => {
      setAuthSuccess("");
      setView("onboarding");
      setOnboardingStep(1);
    }, 1200);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    const emailLower = signInEmail.toLowerCase().trim();
    const foundUser = users.find((u) => u.email.toLowerCase() === emailLower && u.password === signInPassword);

    if (!foundUser) {
      setAuthError("Invalid email or password. Please try again or join as a nomad.");
      return;
    }

    setCurrentUser(foundUser);
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    setAuthSuccess("Welcome back! Loading secure companion panel...");

    setTimeout(() => {
      setAuthSuccess("");
      // check if onboarding profile is already completed in localStorage
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
        setView("app");
      } else {
        setView("onboarding");
        setOnboardingStep(1);
      }
    }, 1200);
  };

  const handleContinueAsGuest = () => {
    const guestUser = { name: "Guest Traveller", email: "guest@wanderwise.ai", isGuest: true };
    setCurrentUser(guestUser);
    localStorage.setItem("currentUser", JSON.stringify(guestUser));
    setView("onboarding");
    setOnboardingStep(1);
  };

  const handleLogOut = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userProfile");
    setCurrentUser(null);
    setUserProfile(null);
    
    // Reset inputs
    setSignInEmail("");
    setSignInPassword("");
    setSignUpName("");
    setSignUpEmail("");
    setSignUpPassword("");
    setSignUpConfirmPassword("");
    
    // Reset onboarding fields
    setObName("");
    setObDob("");
    setObHomeCity("");
    setObCurrency("USD");
    setObTravelStyle("Adventure");
    setObTripDuration("Weekend");
    setObBudgetTier("Mid-range");
    setObAccommodation([]);
    setObCompanions("Solo");
    setObFoodPrefs(["No Preference"]);
    setObInterests([]);
    setObLanguages(["English"]);
    setObMobility("Moderate");
    setShowFinalSummary(false);
    setPreviewProfile(null);

    setView("landing");
    setActiveTab("dashboard");
  };

  // Onboarding Wizard Actions
  const handleOnboardingNext = () => {
    if (onboardingStep === 1) {
      if (!obName.trim()) {
        setAuthError("Please specify a display name first.");
        alert("Please specify a display name first.");
        return;
      }
    }
    setOnboardingStep((prev) => Math.min(prev + 1, 4));
  };

  const handleOnboardingBack = () => {
    if (showFinalSummary) {
      setShowFinalSummary(false);
    } else {
      setOnboardingStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleCompileSummary = () => {
    if (!obName.trim()) {
      alert("Please enter a display name to continue calibration.");
      return;
    }

    // travelPersona: travelStyle + budget tier
    const travelPersona = `${obTravelStyle} ${obBudgetTier} Explorer`;

    // Calculate daily budget based on budget tier and preferred currency
    let dailyBudget = 150;
    if (obCurrency === "USD") {
      dailyBudget = obBudgetTier === "Budget" ? 40 : obBudgetTier === "Mid-range" ? 150 : 500;
    } else if (obCurrency === "INR") {
      dailyBudget = obBudgetTier === "Budget" ? 3000 : obBudgetTier === "Mid-range" ? 10000 : 35000;
    } else if (obCurrency === "EUR") {
      dailyBudget = obBudgetTier === "Budget" ? 35 : obBudgetTier === "Mid-range" ? 130 : 450;
    } else if (obCurrency === "GBP") {
      dailyBudget = obBudgetTier === "Budget" ? 30 : obBudgetTier === "Mid-range" ? 110 : 400;
    }

    // budgetSplit object percentages
    const budgetSplit = { stay: 40, food: 25, transport: 15, activities: 15, shopping: 5 };

    const compiled = {
      name: obName.trim(),
      dob: obDob || "Not Provided",
      homeCity: obHomeCity.trim() || "Wanderer Base",
      currency: obCurrency,
      travelStyle: obTravelStyle,
      tripDuration: obTripDuration,
      budgetTier: obBudgetTier,
      accommodation: obAccommodation.length > 0 ? obAccommodation : ["Hotel"],
      companions: obCompanions,
      foodPrefs: obFoodPrefs.length > 0 ? obFoodPrefs : ["No Preference"],
      interests: obInterests.length > 0 ? obInterests : ["Culture", "History"],
      languages: obLanguages.length > 0 ? obLanguages : ["English"],
      mobility: obMobility,
      travelPersona,
      dailyBudget,
      budgetSplit
    };

    setPreviewProfile(compiled);
    setShowFinalSummary(true);
  };

  const handleOnboardingFinish = () => {
    if (!previewProfile) return;
    localStorage.setItem("userProfile", JSON.stringify(previewProfile));
    setUserProfile(previewProfile);
    setView("app");
  };

  const handleGetStarted = () => {
    const storedProfile = localStorage.getItem("userProfile");
    const storedUser = localStorage.getItem("currentUser");
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
      setView("app");
    } else if (storedUser) {
      setView("onboarding");
      setOnboardingStep(1);
    } else {
      setView("login");
    }
  };

  // Handler for custom AI Trip Generator
  const handleGenerateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destQuery.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const stops = [
        {
          day: "Day 1: Arrival & Historic Immersion",
          spots: [
            { time: "09:00 AM", name: "Welcome Brew Coffee", desc: "Kick off your day with a local micro-roastery special near the historic gate." },
            { time: "11:30 AM", name: `Historic Sanctuary of ${destQuery}`, desc: "Wander through the awe-inspiring ancient architectures carefully avoiding tourist rushes." },
            { time: "03:00 PM", name: "Artisanal Crafted Crafts Alley", desc: "Participate in local traditional workshops to experience authentic cultural touchpoints." },
            { time: "07:00 PM", name: "Local Signature Restaurant", desc: "Taste local delicacy specialties recommended exclusively by WanderWise metrics." }
          ]
        },
        {
          day: "Day 2: Nature, Vibe & Skyline Views",
          spots: [
            { time: "08:00 AM", name: "Scenic Sunrise Walkway", desc: "Beat the morning crowds to snap breathtaking views and connect directly with local nature." },
            { time: "12:00 PM", name: "Panoramic Lunch Spot", desc: "Indulge in organic local cuisines overviewing high-altitude hills or bustling city squares." },
            { time: "04:00 PM", name: "Dynamic Modern Arcade Districts", desc: "Interact with contemporary local innovations, design museums, and lifestyle centers." },
            { time: "08:30 PM", name: "Hidden Speakeasy Tavern", desc: "Sip custom botanical cocktails in an unmarked door hideout favored by local culinary masters." }
          ]
        },
        {
          day: "Day 3: Culinary Hunt & Souvenir Quest",
          spots: [
            { time: "10:00 AM", name: "Local Culinary Market Crawl", desc: "Embark on an interactive tasting trail across family-run stalls passing down recipes for generations." },
            { time: "02:00 PM", name: "Independent Bookshops & Design Hubs", desc: "Gather highly authentic bookmarks, print media, or vintage collections to take home." },
            { time: "06:00 PM", name: "Farewell Golden Toast", desc: "Conclude your magnificent travel chapter at an iconic rooftop framing the setting sun beautifully." }
          ]
        }
      ];
      setGeneratedItinerary(stops);
      setIsGenerating(false);
    }, 1200);
  };

  // Add customized expenses
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpDesc.trim() || !newExpAmount.trim()) return;
    const item = {
      id: Date.now(),
      category: newExpCat,
      desc: newExpDesc,
      amount: parseFloat(newExpAmount) || 0,
      icon: newExpCat === "Lodging" ? Landmark : newExpCat === "Transit" ? Plane : newExpCat === "Dining" ? Compass : Calendar
    };
    setExpenses([item, ...expenses]);
    setNewExpDesc("");
    setNewExpAmount("");
  };

  // Delete expense item
  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  // Handler for custom Concierge Chat
  const handleSendChatMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg = { sender: "user", text: textToSend, time: "Just now" };
    setChatMessages((prev) => [...prev, userMsg]);
    setUserInput("");

    // Simulate concierge thinking
    setTimeout(() => {
      let replyText = "That's a fantastic inquiry! I am reviewing matching secret databases to synthesize an elite answer. Here is a baseline tip: Check local weather forecasts and prioritize small alleys over major avenues for food.";
      
      // Match predefined keys if any
      const trimmedQuery = textToSend.trim();
      if (MOCK_GLOBI_REPLIES[trimmedQuery]) {
        replyText = MOCK_GLOBI_REPLIES[trimmedQuery];
      } else {
        // Simple search logic
        const matchedKey = Object.keys(MOCK_GLOBI_REPLIES).find(k => 
          k.toLowerCase().includes(trimmedQuery.toLowerCase()) || 
          trimmedQuery.toLowerCase().includes(k.substring(0, 10).toLowerCase())
        );
        if (matchedKey) replyText = MOCK_GLOBI_REPLIES[matchedKey];
      }

      const globiMsg = { sender: "assistant", text: replyText, time: "Recently" };
      setChatMessages((prev) => [...prev, globiMsg]);
    }, 850);
  };

  // Simulated weather checker state
  const simulatedWeather: Record<string, any> = {
    "Kyoto": { temp: "22°C", cond: "Pleasant & Clear", advice: "Ideal for outdoor bamboo forest walks! Pack a light shirt." },
    "Paris": { temp: "18°C", cond: "Passing Shivers", advice: "Light rain forecast in evening. Bring a sleek windbreaker." },
    "Tokyo": { temp: "24°C", cond: "Perfect Sun", advice: "Wonderful warm weather. Keep sunglasses and travel caps ready." },
    "Rome": { temp: "27°C", cond: "Bright Sunlight", advice: "Very warm. Carry an insulated water flask to stay hydrated." }
  };

  // Live Translator data
  const translatePhrase = (phrase: string) => {
    const p = phrase.toLowerCase().trim();
    if (p.includes("hello") || p.includes("hi")) return "Japanese: こんにちは (Konnichiwa) | French: Bonjour | Italian: Ciao";
    if (p.includes("thank") || p.includes("thanks")) return "Japanese: ありがとう (Arigatou) | French: Merci | Italian: Grazie";
    if (p.includes("toilet") || p.includes("restroom")) return "Japanese: お手洗いはどこですか？ (Otearai wa doko?) | French: Où sont les toilettes?";
    if (p.includes("how much")) return "Japanese: いくらですか？ (Ikura desu ka?) | French: Combien ça coûte?";
    return "No direct translation preloaded. Try typing 'Hello', 'Thank you', or 'How much' for rapid pocket translations.";
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-all duration-300">
      
      {/* ========================================================= */}
      {/* VIEW 1: LANDING PAGE (DEFAULT)                            */}
      {/* ========================================================= */}
      {view === "landing" && (
        <div id="landing-page" className="w-full flex flex-col bg-[#1A1A2E] text-slate-100 selection:bg-teal-500 selection:text-white transition-opacity duration-500">
          
          {/* STICKY NAVBAR */}
          <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#1A1A2E]/80 border-b border-white/10 px-6 py-4 md:px-12 flex items-center justify-between transition-all duration-300">
            <div className="flex items-center gap-3 select-none">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary-teal to-coral rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary-teal/10">
                W
              </div>
              <div>
                <span className="text-xl font-bold font-display tracking-tight text-white block">WanderWise</span>
                <span className="text-[10px] text-primary-teal tracking-widest uppercase block -mt-1 font-mono">AI COMPANION</span>
              </div>
            </div>

            {/* Nav Links - Desktop */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#features" className="hover:text-primary-teal transition-colors duration-200">Features</a>
              <a href="#how-it-works" className="hover:text-primary-teal transition-colors duration-200">How It Works</a>
              <a href="#pricing" className="hover:text-primary-teal transition-colors duration-200">Pricing</a>
              <a href="#testimonials" className="hover:text-primary-teal transition-colors duration-200">Reviews</a>
            </div>

            {/* CTA button & Mobile trigger */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleGetStarted}
                id="cta-nav-start"
                className="hidden sm:inline-flex items-center gap-2 bg-primary-teal hover:bg-teal-600 text-white font-semibold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                Go to App Shell <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-slate-300 hover:text-white focus:outline-none p-1.5 rounded-lg border border-white/10"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-x-0 top-[73px] p-6 bg-[#1A1A2E]/95 backdrop-blur-lg border-b border-white/10 z-40 transition-all duration-300 flex flex-col gap-4">
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-lg font-medium text-slate-300 hover:text-primary-teal py-2 border-b border-white/5"
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-lg font-medium text-slate-300 hover:text-primary-teal py-2 border-b border-white/5"
              >
                How It Works
              </a>
              <a 
                href="#pricing" 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-lg font-medium text-slate-300 hover:text-primary-teal py-2 border-b border-white/5"
              >
                Pricing
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-lg font-medium text-slate-300 hover:text-primary-teal py-2 border-b border-white/5"
              >
                Reviews
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGetStarted();
                }}
                className="w-full bg-primary-teal hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                Launch Tracker App <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* HERO SECTION */}
          <header className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden px-6 py-20 bg-gradient-to-b from-[#1A1A2E] via-[#10101C] to-[#1A1A2E]">
            
            {/* Soft travel themed background illustration done in pure CSS */}
            <div className="absolute inset-0 z-0 opacity-25">
              {/* Mountain silhouettes in CSS using gradients and clip-paths */}
              <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#10101C] to-transparent"></div>
              {/* Sun/Glow shape */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-primary-teal/40 to-coral/30 blur-[130px] rounded-full"></div>
              {/* Star-like dots */}
              <div className="absolute top-20 left-20 w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping"></div>
              <div className="absolute top-36 right-40 w-1 h-1 bg-coral rounded-full"></div>
              <div className="absolute top-80 left-1/3 w-1 h-1 bg-white rounded-full"></div>
              
              {/* CSS Mountain Layer */}
              <div className="absolute bottom-0 left-10 w-[45%] h-64 bg-slate-900/60" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}></div>
              <div className="absolute bottom-0 right-5 w-[50%] h-80 bg-slate-800/40" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}></div>
              <div className="absolute bottom-0 left-1/4 w-[60%] h-48 bg-teal-950/20" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-coral text-xs font-bold tracking-widest uppercase animate-pulse">
                <Sparkles className="w-3.5 h-3.5 fill-coral" /> Next Gen AI Release v2.4
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight text-white leading-tight">
                Your AI-Powered <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-teal via-teal-300 to-coral">Travel Companion</span>
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Skip the tedious hours of itinerary planning, chaotic receipts, and fragmented routing. WanderWise maps personalized local expeditions based on your custom travel personality.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <button
                  onClick={handleGetStarted}
                  className="w-full sm:w-auto px-8 py-4 bg-primary-teal hover:bg-teal-600 text-white font-bold rounded-xl shadow-xl shadow-teal-500/25 z-10 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Start Free Planning
                </button>
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl hover:border-white/20 transition-all duration-200 text-center"
                >
                  Watch Demo Info
                </a>
              </div>

              {/* Floating micro badges showing active stats */}
              <div className="flex flex-wrap justify-center gap-6 pt-10 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary-teal" /> 142k+ Happy Wanderers</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary-teal" /> 100% Personalized</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary-teal" /> Instant Dynamic Optimization</span>
              </div>
            </div>
          </header>

          {/* SECTION: 6 FEATURES GRID */}
          <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full scroll-mt-20">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-bold font-mono text-primary-teal tracking-widest uppercase">END-TO-END AUTOMATION</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white">
                Everything you need to cruise through global borders
              </h2>
              <p className="text-slate-400">
                WanderWise combines location wisdom, automated tracking indices, and conversation modules to secure your path.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((feat, idx) => {
                const IconComp = feat.icon;
                return (
                  <div 
                    key={idx}
                    className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-teal/40 transition-all duration-300 hover:-translate-y-1.5 group select-none relative overflow-hidden"
                  >
                    {/* Corner gradient ambient hover glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-teal/5 to-transparent rounded-bl-full group-hover:from-primary-teal/15 transition-all duration-300"></div>

                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center ${feat.iconColor} mb-6 shadow-md transition-transform duration-300 group-hover:scale-110`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-teal transition-colors duration-200">{feat.title}</h3>
                    
                    <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION: 4-STEP HOW IT WORKS TIMELINE */}
          <section id="how-it-works" className="py-24 bg-slate-950/40 border-y border-white/5 px-6 md:px-12 scroll-mt-20">
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center max-w-xl mx-auto space-y-4 mb-20">
                <span className="text-xs font-bold font-mono text-coral tracking-widest uppercase">EASY FLOW</span>
                <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white">How WanderWise Empowers You</h2>
                <p className="text-slate-400">From picking a generic wishlist to tracking concrete footsteps with precision.</p>
              </div>

              {/* Timeline layout */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {/* Connecting Line (desktop only) */}
                <div className="hidden md:block absolute top-[2.5rem] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary-teal via-teal-500/30 to-coral z-0"></div>

                {STEPS.map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-4 group">
                    <div className="w-16 h-16 rounded-2xl bg-[#1A1A2E] border-2 border-primary-teal group-hover:border-coral flex items-center justify-center font-display text-2xl font-black text-white shadow-xl shadow-primary-teal/5 transition-colors duration-300">
                      {step.num}
                    </div>
                    
                    <h3 className="text-lg font-bold text-white group-hover:text-primary-teal transition-colors duration-200 pt-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION: 3-TIER PRICING */}
          <section id="pricing" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full scroll-mt-20">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-bold font-mono text-primary-teal tracking-widest uppercase font-semibold">PRICING PLANS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white">Choose Your Ideal Travel Horizon</h2>
              <p className="text-slate-400">Whether exploring neighboring blocks or doing premium multi-continent nomad runs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-6">
              {PRICING.map((plan, idx) => (
                <div 
                  key={idx}
                  className={`relative p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                    plan.popular 
                      ? "bg-[#1A1A2E] border-2 border-primary-teal shadow-2xl shadow-teal-500/10 scale-105-desktop z-10 ring-4 ring-primary-teal/10" 
                      : "bg-white/5 border border-white/10 hover:border-white/20"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-teal to-coral text-white text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md">
                      MOST POPULAR NOMAD CHOICE
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed">{plan.desc}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-slate-400">$</span>
                      <span className="text-5xl font-black text-white font-display tracking-tight">{plan.price}</span>
                      <span className="text-xs text-slate-400 font-mono"> / trip run</span>
                    </div>

                    <hr className="border-white/10" />

                    <ul className="space-y-3">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-4 text-sm text-slate-300">
                          <Check className="w-5 h-5 text-primary-teal shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={handleGetStarted}
                    className={`w-full mt-8 py-3.5 px-4 rounded-xl font-extrabold text-sm transition-all duration-200 cursor-pointer ${
                      plan.popular 
                        ? "bg-primary-teal hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20" 
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/15"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: TESTIMONIALS */}
          <section id="testimonials" className="py-24 bg-gradient-to-b from-[#1A1A2E] to-[#101024] border-t border-white/5 px-6 md:px-12 scroll-mt-20">
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center max-w-xl mx-auto space-y-4 mb-20">
                <span className="text-xs font-bold font-mono text-coral tracking-widest uppercase">AUTHENTIC EXPERIENCES</span>
                <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white">Validated By Real Nomads</h2>
                <p className="text-slate-400">Discover stories from people optimizing their travel steps with WanderWise.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((test, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl relative flex flex-col justify-between">
                    <span className="absolute top-6 right-8 text-6xl text-primary-teal/10 font-serif font-black select-none pointer-events-none">“</span>
                    
                    <div className="space-y-4">
                      {/* Rating stars */}
                      <div className="flex gap-1">
                        {[...Array(test.rating)].map((_, sIdx) => (
                          <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      
                      <p className="text-slate-300 text-sm leading-relaxed italic">{test.quote}</p>
                    </div>

                    <div className="flex items-center gap-4 pt-8 mt-4 border-t border-white/5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-teal to-coral flex items-center justify-center font-bold text-white text-xs">
                        {test.avatar}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{test.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400">{test.role}</span>
                          <span className="w-1 h-1 bg-primary-teal rounded-full"></span>
                          <span className="text-[10px] text-primary-teal font-black">{test.tag}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA BANNER */}
          <section className="py-20 px-6 md:px-12">
            <div className="max-w-5xl mx-auto rounded-3xl p-8 md:p-16 bg-gradient-to-br from-teal-900/40 via-[#1A1A2E] to-coral/10 border border-primary-teal/20 text-center space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary-teal/5 rounded-br-full blur-xl"></div>
              <p className="text-xs font-bold font-mono text-primary-teal tracking-widest uppercase">READY TO TRAVEL?</p>
              <h2 className="text-3xl md:text-5xl font-extrabold font-display leading-tight text-white">Your Perfect Day-by-Day Journey <br />Awaits Construction</h2>
              <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
                Join a dynamic vanguard of global explorers. Setup your travel parameters today and bypass tedious hours of planning forever.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleGetStarted}
                  className="px-8 py-4 bg-primary-teal hover:bg-teal-600 text-white font-bold rounded-xl shadow-xl shadow-teal-500/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  Launch Intelligent Assistant Now
                </button>
              </div>
            </div>
          </section>

          {/* 4-COLUMN FOOTER */}
          <footer className="bg-[#10101C] border-t border-white/10 pt-16 pb-12 px-6 md:px-12 text-slate-400 text-xs mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
              
              <div className="space-y-3 col-span-2 md:col-span-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary-teal rounded flex items-center justify-center font-bold text-white text-xs">W</div>
                  <span className="text-sm font-bold font-display text-white tracking-tight">WanderWise</span>
                </div>
                <p className="text-slate-500 leading-relaxed pr-6">
                  Next-generation AI core dedicated to transforming tedious holiday coordination into blissful, optimized adventures.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-bold tracking-tight text-sm">Product</h4>
                <div className="flex flex-col gap-2">
                  <a href="#" className="hover:text-primary-teal">AI Engine Core</a>
                  <a href="#" className="hover:text-primary-teal">Local Insights API</a>
                  <a href="#" className="hover:text-primary-teal">Globi Concierge</a>
                  <a href="#" className="hover:text-primary-teal">Enterprise Accounts</a>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-bold tracking-tight text-sm">Legal & Trust</h4>
                <div className="flex flex-col gap-2">
                  <a href="#" className="hover:text-primary-teal">Privacy Policy</a>
                  <a href="#" className="hover:text-primary-teal">Terms of Service</a>
                  <a href="#" className="hover:text-primary-teal">Cookie Preferences</a>
                  <a href="#" className="hover:text-primary-teal">Security Metrics</a>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-bold tracking-tight text-sm">Stay Updated</h4>
                <p className="text-slate-500 leading-relaxed">Subscribe to our newsletter for hidden location updates and safety score analysis.</p>
                <div className="flex gap-1 pt-1">
                  <input 
                    type="email" 
                    placeholder="explorer@email.com" 
                    className="w-full bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-white text-xs focus:outline-none focus:border-primary-teal/60"
                  />
                  <button className="bg-primary-teal text-white font-bold p-1.5 rounded-lg hover:bg-teal-600">
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-center sm:text-left">
              <p>© 2026 WanderWise Corp. All global rights reserved worldwide. Powered by Gemini Cloud Core.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-slate-400">Twitter</a>
                <a href="#" className="hover:text-slate-400">LinkedIn</a>
                <a href="#" className="hover:text-slate-400">Instagram</a>
              </div>
            </div>
          </footer>

        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 1.5: LOGIN SCREEN                                    */}
      {/* ========================================================= */}
      {view === "login" && (
        <div id="login-screen" className="min-h-screen w-full flex items-center justify-center bg-[#1A1A2E] text-slate-100 relative overflow-hidden px-4 py-12">
          {/* Cosmic background circles decoration */}
          <div className="absolute inset-0 z-0 opacity-25">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gradient-to-tr from-primary-teal/30 to-coral/20 blur-[100px] rounded-full"></div>
          </div>

          <div className="relative z-10 w-full max-w-md bg-[#1A1A2E]/80 border border-white/10 backdrop-blur-md px-6 py-8 sm:p-10 rounded-3xl shadow-2xl flex flex-col space-y-6">
            
            {/* Logo and Tagline */}
            <div className="flex flex-col items-center text-center space-y-2 select-none">
              <div className="w-12 h-12 bg-gradient-to-tr from-primary-teal to-coral rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-500/15">
                W
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white mt-1">WanderWise</h1>
              <p className="text-slate-400 text-xs">Your AI Travel Companion</p>
            </div>

            {/* Back to product site */}
            <button 
              onClick={() => setView("landing")}
              className="text-slate-400 hover:text-white text-xs font-semibold self-center flex items-center gap-1 cursor-pointer transition-colors"
            >
              &larr; Return to Product Site
            </button>

            {/* Selection Tabs */}
            <div className="grid grid-cols-2 p-1 bg-white/5 rounded-xl border border-white/5">
              <button 
                onClick={() => { setAuthTab("signin"); setAuthError(""); setAuthSuccess(""); }}
                className={`py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  authTab === "signin" ? "bg-primary-teal text-white shadow-md shadow-teal-500/10" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Sign In
              </button>
              <button 
                onClick={() => { setAuthTab("signup"); setAuthError(""); setAuthSuccess(""); }}
                className={`py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  authTab === "signup" ? "bg-primary-teal text-white shadow-md shadow-teal-500/10" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Sign Up
              </button>
            </div>

            {authError && (
              <div id="login-error-toast" className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-200 text-xs rounded-xl flex items-center gap-2 font-medium">
                <span className="text-sm shrink-0">⚠️</span>
                <span>{authError}</span>
              </div>
            )}

            {authSuccess && (
              <div className="p-3.5 bg-teal-500/10 border border-teal-500/30 text-teal-200 text-xs rounded-xl flex items-center gap-2 font-medium">
                <span className="text-sm shrink-0">🎉</span>
                <span>{authSuccess}</span>
              </div>
            )}

            {authTab === "signin" ? (
              /* SIGN IN FORM */
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label htmlFor="signin-email" className="block text-[10px] uppercase font-bold text-slate-400 font-mono mb-1.5">Email Address</label>
                  <input 
                    id="signin-email"
                    type="email" 
                    required 
                    placeholder="e.g. wanderer@wise.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary-teal/60 focus:ring-1 focus:ring-primary-teal/30 font-medium"
                  />
                </div>
                <div>
                  <label htmlFor="signin-password" className="block text-[10px] uppercase font-bold text-slate-400 font-mono mb-1.5">Password</label>
                  <input 
                    id="signin-password"
                    type="password" 
                    required 
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary-teal/60 focus:ring-1 focus:ring-primary-teal/30 font-medium"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3.5 bg-primary-teal hover:bg-teal-600 text-white text-xs font-extrabold rounded-xl shadow-lg shadow-teal-500/10 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  Access Your Workspace
                </button>
              </form>
            ) : (
              /* SIGN UP FORM */
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label htmlFor="signup-name" className="block text-[10px] uppercase font-bold text-slate-400 font-mono mb-1.5">Full Name</label>
                  <input 
                    id="signup-name"
                    type="text" 
                    required 
                    placeholder="e.g. Clara Rivers"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary-teal/60 focus:ring-1 focus:ring-primary-teal/30 font-medium"
                  />
                </div>
                <div>
                  <label htmlFor="signup-email" className="block text-[10px] uppercase font-bold text-slate-400 font-mono mb-1.5">Email Address</label>
                  <input 
                    id="signup-email"
                    type="email" 
                    required 
                    placeholder="e.g. clara@wise.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary-teal/60 focus:ring-1 focus:ring-primary-teal/30 font-medium"
                  />
                </div>
                <div>
                  <label htmlFor="signup-password" className="block text-[10px] uppercase font-bold text-slate-400 font-mono mb-1.5">Password</label>
                  <input 
                    id="signup-password"
                    type="password" 
                    required 
                    placeholder="••••••••"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary-teal/60 focus:ring-1 focus:ring-primary-teal/30 font-medium"
                  />
                </div>
                <div>
                  <label htmlFor="signup-confirm" className="block text-[10px] uppercase font-bold text-slate-400 font-mono mb-1.5">Confirm Password</label>
                  <input 
                    id="signup-confirm"
                    type="password" 
                    required 
                    placeholder="••••••••"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary-teal/60 focus:ring-1 focus:ring-primary-teal/30 font-medium"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3.5 bg-primary-teal hover:bg-teal-600 text-white text-xs font-extrabold rounded-xl shadow-lg shadow-teal-500/10 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  Create New Account
                </button>
              </form>
            )}

            {/* Divider line */}
            <div className="flex items-center gap-4 py-1">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-slate-400 text-xs font-mono select-none">or</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* Guest button */}
            <button 
              onClick={handleContinueAsGuest}
              className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/15 text-white text-xs font-bold rounded-xl active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Continue as Guest Traveller &rarr;
            </button>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 1.8: ONBOARDING WIZARD                                */}
      {/* ========================================================= */}
      {view === "onboarding" && (
        <div id="onboarding-wizard" className="min-h-screen bg-[#F8F9FA] text-[#1A1A2E] flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-2xl bg-white border border-slate-100 rounded-3xl shadow-xl flex flex-col overflow-hidden">
            
            {/* Header / Tracker */}
            <div className="p-6 md:p-8 bg-[#1A1A2E] text-white space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary-teal rounded flex items-center justify-center font-bold text-xs text-white">W</div>
                  <span className="font-bold text-sm font-display tracking-tight">WanderWise Calibration</span>
                </div>
                <span className="text-[10px] font-mono text-[#14B8A6] uppercase tracking-widest font-black">
                  {showFinalSummary ? "ANALYSIS COMPILED" : `STEP ${onboardingStep} OF 4`}
                </span>
              </div>
              
              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl font-bold font-display text-white">
                  {showFinalSummary && "Profile Construction Complete"}
                  {!showFinalSummary && onboardingStep === 1 && "Start Your Profile Calibration"}
                  {!showFinalSummary && onboardingStep === 2 && "Calibrate Your Travel Style"}
                  {!showFinalSummary && onboardingStep === 3 && "Construct Budget Thresholds"}
                  {!showFinalSummary && onboardingStep === 4 && "Polish Preferences & Restrictions"}
                </h2>
                <p className="text-xs text-slate-300">
                  {showFinalSummary && "Review your calculated travel identity dossier and start planning dynamic excursions."}
                  {!showFinalSummary && onboardingStep === 1 && "Customize vital details to allow the companion to trigger home city currency structures."}
                  {!showFinalSummary && onboardingStep === 2 && "Choose styles and stay durations to tailor recommendation algorithms."}
                  {!showFinalSummary && onboardingStep === 3 && "Determine daily comfort tier, companions, and accommodations constraints."}
                  {!showFinalSummary && onboardingStep === 4 && "Select food guideline restrictions, special interests, and transit capabilities."}
                </p>
              </div>

              {/* Progress bar tracker */}
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-primary-teal h-full transition-all duration-300"
                  style={{ width: showFinalSummary ? "100%" : `${(onboardingStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Wizard Body content */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto max-h-[60vh] space-y-6">
              {!showFinalSummary ? (
                <>
                  {onboardingStep === 1 && (
                    /* STEP 1: BASICS */
                    <div className="space-y-5 animate-fade-in">
                      <div>
                        <label htmlFor="ob-name-field" className="block text-[10px] uppercase font-extrabold text-slate-400 font-mono mb-2">Display Name</label>
                        <input 
                          id="ob-name-field"
                          type="text" 
                          required
                          placeholder="What should WanderWise call you?"
                          value={obName}
                          onChange={(e) => setObName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#14B8A6] focus:bg-white text-[#1A1A2E] font-medium transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="ob-dob-field" className="block text-[10px] uppercase font-extrabold text-slate-400 font-mono mb-2">Date of Birth</label>
                        <input 
                          id="ob-dob-field"
                          type="date" 
                          value={obDob}
                          onChange={(e) => setObDob(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#14B8A6] focus:bg-white text-[#1A1A2E] font-medium transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="ob-city-field" className="block text-[10px] uppercase font-extrabold text-slate-400 font-mono mb-2">Home Base City</label>
                        <input 
                          id="ob-city-field"
                          type="text" 
                          placeholder="e.g. Mumbai, New York, London..."
                          value={obHomeCity}
                          onChange={(e) => setObHomeCity(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#14B8A6] focus:bg-white text-[#1A1A2E] font-medium transition-all mb-3.5"
                        />
                        
                        <div className="flex flex-wrap gap-2 pt-1">
                          {["Mumbai", "Delhi", "Bengaluru", "New York", "London", "Paris", "Tokyo"].map((city) => (
                            <button 
                              key={city}
                              type="button"
                              onClick={() => setObHomeCity(city)}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-bold tracking-tight transition-all cursor-pointer"
                            >
                              + {city}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-extrabold text-slate-400 font-mono mb-2">Preferred Base Currency</label>
                        <div className="grid grid-cols-4 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100/50">
                          {["INR", "USD", "EUR", "GBP"].map((curr) => (
                            <button 
                              key={curr}
                              type="button"
                              onClick={() => setObCurrency(curr)}
                              className={`py-2 rounded-lg text-xs font-black tracking-wide transition-all cursor-pointer ${
                                obCurrency === curr 
                                  ? "bg-[#14B8A6] text-white shadow-sm" 
                                  : "text-slate-500 hover:text-slate-800"
                              }`}
                            >
                              {curr}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {onboardingStep === 2 && (
                    /* STEP 2: TRAVEL STYLE */
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <label className="block text-[10px] uppercase font-extrabold text-slate-400 font-mono mb-3">Select Your Travel Style (Pick One)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {[
                            { style: "Adventure", emoji: "🧗", desc: "For extreme sports, off-beat trails, and high physical stakes." },
                            { style: "Relaxation", emoji: "🧘", desc: "For slow strolls, calm beaches, warm therapy, and spas." },
                            { style: "Cultural", emoji: "🏺", desc: "For historic structures, ancient galleries, and local folklore." },
                            { style: "Foodie", emoji: "🍜", desc: "For street stalls, gourmet dining alleys, cooking classes." },
                            { style: "Backpacker", emoji: "🎒", desc: "For affordable hostels, scenic public transits, and socials." },
                            { style: "Luxury", emoji: "💎", desc: "For customized private tours, elite 5-star suites, and cabs." }
                          ].map((card) => (
                            <div 
                              key={card.style}
                              onClick={() => setObTravelStyle(card.style)}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-3 text-left items-start ${
                                obTravelStyle === card.style 
                                  ? "border-primary-teal bg-teal-50/40 ring-2 ring-primary-teal/20" 
                                  : "border-slate-100 hover:border-slate-300 bg-slate-50/20"
                              }`}
                            >
                              <span className="text-2xl mt-0.5" role="img" aria-label={card.style}>{card.emoji}</span>
                              <div className="space-y-0.5">
                                <span className="font-bold text-xs text-[#1A1A2E] block">{card.style}</span>
                                <span className="text-[10px] text-slate-400 block leading-snug">{card.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-extrabold text-slate-400 font-mono mb-3">Preferred Trip Duration</label>
                        <div className="grid grid-cols-4 gap-2">
                          {["Weekend", "1 week", "2 weeks", "1 month+"].map((dur) => (
                            <button 
                              key={dur}
                              type="button"
                              onClick={() => setObTripDuration(dur)}
                              className={`py-2 px-1 text-center rounded-xl text-xs font-black tracking-tight transition-all cursor-pointer ${
                                obTripDuration === dur 
                                  ? "bg-[#14B8A6] text-white shadow-sm" 
                                  : "bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-100"
                              }`}
                            >
                              {dur}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {onboardingStep === 3 && (
                    /* STEP 3: BUDGET & STAY */
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <label className="block text-[10px] uppercase font-extrabold text-slate-400 font-mono mb-3">Choose Comfort Scale (Pick One)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                          {[
                            { tier: "Budget", desc: "Hostels, street food corners, dynamic trains.", usd: 40, inr: 3000, eur: 35, gbp: 30 },
                            { tier: "Mid-range", desc: "Cozy hotels or Airbnbs, neighborhood cafes.", usd: 150, inr: 10000, eur: 130, gbp: 110 },
                            { tier: "Luxury", desc: "Bespoke suites, premium fine dine, private drivers.", usd: 500, inr: 35000, eur: 450, gbp: 400 }
                          ].map((card) => {
                            let priceHint = `$${card.usd}`;
                            if (obCurrency === "INR") priceHint = `₹${card.inr.toLocaleString()}`;
                            if (obCurrency === "EUR") priceHint = `€${card.eur}`;
                            if (obCurrency === "GBP") priceHint = `£${card.gbp}`;

                            return (
                              <div 
                                key={card.tier}
                                onClick={() => setObBudgetTier(card.tier)}
                                className={`p-4 rounded-2xl border border-slate-100 text-left bg-white cursor-pointer transition-all space-y-2 flex flex-col justify-between ${
                                  obBudgetTier === card.tier 
                                    ? "border-primary-teal bg-teal-50/40 ring-2 ring-primary-teal/20 shadow-sm" 
                                    : "hover:border-slate-300"
                                }`}
                              >
                                <span className="font-bold text-xs text-[#1A1A2E] block">{card.tier}</span>
                                <span className="text-[10px] text-slate-400 block leading-tight">{card.desc}</span>
                                <div className="pt-2 text-xs font-black text-primary-teal">{priceHint} <span className="text-[9px] font-normal text-slate-400">/ day avg</span></div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-extrabold text-slate-400 font-mono mb-3">Accommodation Preferences (Multi-Select)</label>
                        <div className="flex flex-wrap gap-2">
                          {["Hostel", "Hotel", "Airbnb", "Resort", "Homestay"].map((acc) => {
                            const isSel = obAccommodation.includes(acc);
                            return (
                              <button 
                                key={acc}
                                type="button"
                                onClick={() => {
                                  if (isSel) {
                                    setObAccommodation(obAccommodation.filter((x: string) => x !== acc));
                                  } else {
                                    setObAccommodation([...obAccommodation, acc]);
                                  }
                                }}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                                  isSel 
                                    ? "bg-[#1A1A2E] text-white border-[#1A1A2E]" 
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 focus:outline-none"
                                }`}
                              >
                                {acc}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-extrabold text-[#1A1A2E] font-mono mb-3">Who are you travelling with?</label>
                        <div className="grid grid-cols-4 gap-2">
                          {["Solo", "Couple", "Family", "Friends"].map((comp) => (
                            <button 
                              key={comp}
                              type="button"
                              onClick={() => setObCompanions(comp)}
                              className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                obCompanions === comp 
                                  ? "bg-[#14B8A6] text-white shadow-sm" 
                                  : "bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-100"
                              }`}
                            >
                              {comp}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {onboardingStep === 4 && (
                    /* STEP 4: PREFERENCES & RESTRICTIONS */
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <label className="block text-[10px] uppercase font-extrabold text-slate-400 font-mono mb-2">Dietary Regimen (Multi-Select)</label>
                        <div className="flex flex-wrap gap-2">
                          {["No Preference", "Vegetarian", "Vegan", "Halal", "Kosher", "Gluten-Free"].map((diet) => {
                            const isSel = obFoodPrefs.includes(diet);
                            return (
                              <button 
                                key={diet}
                                type="button"
                                onClick={() => {
                                  if (diet === "No Preference") {
                                    setObFoodPrefs(["No Preference"]);
                                  } else {
                                    const filtered = obFoodPrefs.filter((x: string) => x !== "No Preference");
                                    if (isSel) {
                                      setObFoodPrefs(filtered.filter((x: string) => x !== diet).length > 0 ? filtered.filter((x: string) => x !== diet) : ["No Preference"]);
                                    } else {
                                      setObFoodPrefs([...filtered, diet]);
                                    }
                                  }
                                }}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                                  isSel 
                                    ? "bg-[#1A1A2E] text-white border-[#1A1A2E]" 
                                    : "bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-200"
                                }`}
                              >
                                {diet}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-extrabold text-slate-400 font-mono mb-2">Primary Travel Interests (Multi-Select)</label>
                        <div className="flex flex-wrap gap-2">
                          {["Beaches", "Mountains", "History", "Nightlife", "Food", "Shopping", "Wildlife", "Adventure Sports"].map((interest) => {
                            const isSel = obInterests.includes(interest);
                            return (
                              <button 
                                key={interest}
                                type="button"
                                onClick={() => {
                                  if (isSel) {
                                    setObInterests(obInterests.filter((x: string) => x !== interest));
                                  } else {
                                    setObInterests([...obInterests, interest]);
                                  }
                                }}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                                  isSel ? "bg-[#14B8A6] text-white border-[#14B8A6] shadow-sm" : "bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-200"
                                }`}
                              >
                                {interest}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-extrabold text-slate-400 font-mono mb-2">Languages Spoken (Multi-Select)</label>
                        <div className="flex flex-wrap gap-2">
                          {["English", "Hindi", "Spanish", "French", "Chinese", "Japanese", "German", "Arabic"].map((lang) => {
                            const isSel = obLanguages.includes(lang);
                            return (
                              <button 
                                key={lang}
                                type="button"
                                onClick={() => {
                                  if (isSel) {
                                    setObLanguages(obLanguages.filter((x: string) => x !== lang));
                                  } else {
                                    setObLanguages([...obLanguages, lang]);
                                  }
                                }}
                                className={`px-2.5 py-1.5 rounded-lg text-xs border transition-all cursor-pointer ${
                                  isSel ? "bg-[#1A1A2E] text-white border-[#1A1A2E]" : "bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200"
                                }`}
                              >
                                {lang}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-extrabold text-slate-400 font-mono mb-2">Transit Mobility Preference: <span className="text-[#14B8A6] font-extrabold">{obMobility}</span></label>
                        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-50 border border-slate-100 rounded-xl">
                          {["Low", "Moderate", "High"].map((mob) => (
                            <button 
                              key={mob}
                              type="button"
                              onClick={() => setObMobility(mob)}
                              className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                obMobility === mob ? "bg-[#14B8A6] text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
                              }`}
                            >
                              {mob}
                            </button>
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 leading-normal block mt-1.5 font-medium">“Low” focuses on quiet transfers and resorts; “High” optimizes walking ancient lanes.</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* FINAL BOARDING PASS SUMMARY SHEET */
                <div className="space-y-5 animate-fade-in text-left">
                  <div className="bg-teal-50 border border-teal-100 p-4 rounded-2xl flex items-center gap-3">
                    <Award className="w-8 h-8 text-primary-teal shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#14B8A6] font-mono leading-tight">IDENTIFIED DYNAMIC PERSONA</p>
                      <h4 id="ob-persona-badge" className="text-base font-black text-[#1A1A2E]">{previewProfile?.travelPersona}</h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block font-mono">Traveler Basics</span>
                      <p className="text-xs font-bold text-[#1A1A2E]">{previewProfile?.name}</p>
                      <p className="text-[10px] text-slate-500">DOB: {previewProfile?.dob} &bull; Base: {previewProfile?.homeCity}</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block font-mono">Calibrated Wallet Allowance</span>
                      <p className="text-lg font-black text-primary-teal font-display">
                        {previewProfile?.currency === "INR" ? "₹" : previewProfile?.currency === "EUR" ? "€" : previewProfile?.currency === "GBP" ? "£" : "$"}
                        {previewProfile?.dailyBudget?.toLocaleString()}
                        <span className="text-[10px] font-normal text-slate-400"> / day</span>
                      </p>
                      <p className="text-[9px] text-slate-400 uppercase font-mono">Home currency: {previewProfile?.currency}</p>
                    </div>
                  </div>

                  {/* Progressive budget split breakdown view */}
                  <div className="p-5 bg-[#1A1A2E] text-slate-200 rounded-3xl space-y-3 shadow-lg shadow-teal-900/10">
                    <span className="text-[9px] text-[#14B8A6] font-extrabold tracking-widest uppercase font-mono block">Dynamic AI Budget Split Allocation Matrix</span>
                    <div className="grid grid-cols-5 gap-2 text-center text-xs">
                      <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-sm block font-black text-white">40%</span>
                        <span className="text-[9px] text-slate-400 uppercase font-mono block">Stay</span>
                      </div>
                      <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-sm block font-black text-white">25%</span>
                        <span className="text-[9px] text-slate-400 uppercase font-mono block">Food</span>
                      </div>
                      <div className="p-2 bg-white/5 rounded-xl border border-white/5 font-mono">
                        <span className="text-sm block font-black text-white">15%</span>
                        <span className="text-[9px] text-slate-400 uppercase block">Transit</span>
                      </div>
                      <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-sm block font-black text-white">15%</span>
                        <span className="text-[9px] text-slate-400 uppercase block">Active</span>
                      </div>
                      <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-sm block font-black text-white">5%</span>
                        <span className="text-[9px] text-slate-400 uppercase block font-mono">Shop</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block font-mono">Preference Matrix Calibrated</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
                      <div><span className="text-slate-400">Duration:</span> <span className="font-bold text-slate-700">{previewProfile?.tripDuration}</span></div>
                      <div><span className="text-slate-400">Pacing:</span> <span className="font-bold text-slate-700">{previewProfile?.travelStyle}</span></div>
                      <div><span className="text-slate-400">Companions:</span> <span className="font-bold text-slate-700">{previewProfile?.companions}</span></div>
                      <div><span className="text-slate-400">Mobility:</span> <span className="font-bold text-slate-700">{previewProfile?.mobility}</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold font-mono block">Stay Styles</span>
                        <span className="font-semibold text-slate-800">{previewProfile?.accommodation?.join(", ")}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold font-mono block">Diet Controls</span>
                        <span className="font-semibold text-slate-800">{previewProfile?.foodPrefs?.join(", ")}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] uppercase font-extrabold text-slate-400 font-mono block">Subscribed Interests</span>
                      <p className="text-xs font-semibold text-slate-800 mt-0.5">{previewProfile?.interests?.join(", ")}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Steps buttons footer */}
            <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button 
                type="button"
                onClick={handleOnboardingBack}
                disabled={onboardingStep === 1 && !showFinalSummary}
                className={`py-2.5 px-5 text-xs font-black rounded-xl transition-all ${
                  onboardingStep === 1 && !showFinalSummary
                    ? "text-slate-300 bg-slate-100 cursor-not-allowed" 
                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800 cursor-pointer"
                }`}
              >
                &larr; Back
              </button>

              {onboardingStep === 4 && !showFinalSummary ? (
                <button 
                  type="button"
                  id="ob-compile-btn"
                  onClick={handleCompileSummary}
                  className="py-3 px-6 bg-primary-teal hover:bg-teal-600 text-white text-xs font-extrabold rounded-xl transition-all active:scale-95 shadow-md shadow-teal-500/10 cursor-pointer"
                >
                  Compile Profile Analysis &rarr;
                </button>
              ) : onboardingStep === 4 && showFinalSummary ? (
                <button 
                  type="button"
                  id="ob-finish-btn"
                  onClick={handleOnboardingFinish}
                  className="py-3.5 px-8 bg-gradient-to-r from-primary-teal to-coral hover:scale-[1.03] text-white text-xs font-black tracking-wider uppercase rounded-xl transition-all active:scale-98 shadow-lg shadow-teal-500/15 cursor-pointer"
                >
                  Start Exploring Now 🎉
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={handleOnboardingNext}
                  className="py-3 px-6 bg-primary-teal hover:bg-teal-600 text-white text-xs font-extrabold rounded-xl transition-all active:scale-95 shadow-md shadow-teal-500/10 cursor-pointer"
                >
                  Continue &rarr;
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 2: APP SHELL (THE WORKSPACE)                          */}
      {/* ========================================================= */}
      {view === "app" && (
        <div id="app-shell" className="min-h-screen flex flex-col md:flex-row bg-[#F8F9FA] text-[#1A1A2E] transition-opacity duration-300">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="w-full md:w-64 bg-[#1A1A2E] text-white flex flex-col shrink-0">
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5">
              <div onClick={() => setView("landing")} className="flex items-center gap-3 cursor-pointer select-none">
                <div className="w-8 h-8 bg-[#14B8A6] rounded-lg flex items-center justify-center font-bold">W</div>
                <div>
                  <span className="font-bold text-base block font-display">WanderWise</span>
                  <span className="text-[9px] text-primary-teal tracking-wider uppercase block -mt-1 font-mono">Workspace</span>
                </div>
              </div>
              
              <button
                onClick={() => setView("landing")}
                className="md:hidden text-slate-400 hover:text-white px-2 py-1 bg-white/5 rounded-lg text-xs"
              >
                Back To Landing
              </button>
            </div>
            
            {/* Nav List - Desktop */}
            <nav className="hidden md:flex flex-col flex-1 px-4 py-8 space-y-2">
              <button 
                onClick={() => setActiveTab("dashboard")} 
                id="tab-dashboard" 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all text-left cursor-pointer ${
                  activeTab === "dashboard" ? "bg-[#14B8A6] text-white" : "hover:bg-white/5 text-slate-400"
                }`}
              >
                <PieChart className="w-4 h-4 opacity-70" /> Dashboard
              </button>
              
              <button 
                onClick={() => setActiveTab("trips")} 
                id="tab-trips" 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all text-left cursor-pointer ${
                  activeTab === "trips" ? "bg-[#14B8A6] text-white" : "hover:bg-white/5 text-slate-400"
                }`}
              >
                <Plane className="w-4 h-4 opacity-70" /> Trips
              </button>
              
              <button 
                onClick={() => setActiveTab("explore")} 
                id="tab-explore" 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all text-left cursor-pointer ${
                  activeTab === "explore" ? "bg-[#14B8A6] text-white" : "hover:bg-white/5 text-slate-400"
                }`}
              >
                <Compass className="w-4 h-4 opacity-70" /> Explore
              </button>
              
              <button 
                onClick={() => setActiveTab("concierge")} 
                id="tab-concierge" 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all text-left cursor-pointer ${
                  activeTab === "concierge" ? "bg-[#14B8A6] text-white" : "hover:bg-white/5 text-slate-400"
                }`}
              >
                <Sparkles className="w-4 h-4 opacity-70" /> Globi AI
              </button>
              
              <button 
                onClick={() => setActiveTab("profile")} 
                id="tab-profile" 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all text-left cursor-pointer ${
                  activeTab === "profile" ? "bg-[#14B8A6] text-white" : "hover:bg-white/5 text-slate-400"
                }`}
              >
                <User className="w-4 h-4 opacity-70" /> Profile
              </button>
            </nav>

            {/* Profile snap & logout button */}
            <div className="hidden md:block p-6 border-t border-white/5">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#FF8E72] flex items-center justify-center font-bold text-white shrink-0">
                  {profileInitials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{profileName}</p>
                  <p className="text-[9px] text-[#14B8A6] font-extrabold tracking-wider uppercase truncate max-w-full" title={profilePersona}>{profilePersona}</p>
                </div>
              </div>
              <button 
                onClick={handleLogOut} 
                className="w-full mt-4 py-2.5 text-xs text-slate-500 hover:text-white transition-colors duration-200 border border-white/5 hover:border-white/10 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Log Out Workspace
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT WORKSPACE */}
          <main className="flex-1 flex flex-col p-6 md:p-8 overflow-x-hidden min-h-[85vh] md:min-h-screen">
            
            {/* Header pill bar */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <span className="text-[10px] text-[#14B8A6] tracking-widest uppercase font-mono font-black">WanderWise Command Panel</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] font-display">
                  {activeTab === "dashboard" ? "Dashboard Overview" : ""}
                  {activeTab === "trips" ? "AI Trips Studio" : ""}
                  {activeTab === "explore" ? "Kyoto Explorer Base" : ""}
                  {activeTab === "concierge" ? "Globi Conversational AI" : ""}
                  {activeTab === "profile" ? "Explorer Identity Card" : ""}
                </h2>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                {/* Active Trip Pill */}
                <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 text-xs font-semibold">
                  <span className="w-2.5 h-2.5 bg-[#14B8A6] rounded-full animate-ping"></span>
                  <span className="text-slate-500">Active Destination:</span>
                  <span className="text-[#1A1A2E] font-bold">Kyoto, Japan 🇯🇵</span>
                </div>

                {/* New Trip Action */}
                <button 
                  onClick={() => {
                    setActiveTab("trips");
                    const promptEl = document.getElementById("destination-input");
                    if (promptEl) promptEl.focus();
                  }}
                  className="bg-[#14B8A6] hover:bg-teal-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-transform active:scale-95 shadow-md shadow-teal-500/10 cursor-pointer"
                >
                  + Draft New Trip
                </button>
              </div>
            </header>

            {/* TAB CONTENT SPACES */}
            
            {/* 1. DASHBOARD TAB */}
            {activeTab === "dashboard" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* UPCOMING TRIP CARD */}
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-teal-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
                    
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-mono">Upcoming Trip Card</p>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-2">
                        <span className="px-2.5 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold rounded-lg tracking-wider uppercase">Active Ticket</span>
                        <h4 className="text-xl font-bold text-[#1A1A2E] flex items-center gap-2">Kyoto Ryokan & Tea Cultural Hunt</h4>
                        <p className="text-slate-400 text-xs flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary-teal" /> Haneda Intl Airport (HND) &bull; Departure Jun 12</p>
                      </div>
                      
                      {/* Interactive countdown trigger */}
                      <div className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center">
                        <span className="text-lg font-black text-primary-teal font-display tracking-tight">20 Days</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">COUNTDOWN</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono block">WEATHER INDEX</span>
                        <span className="text-sm font-bold text-[#1A1A2E] flex items-center gap-1.5 mt-1"><CloudSun className="w-4 h-4 text-amber-500" /> 22°C Clear</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono block">CONGESTION LEVEL</span>
                        <span className="text-xs font-bold text-teal-600 flex items-center gap-1.5 mt-1">Light (32% Crowd)</span>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono block font-bold">CONFIRMATION ID</span>
                        <span className="text-xs font-mono font-bold text-slate-600 tracking-wider block mt-1">#WWISE-90401-KTO</span>
                      </div>
                    </div>
                  </div>

                  {/* VISITED PLACES MAP (STYLIZED ILLUSTRATED MAP MODULE) */}
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 relative">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-mono">Visited Places Map</p>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div>
                        <h4 className="text-base font-bold text-[#1A1A2E]">Global Conquest Vector Grid</h4>
                        <p className="text-slate-400 text-xs mt-0.5">Your dynamic passport footprints across tracked zones.</p>
                      </div>
                      <div className="flex gap-2 text-xs font-bold font-mono">
                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-slate-600">14 Countries</span>
                        <span className="px-3 py-1 bg-teal-50 rounded-lg text-teal-600">6% of Earth</span>
                      </div>
                    </div>

                    {/* Highly stylized mock world vector layout mapping visited markers */}
                    <div className="h-44 bg-slate-900 rounded-2xl flex flex-col justify-between p-4 relative overflow-hidden text-slate-500 font-mono text-[9px] select-none">
                      <div className="absolute inset-0 bg-radial-gradient from-teal-500/10 to-transparent pointer-events-none"></div>
                      
                      {/* Custom dotted grid map canvas lines */}
                      <div className="grid grid-cols-6 gap-2 w-full h-full opacity-35 absolute inset-0 p-3">
                        {[...Array(24)].map((_, i) => (
                          <div key={i} className="border-t border-l border-white/5 relative">
                            {i === 8 && <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-primary-teal animate-ping"></div>}
                            {i === 15 && <div className="absolute top-4 left-6 w-1.5 h-1.5 rounded-full bg-coral"></div>}
                          </div>
                        ))}
                      </div>

                      <div className="relative z-10 flex justify-between">
                        <span>LATITUDE GRID SYNTHESIS : EST-89</span>
                        <span className="text-primary-teal">READY</span>
                      </div>
                      
                      <div className="relative z-10 flex flex-col items-center justify-center py-6 text-center space-y-1">
                        <span className="font-serif italic text-sm text-slate-200 block font-bold">Wanderer interactive globe map module</span>
                        <span className="text-xs text-slate-400">Map Pins: 🇯🇵 Tokyo | 🇫🇷 Paris | 🇮🇹 Rome | 🇬🇧 London &bull; Synced with camera tracking</span>
                      </div>

                      <div className="relative z-10 flex justify-between text-slate-400 font-bold">
                        <span>WWISE-GPS: 35.6762° N, 139.6503° E</span>
                        <span className="text-coral">LAST TRACKED SPOT: ARASHIYAMA</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* SIDE COLUMN WORKSPACE */}
                <div className="space-y-6">
                  
                  {/* BUDGET SNAPSHOT */}
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-mono w-full text-left">Budget Snapshot</p>
                    
                    {/* Ring Progress circle visually implemented with CSS metrics */}
                    <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                      {/* Outer Ring */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="72" cy="72" r="58" stroke="#E2E8F0" strokeWidth="10" fill="transparent" />
                        <circle cx="72" cy="72" r="58" stroke="#14B8A6" strokeWidth="10" fill="transparent"
                          strokeDasharray={364}
                          strokeDashoffset={364 - (364 * budgetPercentage) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      
                      <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-black text-[#1A1A2E] font-display">{budgetPercentage}%</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest font-mono">OF TOTAL BUDGET</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-center w-full">
                      <p className="text-sm font-bold text-[#1A1A2E]">{currentCurrency}{totalExpense} Spent / {currentCurrency}{budgetLimit} Limit</p>
                      <p className="text-xs text-slate-400 font-medium">Safe spending velocity detected. No trap threats nearby.</p>
                    </div>

                    {/* Quick progress bar comparison */}
                    <div className="w-full mt-4 pt-4 border-t border-slate-100 flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Dining: {currentCurrency}{expenses.filter(e => e.category === "Dining").reduce((s, e) => s + e.amount, 0)}</span>
                      <span>Lodging: {currentCurrency}{expenses.filter(e => e.category === "Lodging").reduce((s, e) => s + e.amount, 0)}</span>
                    </div>
                  </div>

                  {/* TRAVEL PERSONA CARD */}
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-mono">Travel Persona</p>
                    
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#14B8A6]">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1A1A2E]">Slow Culturist Explorer</h4>
                        <span className="text-[9px] text-[#FF8E72] font-semibold tracking-wider uppercase font-mono">METRIC STABILITY SET</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4 pt-1">
                      <span className="px-2.5 py-1 bg-teal-50 text-[#14B8A6] rounded-lg text-[9px] font-extrabold">LOCAL FOOD HUBS</span>
                      <span className="px-2.5 py-1 bg-coral/5 text-coral rounded-lg text-[9px] font-extrabold">HISTORIC TEMPLES</span>
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-500 rounded-lg text-[9px] font-extrabold">SLOW SHINKANSEN</span>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed">
                      Preferences configure Globi and the Suggestion engine to prioritize quiet local markets and historic cafes over generic massive crowded avenues.
                    </p>
                  </div>

                  {/* QUICK ACTIONS PANEL */}
                  <div className="p-6 bg-[#1A1A2E] text-white rounded-3xl shadow-lg shadow-[#1A1A2E]/10 space-y-4">
                    <div>
                      <p className="text-[10px] font-extrabold text-primary-teal uppercase tracking-widest font-mono">Quick Actions</p>
                      <h4 className="text-sm font-bold text-white mt-1">Immediate Travel Toolkits</h4>
                    </div>

                    <div className="space-y-2 pt-2">
                      <button 
                        onClick={() => {
                          setWeatherCity("Kyoto");
                          setShowWeatherModal(true);
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold hover:-translate-y-0.5 active:translate-y-0 transition-all text-left"
                      >
                        <span className="flex items-center gap-2"><CloudSun className="w-4 h-4 text-amber-400" /> Active Weather Station</span>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </button>

                      <button 
                        onClick={() => {
                          setPhraseInput("");
                          setShowTranslatorModal(true);
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold hover:-translate-y-0.5 active:translate-y-0 transition-all text-left"
                      >
                        <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary-teal" /> Pocket Hello Translator</span>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </button>

                      <button 
                        onClick={() => {
                          setActiveTab("concierge");
                          handleSendChatMessage("What are the local rules and etiquette for tipping in Paris restaurants and taxis?");
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold hover:-translate-y-0.5 active:translate-y-0 transition-all text-left"
                      >
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-coral" /> Quick Tip Culture Guide</span>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 2. TRIPS TAB */}
            {activeTab === "trips" && (
              <div className="space-y-8 flex-1">
                
                {/* SUGGESTION FORM CARD */}
                <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
                  <div className="max-w-2xl mb-6">
                    <span className="px-2.5 py-1 bg-[#14B8A6]/10 text-primary-teal text-[10px] font-bold rounded-lg tracking-wider uppercase font-mono">AI SUGGESTED TRIP STUDIO</span>
                    <h3 className="text-xl md:text-2xl font-bold text-[#1A1A2E] mt-3">Synthesize Custom Itineraries</h3>
                    <p className="text-slate-400 text-xs mt-1">Specify destination city guidelines. Our model aggregates optimal pathways based on slow-travel metrics.</p>
                  </div>

                  <form onSubmit={handleGenerateTrip} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-2">
                      <label htmlFor="destination-input" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">Target Destination City</label>
                      <input 
                        id="destination-input"
                        type="text" 
                        placeholder="e.g. Kyoto, Paris, Venice, Oahu" 
                        value={destQuery}
                        onChange={(e) => setDestQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#14B8A6] text-[#1A1A2E] font-medium"
                      />
                    </div>
                    <div>
                      <label htmlFor="duration-select" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">Timeline Duration</label>
                      <select 
                        id="duration-select"
                        value={tripDuration}
                        onChange={(e) => setTripDuration(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#14B8A6] text-[#1A1A2E] font-medium"
                      >
                        <option>2 Days</option>
                        <option>3 Days</option>
                        <option>5 Days</option>
                        <option>7 Days</option>
                      </select>
                    </div>
                    <div>
                      <button 
                        type="submit"
                        disabled={isGenerating || !destQuery.trim()}
                        className="w-full bg-[#14B8A6] hover:bg-teal-600 disabled:bg-slate-300 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        {isGenerating ? "Synthesizing Draft..." : "Plan with AI Core"}
                      </button>
                    </div>
                  </form>

                  {/* Generated results area */}
                  {generatedItinerary && (
                    <div className="mt-8 pt-8 border-t border-slate-100 space-y-6">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-[#1A1A2E] flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-[#14B8A6]" /> Generated {destQuery} Expedition Map
                          </h4>
                          <span className="text-slate-400 text-xs font-mono font-medium block mt-0.5">Optimized for Vibe constraints and quiet routing.</span>
                        </div>
                        <button 
                          onClick={() => {
                            alert(`Expedition to ${destQuery} successfully synced to your primary active workspace calendar!`);
                          }}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                        >
                          Sync to Calendar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {generatedItinerary.map((dayItem, key) => (
                          <div key={key} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 group">
                            <h5 className="font-bold text-[#1A1A2E] text-sm border-b border-slate-200 pb-3 mb-4 group-hover:text-primary-teal transition-colors font-display">
                              {dayItem.day}
                            </h5>
                            <div className="space-y-4">
                              {dayItem.spots.map((spot: any, sIdx: number) => (
                                <div key={sIdx} className="relative pl-4 border-l-2 border-primary-teal/30 group-hover:border-primary-teal transition-colors space-y-1">
                                  <span className="text-[9px] font-mono text-[#14B8A6] font-bold block">{spot.time}</span>
                                  <h6 className="text-xs font-bold text-[#1A1A2E]">{spot.name}</h6>
                                  <p className="text-[10px] text-slate-400 leading-relaxed">{spot.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* TRIP HISTORY & DESTINATION LIBRARIES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Destination Library (Card Sliders) */}
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 space-y-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Destination Library</p>
                    <h4 className="text-base font-bold text-[#1A1A2E]">Curated Global Escapes</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Destination Card item */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-300 transition-all hover:shadow-sm">
                        <span className="text-sm font-bold text-[#1A1A2E] block">Kyoto Ryokan 🇯🇵</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Culture & Sacred Spots</span>
                        <button 
                          onClick={() => {
                            setDestQuery("Kyoto");
                            setTripDuration("3 Days");
                          }}
                          className="mt-3 text-[10px] font-bold text-primary-teal hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          Synthesize Now <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Destination Card item */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-300 transition-all hover:shadow-sm">
                        <span className="text-sm font-bold text-[#1A1A2E] block">Parisian Alleys 🇫🇷</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Art & Boulangeries</span>
                        <button 
                          onClick={() => {
                            setDestQuery("Paris");
                            setTripDuration("5 Days");
                          }}
                          className="mt-3 text-[10px] font-bold text-primary-teal hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          Synthesize Now <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Trip History Timeline */}
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 space-y-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Trip History</p>
                    <h4 className="text-base font-bold text-[#1A1A2E]">Your Archive footprint</h4>

                    <div className="space-y-3.5">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-teal-50 flex items-center justify-center text-[#14B8A6] font-bold font-mono text-[10px]">9.8</span>
                          <div>
                            <span className="font-bold text-[#1A1A2E] block">Rome, Italy 🇮🇹</span>
                            <span className="text-[9px] text-slate-400">Oct 2025 &bull; Solo Explorer</span>
                          </div>
                        </div>
                        <span className="text-slate-400 font-mono text-[10px] font-medium">Archive Success</span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-teal-50 flex items-center justify-center text-[#14B8A6] font-bold font-mono text-[10px]">9.4</span>
                          <div>
                            <span className="font-bold text-[#1A1A2E] block">London, United Kingdom 🇬🇧</span>
                            <span className="text-[9px] text-slate-400">May 2025 &bull; Quick Business</span>
                          </div>
                        </div>
                        <span className="text-slate-400 font-mono text-[10px] font-medium">Archive Success</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* 3. EXPLORE TAB */}
            {activeTab === "explore" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* TODAY'S ITINERARY SLOTS */}
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 space-y-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Today’s Itinerary Slots</p>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <div>
                        <h4 className="text-[#1A1A2E] font-bold text-sm">Kyoto Core Path Explorer</h4>
                        <span className="text-[10px] text-slate-400">Today: Day 1 immersive cultural checklist</span>
                      </div>
                      <span className="px-2.5 py-1 bg-[#14B8A6]/10 text-primary-teal text-[10px] font-bold rounded-lg font-mono">ACTIVE HUB</span>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 bg-slate-50 border-l-4 border-primary-teal rounded-r-xl flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[#14B8A6] font-bold font-mono text-[9px]">09:00 AM - 11:00 AM</span>
                          <span className="font-bold text-[#1A1A2E] block mt-0.5">Espresso Brew Kyoto Ryokan Base</span>
                        </div>
                        <span className="text-[10px] text-teal-600 font-bold">In Progress</span>
                      </div>

                      <div className="p-3 bg-slate-50 border-l-4 border-slate-300 rounded-r-xl flex items-center justify-between text-xs">
                        <div>
                          <span className="text-slate-400 font-bold font-mono text-[9px]">11:30 AM - 02:00 PM</span>
                          <span className="font-bold text-[#1A1A2E] block mt-0.5">Arashiyama Bamboo Grove Walk</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold">Scheduled</span>
                      </div>

                      <div className="p-3 bg-slate-50 border-l-4 border-slate-300 rounded-r-xl flex items-center justify-between text-xs">
                        <div>
                          <span className="text-slate-400 font-bold font-mono text-[9px]">03:00 PM - 05:00 PM</span>
                          <span className="font-bold text-[#1A1A2E] block mt-0.5">Zen Temple Gion Tea Ceremony</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold">Scheduled</span>
                      </div>
                    </div>
                  </div>

                  {/* PLACES & EVENTS SEARCH */}
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 space-y-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Places & Events Search</p>
                    <h4 className="text-base font-bold text-[#1A1A2E]">Filter Kyoto Secrets & Food Spots</h4>

                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        placeholder="Search bamboo, tea, ryokan, gates, cafes..." 
                        value={placeSearch}
                        onChange={(e) => setPlaceSearch(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#14B8A6] text-[#1A1A2E]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        { title: "Arashiyama Bamboo Grove", rating: "4.9", dist: "1.2 km away", type: "Nature" },
                        { title: "Fushimi Inari Gates", rating: "4.9", dist: "4.8 km away", type: "Historic" },
                        { title: "Kinkaku-ji (Golden Pavilion)", rating: "4.8", dist: "5.5 km away", type: "Temple" },
                        { title: "Gion District Food Tour", rating: "4.7", dist: "2.1 km away", type: "Culinary" }
                      ]
                        .filter(item => item.title.toLowerCase().includes(placeSearch.toLowerCase()))
                        .map((spot, i) => {
                          const isFav = favoriteSpots.includes(spot.title);
                          return (
                            <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center text-xs">
                              <div>
                                <span className="font-bold text-[#1A1A2E] block">{spot.title}</span>
                                <span className="text-[10px] text-slate-400 block mt-0.5">{spot.dist} &bull; {spot.type}</span>
                              </div>
                              <button 
                                onClick={() => {
                                  if (isFav) {
                                    setFavoriteSpots(favoriteSpots.filter(f => f !== spot.title));
                                  } else {
                                    setFavoriteSpots([...favoriteSpots, spot.title]);
                                  }
                                }}
                                className={`p-2 rounded-xl transition-all cursor-pointer ${
                                  isFav ? "bg-red-50 text-red-500" : "bg-slate-200 text-slate-400 hover:text-red-400"
                                }`}
                              >
                                <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-red-500" : ""}`} />
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                </div>

                <div className="space-y-6">
                  
                  {/* BUDGET RING */}
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 space-y-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Budget Ring Dashboard</p>
                    <h4 className="text-[#1A1A2E] font-bold text-sm">Add Custom Expense Log</h4>

                    <form onSubmit={handleAddExpense} className="space-y-3">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Expense Description (e.g. Sushi, Train)"
                          value={newExpDesc}
                          onChange={(e) => setNewExpDesc(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#14B8A6] text-[#1A1A2E] font-medium"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          type="number" 
                          placeholder={`Amount (${currentCurrency})`}
                          value={newExpAmount}
                          onChange={(e) => setNewExpAmount(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#14B8A6] text-[#1A1A2E] font-medium"
                          required
                        />
                        <select 
                          value={newExpCat}
                          onChange={(e) => setNewExpCat(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-lg px-2 py-2 text-xs focus:outline-none focus:border-[#14B8A6] text-[#1A1A2E] font-medium"
                        >
                          <option>Dining</option>
                          <option>Lodging</option>
                          <option>Transit</option>
                          <option>Leisure</option>
                        </select>
                      </div>
                      <button 
                        type="submit"
                        className="w-full py-2 bg-primary-teal hover:bg-teal-600 text-white font-bold rounded-lg text-xs shadow-sm cursor-pointer"
                      >
                        + Log Expense Item
                      </button>
                    </form>

                    <div className="space-y-2 max-h-40 overflow-y-auto pt-2 border-t border-slate-100">
                      {expenses.map((exp) => {
                        const IconComponent = exp.icon;
                        return (
                          <div key={exp.id} className="flex justify-between items-center text-xs py-1">
                            <div className="flex items-center gap-2">
                              <span className="p-1.5 bg-slate-50 rounded-lg text-slate-400"><IconComponent className="w-3.5 h-3.5" /></span>
                              <div>
                                <span className="font-bold text-[#1A1A2E] block">{exp.desc}</span>
                                <span className="text-[10px] text-slate-400 block">{exp.category}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-[#1A1A2E]">{currentCurrency}{exp.amount}</span>
                              <button 
                                onClick={() => handleDeleteExpense(exp.id)}
                                className="text-slate-300 hover:text-red-500 p-1 cursor-pointer"
                              >
                                &times;
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* QUICK FACTS PANEL */}
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 space-y-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Quick Facts Panel</p>
                    <h4 className="text-base font-bold text-[#1A1A2E]">Japan Pocket Specs</h4>

                    <div className="space-y-3 pt-1 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">Socket Voltage:</span>
                        <span className="font-bold font-mono text-[#1A1A2E]">Type A & B (100V)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">Local Currency:</span>
                        <span className="font-bold font-mono text-[#1A1A2E]">Japanese Yen (JPY)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">Tipping Rules:</span>
                        <span className="font-bold text-[#1A1A2E]">No tipping. Highly impolite.</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500 font-medium">Primary Transit Card:</span>
                        <span className="font-bold text-[#1A1A2E]">Suica / Pasmo IC Card</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 4. AI CONCIERGE TAB */}
            {activeTab === "concierge" && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 md:p-6 flex flex-col flex-1 min-h-[550px]">
                
                {/* Header overview info */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center font-bold text-white shadow-md">
                      G
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1A1A2E] flex items-center gap-1.5">
                        Concierge Globi <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                      </h4>
                      <p className="text-[10px] text-slate-400">Powered by WanderWise AI Assistant Engine Core</p>
                    </div>
                  </div>
                  
                  {/* Static Placeholder Box */}
                  <div className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-[10px] font-bold text-amber-700 font-mono">
                    Globi Chat Coming Soon Mock Demo
                  </div>
                </div>

                {/* Chat Log container */}
                <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-slate-50 min-h-[300px] max-h-[350px]">
                  {chatMessages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`flex gap-3 max-w-[80%] ${
                        msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                      }`}
                    >
                      {msg.sender === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-amber-400 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          G
                        </div>
                      )}
                      
                      <div className={`p-4 rounded-2xl text-xs space-y-1 ${
                        msg.sender === "user" 
                          ? "bg-[#14B8A6] text-white rounded-tr-none" 
                          : "bg-white border border-slate-100 text-[#1A1A2E] rounded-tl-none leading-relaxed"
                      }`}>
                        <div className="whitespace-pre-line">{msg.text}</div>
                        <span className={`text-[8px] block text-right mt-1 font-mono ${
                          msg.sender === "user" ? "text-teal-200" : "text-slate-400"
                        }`}>{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preset Chips */}
                <div className="mt-4 pt-2">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest font-mono block mb-2">TRY MOCK QUESTIONS:</span>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_QUERIES.map((chip, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleSendChatMessage(chip.prompt)}
                        className="px-3 py-2 bg-slate-50 border border-slate-100 hover:border-[#14B8A6] hover:bg-white rounded-xl text-xs text-slate-600 transition-all font-medium text-left cursor-pointer"
                      >
                        {chip.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message input bar */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendChatMessage(userInput);
                  }}
                  className="mt-6 flex gap-2"
                >
                  <input 
                    type="text" 
                    placeholder="Ask Globi about flights, packing light, visa metrics, cafes..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#14B8A6] text-[#1A1A2E] font-medium"
                  />
                  <button 
                    type="submit"
                    className="bg-[#14B8A6] hover:bg-teal-600 text-white p-3 rounded-xl transition-all active:scale-95 flex items-center justify-center shadow-lg shadow-teal-500/10 cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>

              </div>
            )}

            {/* 5. PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="max-w-3xl mx-auto w-full space-y-6 flex-1">
                
                {/* EXPLORER PROFILE BANNER CARD */}
                <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 text-center relative overflow-hidden flex flex-col items-center">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-primary-teal/5 rounded-br-full blur-xl"></div>
                  
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#FF8E72] flex items-center justify-center font-bold text-white text-3xl shadow-md mb-4 ring-4 ring-teal-50">
                    {profileInitials}
                  </div>

                  <h3 className="text-xl font-bold text-[#1A1A2E]">{profileName}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{profileEmail}</p>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-100 text-[#14B8A6] rounded-full text-[10px] font-black tracking-widest uppercase mt-4 font-mono">
                    ⚜ {profilePersona} ⚜
                  </div>

                  <div className="grid grid-cols-3 gap-6 w-full max-w-md mt-8 pt-6 border-t border-slate-100 text-center">
                    <div>
                      <span className="text-lg font-black text-[#1A1A2E] block">14</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">COUNTRIES</span>
                    </div>
                    <div>
                      <span className="text-lg font-black text-[#1A1A2E] block">42</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">PINNED POTS</span>
                    </div>
                    <div>
                      <span className="text-lg font-black text-[#1A1A2E] block">120k</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">NOMAD MILES</span>
                    </div>
                  </div>
                </div>

                {/* ACCOUNT PREFERENCES */}
                <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 space-y-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Traveler Preference Matrix</p>
                  <h4 className="text-base font-bold text-[#1A1A2E]">Configure Smart Engines</h4>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1A1A2E] block">Priority Slow Cafes & Bookshops</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">Bypasses global retail streets for vintage bookshops</span>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary-teal" />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1A1A2E] block">Bypass Flight Delay Auto-Rebook</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">Alerts with matching alternative train tracks instantly</span>
                      </div>
                      <input type="checkbox" className="w-5 h-5 accent-primary-teal" />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1A1A2E] block">Auto GPS Location Tracking Sync</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">Enables immediate safety warning zones reporting</span>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary-teal" />
                    </div>
                  </div>
                </div>

                {/* LOG OUT TRIGGER BUTTON */}
                <button 
                  onClick={handleLogOut}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 px-4 rounded-xl text-xs transition-colors duration-200 border border-red-100 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Log Out and Return to Product Site
                </button>

              </div>
            )}

          </main>

          {/* MOBILE NAVIGATION BAR AT BOTTOM */}
          <footer className="md:hidden sticky bottom-0 left-0 right-0 bg-[#1A1A2E] border-t border-white/5 z-40 grid grid-cols-5 p-2 text-center text-[10px] text-slate-400">
            <button 
              onClick={() => setActiveTab("dashboard")} 
              className={`flex flex-col items-center gap-1 py-1.5 transition-colors cursor-pointer ${
                activeTab === "dashboard" ? "text-primary-teal" : "hover:text-white"
              }`}
            >
              <PieChart className="w-4.5 h-4.5" />
              <span>Dash</span>
            </button>
            <button 
              onClick={() => setActiveTab("trips")} 
              className={`flex flex-col items-center gap-1 py-1.5 transition-colors cursor-pointer ${
                activeTab === "trips" ? "text-primary-teal" : "hover:text-white"
              }`}
            >
              <Plane className="w-4.5 h-4.5" />
              <span>Trips</span>
            </button>
            <button 
              onClick={() => setActiveTab("explore")} 
              className={`flex flex-col items-center gap-1 py-1.5 transition-colors cursor-pointer ${
                activeTab === "explore" ? "text-primary-teal" : "hover:text-white"
              }`}
            >
              <Compass className="w-4.5 h-4.5" />
              <span>Explore</span>
            </button>
            <button 
              onClick={() => setActiveTab("concierge")} 
              className={`flex flex-col items-center gap-1 py-1.5 transition-colors cursor-pointer ${
                activeTab === "concierge" ? "text-primary-teal" : "hover:text-white"
              }`}
            >
              <Sparkles className="w-4.5 h-4.5" />
              <span>Globi</span>
            </button>
            <button 
              onClick={() => setActiveTab("profile")} 
              className={`flex flex-col items-center gap-1 py-1.5 transition-colors cursor-pointer ${
                activeTab === "profile" ? "text-primary-teal" : "hover:text-white"
              }`}
            >
              <User className="w-4.5 h-4.5" />
              <span>Profile</span>
            </button>
          </footer>

        </div>
      )}

      {/* ========================================================= */}
      {/* INTERACTIVE COMPONENT MODALS                               */}
      {/* ========================================================= */}
      
      {/* 1. WEATHER MODAL */}
      {showWeatherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A2E]/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-800 space-y-4 shadow-xl border border-slate-100">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h4 className="text-base font-bold text-[#1A1A2E] flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-amber-500" /> Live Destination Weather
              </h4>
              <button 
                onClick={() => setShowWeatherModal(false)}
                className="text-slate-400 hover:text-slate-600 font-extrabold text-lg p-1"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="modal-weather-city" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">Toggle Station City</label>
                <div className="flex gap-2">
                  {Object.keys(simulatedWeather).map((city) => (
                    <button 
                      key={city}
                      onClick={() => setWeatherCity(city)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        weatherCity === city 
                          ? "bg-primary-teal text-white" 
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <span className="text-[10px] text-[#14B8A6] tracking-widest uppercase font-mono font-bold">STATION READINGS ({weatherCity})</span>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-3xl font-black text-[#1A1A2E] font-display">{simulatedWeather[weatherCity]?.temp}</span>
                  <span className="text-xs text-slate-500 font-semibold">{simulatedWeather[weatherCity]?.cond}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mt-2 italic">Advice: {simulatedWeather[weatherCity]?.advice}</p>
              </div>
            </div>

            <button 
              onClick={() => setShowWeatherModal(false)}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-extrabold cursor-pointer"
            >
              Close Weather Dashboard
            </button>
          </div>
        </div>
      )}

      {/* 2. POCKET TRANSLATOR MODAL */}
      {showTranslatorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A2E]/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-800 space-y-4 shadow-xl border border-slate-100">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h4 className="text-base font-bold text-[#1A1A2E] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#14B8A6]" /> Pocket Hello Translator
              </h4>
              <button 
                onClick={() => setShowTranslatorModal(false)}
                className="text-slate-400 hover:text-slate-600 font-extrabold text-lg p-1"
                aria-label="Close translator"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="modal-phrase-input" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">Input English Phrase</label>
                <input 
                  id="modal-phrase-input"
                  type="text" 
                  placeholder="e.g. Hello, Thank you, How much" 
                  value={phraseInput}
                  onChange={(e) => setPhraseInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#14B8A6] text-[#1A1A2E] font-medium"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <span className="text-[10px] text-primary-teal tracking-widest uppercase font-mono font-bold">TRANSLATED METRICS</span>
                <p className="text-xs text-[#1A1A2E] leading-relaxed pt-1.5 font-semibold">
                  {phraseInput.trim() ? translatePhrase(phraseInput) : "Type standard terms ('Hello', 'Thanks') to test pocket translations instantly!"}
                </p>
              </div>
            </div>

            <button 
              onClick={() => setShowTranslatorModal(false)}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-extrabold cursor-pointer"
            >
              Minimize Pocket Translator
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
