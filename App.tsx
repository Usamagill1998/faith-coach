import React, { useState, useEffect } from 'react';
import { Book, Home, Mic, User, MessageCircle, ChevronLeft, Bell, Settings, Share2, PlayCircle, Plus, Camera, PhoneOff, MicOff, Volume2, Image as ImageIcon, Video, Heart, ChevronRight, LogOut, Shield, CreditCard, UserCircle } from 'lucide-react';
import { CHARACTERS, MODULES, JOURNAL_ENTRIES, ONBOARDING_SLIDES } from './constants';
import { Character, ScreenName } from './types';

// --- Utility Components ---

// Robust Image Component with Loading & Error States
const ImageWithFallback = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  // Reset status if src changes
  useEffect(() => {
    setStatus('loading');
  }, [src]);

  return (
    <div className={`${className} relative overflow-hidden bg-gray-200`}>
      {/* Actual Image */}
      {status !== 'error' && (
        <img 
          src={src} 
          alt={alt} 
          className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
      
      {/* Loading Skeleton */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-faith-200 border-t-faith-400 rounded-full animate-spin" />
        </div>
      )}

      {/* Error Fallback */}
      {status === 'error' && (
         <div className="absolute inset-0 bg-gradient-to-br from-faith-100 to-faith-200 flex flex-col items-center justify-center text-faith-400 p-2 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Image Unavail.</span>
            <span className="text-[8px] font-mono mt-1 opacity-40">{alt.substring(0,10)}...</span>
         </div>
      )}
    </div>
  );
};

// --- Sub-Components ---

// 1. Onboarding Screen
const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < ONBOARDING_SLIDES.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const currentSlide = ONBOARDING_SLIDES[step];

  return (
    <div className="h-full flex flex-col relative bg-faith-900 overflow-hidden">
      <div key={step} className="absolute inset-0 z-0 animate-in fade-in duration-1000">
        <ImageWithFallback 
          src={currentSlide.image} 
          alt="Onboarding" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-faith-900 via-faith-900/40 to-transparent" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-end p-8 pb-16">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-serif font-bold text-white leading-tight drop-shadow-xl animate-in slide-in-from-bottom-4 fade-in duration-700">
              {currentSlide.title}
            </h1>
            <p className="text-faith-100 text-lg leading-relaxed font-light drop-shadow-md opacity-90 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100">
              {currentSlide.description}
            </p>
          </div>

          <div className="flex gap-2 pt-6">
            {ONBOARDING_SLIDES.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${idx === step ? 'w-8 bg-faith-gold' : 'w-2 bg-white/30'}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-full bg-white text-faith-900 font-bold py-4 rounded-2xl mt-8 shadow-2xl shadow-black/20 active:scale-[0.98] transition-all animate-in slide-in-from-bottom-2 fade-in duration-500 delay-200"
          >
            {step === ONBOARDING_SLIDES.length - 1 ? "Start Your Journey" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Dashboard Screen
const Dashboard = ({ navigateTo, onSelectCharacter }: { navigateTo: (screen: ScreenName) => void, onSelectCharacter: (char: Character) => void }) => {
  return (
    <div className="pb-32 pt-14 px-5 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-faith-500 text-sm font-medium tracking-wide uppercase">Good Morning</p>
          <h1 className="text-3xl font-serif font-bold text-faith-900">Kevin</h1>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-full border border-orange-100 shadow-sm">
            <span className="text-sm font-bold">12</span>
            <span className="text-xs">🔥</span>
          </div>
          <button className="p-2.5 rounded-full bg-white shadow-sm border border-faith-100 text-faith-800 relative hover:bg-gray-50 active:scale-95 transition-transform">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Hero: Featured Avatar (The "Avatar Thing") */}
      <div className="relative">
          <div className="flex justify-between items-end mb-4">
             <h2 className="text-xl font-serif font-bold text-faith-900 flex items-center gap-2">
               <Video size={20} className="text-faith-gold" />
               Live Mentors
             </h2>
             <button onClick={() => navigateTo('character-select')} className="text-faith-500 text-sm font-medium hover:text-faith-900 transition-colors">See All</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-6 -mx-5 px-5 no-scrollbar snap-x">
             {/* Jesus - Featured Hero */}
             <div 
               onClick={() => onSelectCharacter(CHARACTERS[0])}
               className="min-w-[280px] h-[400px] relative rounded-[32px] overflow-hidden shadow-2xl snap-center shrink-0 border border-white/20 active:scale-[0.98] transition-transform cursor-pointer group"
             >
                <ImageWithFallback src={CHARACTERS[0].imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Jesus" />
                <div className="absolute inset-0 bg-gradient-to-t from-faith-900 via-faith-900/20 to-transparent opacity-90" />
                
                {/* Status Indicator */}
                <div className="absolute top-4 left-4 flex gap-2">
                   <div className="bg-red-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                     <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                     Live
                   </div>
                </div>

                <div className="absolute bottom-0 left-0 p-6 w-full">
                   <h3 className="text-white text-3xl font-serif font-bold mb-1 drop-shadow-md">{CHARACTERS[0].name}</h3>
                   <p className="text-white/80 text-sm line-clamp-2 leading-relaxed mb-4 font-light">{CHARACTERS[0].description}</p>
                   
                   <button className="w-full py-3.5 bg-white/20 backdrop-blur-xl text-white rounded-2xl font-bold text-sm border border-white/40 hover:bg-white/30 transition-all flex items-center justify-center gap-2 shadow-lg">
                      <Mic size={18} /> Start Session
                   </button>
                </div>
             </div>

             {/* Secondary Cards */}
             {CHARACTERS.slice(1, 5).map(char => (
                <div 
                  key={char.id}
                  onClick={() => onSelectCharacter(char)}
                  className="min-w-[160px] h-[400px] relative rounded-[32px] overflow-hidden shadow-xl snap-center shrink-0 active:scale-[0.98] transition-transform cursor-pointer group bg-faith-900"
                >
                   <ImageWithFallback src={char.imageUrl} className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110" alt={char.name} />
                   <div className="absolute inset-0 bg-gradient-to-t from-faith-900 via-transparent to-transparent" />
                   
                   <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                         <Video size={14} className="text-white" />
                      </div>
                   </div>

                   <div className="absolute bottom-0 left-0 p-4 w-full text-center pb-8">
                      <h3 className="text-white text-xl font-serif font-bold drop-shadow-sm">{char.name}</h3>
                      <p className="text-white/60 text-xs font-medium uppercase tracking-wider mt-1">{char.role}</p>
                   </div>
                </div>
             ))}
          </div>
      </div>

      {/* Daily Verse */}
      <div className="bg-faith-900 rounded-[32px] p-8 text-white shadow-xl shadow-faith-900/10 relative overflow-hidden group mx-1">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-faith-gold/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-[10px] font-bold tracking-widest uppercase text-faith-gold border border-white/5">Daily Wisdom</span>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Share2 size={20} className="text-white/80" /></button>
          </div>
          <h2 className="text-2xl font-serif font-medium mb-6 leading-relaxed tracking-wide text-center italic">"For I know the plans I have for you," declares the Lord...</h2>
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <p className="text-faith-200 text-sm font-medium">Jeremiah 29:11</p>
            <button className="flex items-center gap-2 text-faith-gold font-bold text-xs hover:text-white transition-colors">
              <PlayCircle size={18} fill="currentColor" />
              Listen Now
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Modules */}
      <div>
        <h3 className="text-xl font-serif font-bold text-faith-900 mb-4 px-1">Continue Learning</h3>
        <div className="space-y-4">
          {MODULES.slice(0, 2).map(module => (
            <div key={module.id} className="bg-white p-4 rounded-3xl shadow-sm border border-faith-50 flex gap-5 items-center active:scale-[0.99] transition-transform">
               <div className="w-20 h-20 rounded-2xl overflow-hidden relative shrink-0 shadow-inner">
                  <ImageWithFallback src={module.imageUrl} className="w-full h-full object-cover" alt={module.title} />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                       <PlayCircle size={14} className="text-faith-900 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
               </div>
               <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-bold text-faith-500 uppercase tracking-wider">{module.category}</span>
                    <span className="text-[10px] font-bold text-faith-400 bg-faith-50 px-2 py-0.5 rounded-full">{module.duration}</span>
                  </div>
                  <h4 className="font-bold text-faith-900 text-base truncate mb-3">{module.title}</h4>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-faith-gold h-full rounded-full" style={{ width: `${module.completed}%` }} />
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. Character Selection
const CharacterSelection = ({ onSelect, navigateTo }: { onSelect: (char: Character) => void, navigateTo: (screen: ScreenName) => void }) => {
  return (
    <div className="h-full flex flex-col bg-faith-50">
      <div className="pt-14 px-5 pb-6 bg-white/80 backdrop-blur-md sticky top-0 z-20 shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
           <button onClick={() => navigateTo('dashboard')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-faith-800 transition-colors"><ChevronLeft size={24} /></button>
           <h1 className="text-2xl font-serif font-bold text-faith-900">Select Mentor</h1>
        </div>
        <p className="text-faith-500 text-sm pl-1">Choose a guide for your spiritual journey.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-24">
        <div className="grid grid-cols-2 gap-4">
          {CHARACTERS.map(char => (
            <div 
              key={char.id}
              onClick={() => onSelect(char)}
              className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-faith-100 active:scale-95 transition-all cursor-pointer group relative aspect-[3/4]"
            >
              <ImageWithFallback src={char.imageUrl} alt={char.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-faith-900/90 via-transparent to-transparent opacity-100" />
              
              {/* Online Indicator */}
              <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />

              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="text-white font-bold text-lg font-serif mb-0.5 drop-shadow-sm">{char.name}</h3>
                <p className="text-faith-200 text-xs font-medium uppercase tracking-wide opacity-90">{char.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4. Chat/Coach Screen (Video Call Style)
const ChatScreen = ({ character, onBack }: { character: Character | null, onBack: () => void }) => {
  const [status, setStatus] = useState<'connecting' | 'connected'>('connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setStatus('connected'), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!character) return null;

  return (
    <div className="h-full flex flex-col bg-faith-900 relative overflow-hidden">
      
      {/* Background/Video */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback 
          src={character.imageUrl} 
          alt={character.name} 
          className={`w-full h-full object-cover transition-all duration-1000 ${status === 'connecting' ? 'scale-110 blur-md opacity-40' : 'scale-100 opacity-100'}`} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Connection Overlay */}
      {status === 'connecting' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
           <div className="w-20 h-20 rounded-full border-4 border-white/20 border-t-white animate-spin mb-4" />
           <p className="text-white font-serif text-lg tracking-widest animate-pulse">CONNECTING...</p>
        </div>
      )}

      {/* Top Bar */}
      <div className="relative z-10 pt-14 px-6 flex justify-between items-start">
        <button onClick={onBack} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center pt-2">
           <h2 className="text-white font-serif font-bold text-xl tracking-wide shadow-black drop-shadow-md">{character.name}</h2>
           {status === 'connected' && (
             <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
               <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
               <span className="text-white/90 text-[10px] font-bold uppercase tracking-widest">Live</span>
               <span className="text-white/50 text-[10px] ml-1 font-mono">00:14</span>
             </div>
           )}
        </div>
        <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
          <Settings size={24} />
        </button>
      </div>

      {/* Captions/AI Response Area */}
      <div className="flex-1 relative z-10 flex flex-col justify-end px-6 pb-8">
         {status === 'connected' && (
           <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
             
             {/* Audio Waveform */}
             <div className="flex justify-center items-center gap-1.5 h-12 opacity-90">
               {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                       style={{ 
                         height: `${Math.max(16, Math.random() * 48)}px`, 
                         animationDuration: `${0.4 + Math.random() * 0.4}s` 
                       }} 
                  />
               ))}
             </div>

             {/* Caption Bubble */}
             <div className="bg-black/60 backdrop-blur-xl p-6 rounded-[24px] border border-white/10 shadow-2xl transform transition-all hover:bg-black/70">
               <p className="text-white text-lg leading-relaxed font-medium text-center font-serif tracking-wide">
                 "Peace be with you. I am here. Tell me, what weighs on your heart today?"
               </p>
             </div>
           </div>
         )}
      </div>

      {/* Bottom Controls */}
      <div className="relative z-20 px-8 pb-12 pt-4 bg-gradient-to-t from-black/90 to-transparent">
        <div className="flex items-center justify-between max-w-sm mx-auto gap-4">
          <button 
             onClick={() => setIsVideoOff(!isVideoOff)}
             className={`p-4 rounded-full backdrop-blur-md border transition-all ${isVideoOff ? 'bg-white text-faith-900' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
          >
            {isVideoOff ? <Camera size={24} className="text-faith-900" /> : <Camera size={24} />}
          </button>
          
          <button 
             onClick={() => setIsMuted(!isMuted)}
             className={`p-4 rounded-full backdrop-blur-md border transition-all ${isMuted ? 'bg-white text-faith-900' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
          >
            {isMuted ? <MicOff size={24} className="text-faith-900" /> : <Mic size={24} />}
          </button>

          <button 
            onClick={onBack} 
            className="p-4 px-8 rounded-full bg-red-500 text-white shadow-lg shadow-red-500/40 hover:bg-red-600 active:scale-95 transition-all flex-1 flex justify-center"
          >
            <PhoneOff size={24} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 5. Modules Screen
const ModulesScreen = () => {
  return (
    <div className="h-full bg-faith-50 flex flex-col">
       <div className="pt-14 px-5 pb-4 bg-white sticky top-0 z-10 shadow-sm">
        <h1 className="text-3xl font-serif font-bold text-faith-900">Modules</h1>
        <p className="text-faith-500 mt-1">Guided paths for your spiritual growth.</p>
      </div>
      <div className="flex-1 overflow-y-auto p-5 pb-24 space-y-4">
        {MODULES.map(module => (
          <div key={module.id} className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-faith-100 active:scale-[0.99] transition-transform">
            <div className="w-24 h-24 rounded-xl overflow-hidden shadow-inner relative shrink-0">
                <ImageWithFallback src={module.imageUrl} alt={module.title} className="w-full h-full object-cover" />
                {module.completed > 0 && (
                   <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="bg-white/30 backdrop-blur-sm p-1.5 rounded-full border border-white/50">
                         <PlayCircle className="text-white" size={18} fill="currentColor" />
                      </div>
                   </div>
                )}
            </div>
            <div className="flex-1 flex flex-col justify-center py-1">
              <span className="text-[10px] text-faith-500 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${module.completed === 100 ? 'bg-green-500' : 'bg-faith-gold'}`} />
                {module.category}
              </span>
              <h3 className="font-bold text-faith-900 text-lg mb-1 leading-tight">{module.title}</h3>
              <p className="text-xs text-faith-400 mb-3">{module.duration} session</p>
              
              <div className="flex items-center gap-3">
                 <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div className="bg-faith-900 h-1.5 rounded-full" style={{ width: `${module.completed}%` }}></div>
                 </div>
                 <span className="text-xs font-bold text-faith-900">{module.completed}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 6. Journal Screen
const JournalScreen = () => {
  return (
    <div className="h-full bg-faith-50 flex flex-col">
      <div className="pt-14 px-5 pb-4 bg-white sticky top-0 z-10 shadow-sm flex justify-between items-center border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-serif font-bold text-faith-900">Journal</h1>
          <p className="text-faith-500 text-xs mt-1">Your spiritual reflections & prayers.</p>
        </div>
        <button className="p-3 bg-faith-900 text-white rounded-full shadow-lg hover:bg-faith-800 transition-colors shadow-faith-900/20 active:scale-90">
          <Plus size={24} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 pb-24 space-y-6">
        {JOURNAL_ENTRIES.map(entry => (
          <div key={entry.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-faith-100 group">
             {/* Rich Media Header */}
             {entry.imageUrl && (
               <div className="h-48 w-full relative">
                 <ImageWithFallback src={entry.imageUrl} alt="Journal" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <div className="absolute bottom-4 left-5 flex justify-between w-full pr-5 items-end">
                    <span className="text-white/90 text-xs font-bold bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                      {entry.date}
                    </span>
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-full">
                       <Heart size={16} className="text-white" />
                    </div>
                 </div>
               </div>
             )}
             
             <div className="p-6">
               {!entry.imageUrl && <p className="text-xs text-faith-400 font-bold uppercase mb-2">{entry.date}</p>}
               <p className="text-faith-800 leading-relaxed font-serif text-lg mb-4 text-justify">"{entry.preview}"</p>
               <div className="flex gap-2 flex-wrap">
                 {entry.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 bg-faith-50 text-faith-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-faith-100">
                     #{tag}
                   </span>
                 ))}
               </div>
             </div>
          </div>
        ))}

        <div className="text-center py-6">
           <button className="text-faith-400 text-sm font-medium flex items-center justify-center gap-2 mx-auto hover:text-faith-600 transition-colors">
             <ImageIcon size={16} />
             View older entries
           </button>
        </div>
      </div>
    </div>
  );
};

// 7. Profile Screen (Added)
const ProfileScreen = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className="h-full bg-faith-50 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="pt-14 px-5 pb-6 bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
        <h1 className="text-3xl font-serif font-bold text-faith-900">Profile</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-24 space-y-6">
        {/* User Card */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-faith-100 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-faith-100 flex items-center justify-center text-faith-400">
             <UserCircle size={40} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-faith-900">Kevin</h2>
            <p className="text-sm text-faith-500">Premium Member</p>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="bg-white rounded-2xl border border-faith-100 shadow-sm overflow-hidden">
           <button className="w-full flex items-center justify-between p-4 border-b border-faith-50 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><User size={18} /></div>
                 <span className="font-medium text-faith-900">Personal Info</span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
           </button>
           <button className="w-full flex items-center justify-between p-4 border-b border-faith-50 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><CreditCard size={18} /></div>
                 <span className="font-medium text-faith-900">Subscription</span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
           </button>
           <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Shield size={18} /></div>
                 <span className="font-medium text-faith-900">Privacy & Data</span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
           </button>
        </div>

        {/* Danger Zone */}
        <button 
          onClick={onLogout}
          className="w-full bg-white p-4 rounded-2xl border border-red-100 shadow-sm flex items-center justify-center gap-2 text-red-500 font-bold hover:bg-red-50 active:scale-95 transition-all"
        >
          <LogOut size={18} />
          Log Out / Reset App
        </button>
        
        <p className="text-center text-xs text-faith-300 pt-4">Version 1.0.0 (Build 204)</p>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('onboarding');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // Simple Router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={() => setCurrentScreen('dashboard')} />;
      case 'dashboard':
        return <Dashboard navigateTo={setCurrentScreen} onSelectCharacter={(char) => { setSelectedCharacter(char); setCurrentScreen('chat'); }} />;
      case 'character-select':
        return (
          <CharacterSelection 
            onSelect={(char) => {
              setSelectedCharacter(char);
              setCurrentScreen('chat');
            }} 
            navigateTo={setCurrentScreen}
          />
        );
      case 'chat':
        return (
          <ChatScreen 
            character={selectedCharacter} 
            onBack={() => setCurrentScreen('dashboard')} 
          />
        );
      case 'modules':
        return <ModulesScreen />;
      case 'journal':
        return <JournalScreen />;
      case 'profile':
        return <ProfileScreen onLogout={() => setCurrentScreen('onboarding')} />;
      default:
        return <Dashboard navigateTo={setCurrentScreen} onSelectCharacter={(char) => { setSelectedCharacter(char); setCurrentScreen('chat'); }} />;
    }
  };

  // Only show bottom nav on main screens
  const showBottomNav = ['dashboard', 'character-select', 'modules', 'journal', 'profile'].includes(currentScreen);

  return (
    // Mobile Frame Container
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-200 font-sans p-0 sm:p-4 md:p-8">
      <div className="w-full h-screen sm:h-[844px] sm:w-[390px] bg-white sm:rounded-[45px] shadow-2xl relative overflow-hidden flex flex-col sm:border-[8px] sm:border-gray-900 box-border ring-8 ring-black/5">
        
        {/* iOS-style Status Bar Area (Mock) */}
        <div className="h-12 w-full absolute top-0 left-0 z-50 flex justify-between items-center px-6 pointer-events-none">
          <span className={`text-xs font-bold ${currentScreen === 'chat' || currentScreen === 'onboarding' ? 'text-white' : 'text-black/80'}`}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <div className="flex gap-1.5">
            <div className={`w-4 h-2.5 rounded-[1px] ${currentScreen === 'chat' || currentScreen === 'onboarding' ? 'bg-white' : 'bg-black/80'}`}></div>
            <div className={`w-4 h-2.5 rounded-[1px] ${currentScreen === 'chat' || currentScreen === 'onboarding' ? 'bg-white' : 'bg-black/80'}`}></div>
            <div className={`w-5 h-2.5 border rounded-[2px] relative ${currentScreen === 'chat' || currentScreen === 'onboarding' ? 'border-white' : 'border-black/80'}`}>
              <div className={`absolute inset-0.5 ${currentScreen === 'chat' || currentScreen === 'onboarding' ? 'bg-white' : 'bg-black/80'}`}></div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden bg-faith-50">
          {renderScreen()}
        </main>

        {/* Bottom Navigation */}
        {showBottomNav && (
          <nav className="absolute bottom-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 px-6 py-2 flex justify-between items-center z-40 pb-8 sm:pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-colors ${currentScreen === 'dashboard' ? 'text-faith-900 bg-faith-50' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Home size={24} strokeWidth={currentScreen === 'dashboard' ? 2.5 : 2} />
              <span className="text-[10px] font-bold">Home</span>
            </button>
            
            <button 
               onClick={() => setCurrentScreen('modules')}
               className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-colors ${currentScreen === 'modules' ? 'text-faith-900 bg-faith-50' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Book size={24} strokeWidth={currentScreen === 'modules' ? 2.5 : 2} />
              <span className="text-[10px] font-bold">Learn</span>
            </button>

            {/* Main Action FAB */}
            <button 
              onClick={() => setCurrentScreen('character-select')}
              className="mb-10 p-4 bg-faith-900 text-white rounded-[20px] shadow-xl shadow-faith-900/30 transform hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 border-4 border-white"
            >
              <MessageCircle size={26} fill="white" className="text-white" />
            </button>

            <button 
              onClick={() => setCurrentScreen('journal')}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-colors ${currentScreen === 'journal' ? 'text-faith-900 bg-faith-50' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <ImageIcon size={24} strokeWidth={currentScreen === 'journal' ? 2.5 : 2} />
              <span className="text-[10px] font-bold">Journal</span>
            </button>

            <button 
               onClick={() => setCurrentScreen('profile')} 
               className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-colors ${currentScreen === 'profile' ? 'text-faith-900 bg-faith-50' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <User size={24} strokeWidth={currentScreen === 'profile' ? 2.5 : 2} />
              <span className="text-[10px] font-bold">Profile</span>
            </button>
          </nav>
        )}

        {/* Home Indicator (Mock) */}
        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full z-50 pointer-events-none ${currentScreen === 'chat' ? 'bg-white/20' : 'bg-black/20'}`}></div>

      </div>
    </div>
  );
}
