type BrowserWindowWithAudio = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

export class AudioManager {
  private static instance: AudioManager;
  private audioContext: AudioContext | null = null;
  private bgMusicGain: GainNode | null = null;
  private isMuted: boolean = false;
  private isBGMusicPlaying: boolean = false;
  private currentTrack: 'main' | 'ending' | null = null;
  private oscillators: OscillatorNode[] = [];
  private loopTimer: ReturnType<typeof setTimeout> | null = null;

  private constructor() {
    this.ensureAudioContext();
  }

  private ensureAudioContext() {
    if (typeof window !== 'undefined') {
      const BrowserAudioContext = (window as BrowserWindowWithAudio).AudioContext ||
        (window as BrowserWindowWithAudio).webkitAudioContext;
      this.audioContext ??= BrowserAudioContext ? new BrowserAudioContext() : null;
    }
  }

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  async playBGMusic() {
    return this.playMusicTrack('main');
  }

  async playEndingMusic() {
    return this.playMusicTrack('ending');
  }

  private async playMusicTrack(track: 'main' | 'ending') {
    this.ensureAudioContext();

    if (this.isBGMusicPlaying && this.currentTrack === track) return true;
    if (!this.audioContext) return false;

    if (this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch {
        return false;
      }
    }

    if (this.audioContext.state !== 'running') return false;

    this.pauseBGMusic();
    
    this.currentTrack = track;
    this.isBGMusicPlaying = true;
    this.bgMusicGain = this.audioContext.createGain();
    this.bgMusicGain.gain.value = track === 'ending' ? 0.16 : 0.12;
    this.bgMusicGain.connect(this.audioContext.destination);

    const mainChords = [
      [220, 277.18, 329.63],
      [246.94, 311.13, 369.99],
      [196, 246.94, 293.66],
      [164.81, 207.65, 246.94],
    ];

    const chordProgression = mainChords;
    const chordDuration = 4;

    const playChord = (chord: number[], startTime: number) => {
      if (!this.audioContext || !this.bgMusicGain) return;

      chord.forEach((freq) => {
        const osc = this.audioContext!.createOscillator();
        const noteGain = this.audioContext!.createGain();
        
        osc.connect(noteGain);
        noteGain.connect(this.bgMusicGain!);
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(track === 'ending' ? 0.08 : 0.12, startTime + 0.6);
        noteGain.gain.linearRampToValueAtTime(track === 'ending' ? 0.08 : 0.12, startTime + chordDuration - 0.8);
        noteGain.gain.linearRampToValueAtTime(0, startTime + chordDuration);
        
        osc.start(startTime);
        osc.stop(startTime + chordDuration);
        
        this.oscillators.push(osc);
      });

      const bass = this.audioContext!.createOscillator();
      const bassGain = this.audioContext!.createGain();
      bass.connect(bassGain);
      bassGain.connect(this.bgMusicGain!);
      bass.type = 'sine';
      bass.frequency.value = chord[0] / 2;
      
      bassGain.gain.setValueAtTime(0, startTime);
      bassGain.gain.linearRampToValueAtTime(track === 'ending' ? 0.22 : 0.18, startTime + 0.3);
      bassGain.gain.linearRampToValueAtTime(track === 'ending' ? 0.22 : 0.18, startTime + chordDuration - 0.5);
      bassGain.gain.linearRampToValueAtTime(0, startTime + chordDuration);
      
      bass.start(startTime);
      bass.stop(startTime + chordDuration);
      this.oscillators.push(bass);
    };

    const playEndingPhrase = (startTime: number) => {
      if (!this.audioContext || !this.bgMusicGain) return;

      const melody = [
        880, 987.77, 1174.66, 1318.51,
        1174.66, 987.77, 1046.5, 1567.98,
        1396.91, 1174.66, 1318.51, 987.77,
        1046.5, 880, 783.99, 1046.5,
      ];
      const noteDuration = 0.75;

      melody.forEach((freq, index) => {
        const osc = this.audioContext!.createOscillator();
        const noteGain = this.audioContext!.createGain();
        const noteStart = startTime + index * noteDuration;

        osc.connect(noteGain);
        noteGain.connect(this.bgMusicGain!);
        osc.type = 'triangle';
        osc.frequency.value = freq;

        noteGain.gain.setValueAtTime(0, noteStart);
        noteGain.gain.linearRampToValueAtTime(0.11, noteStart + 0.08);
        noteGain.gain.linearRampToValueAtTime(0.08, noteStart + noteDuration * 0.65);
        noteGain.gain.linearRampToValueAtTime(0, noteStart + noteDuration);

        osc.start(noteStart);
        osc.stop(noteStart + noteDuration);
        this.oscillators.push(osc);
      });
    };

    const playLoop = () => {
      if (!this.isBGMusicPlaying || this.currentTrack !== track || !this.audioContext) return;

      const now = this.audioContext.currentTime;

      if (track === 'ending') {
        playEndingPhrase(now);
      } else {
        chordProgression.forEach((chord, index) => {
          playChord(chord, now + (index * chordDuration));
        });
      }

      this.loopTimer = setTimeout(
        playLoop,
        track === 'ending'
          ? 16 * 0.75 * 1000
          : chordProgression.length * chordDuration * 1000
      );
    };

    playLoop();
    console.log(`${track} background music started`);
    return true;
  }

  pauseBGMusic() {
    this.isBGMusicPlaying = false;
    this.currentTrack = null;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch {}
    });
    this.bgMusicGain?.disconnect();
    this.bgMusicGain = null;
    this.oscillators = [];
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgMusicGain) {
      this.bgMusicGain.gain.value = this.isMuted ? 0 : 0.12;
    }
    return this.isMuted;
  }

  getMuteStatus() {
    return this.isMuted;
  }

  playClick() {
    this.playTone(800, 0.08, 0.08, 'sine');
  }

  playHover() {
    this.playTone(600, 0.04, 0.06, 'sine');
  }

  playDragStart() {
    this.playTone(500, 0.1, 0.12, 'sine');
  }

  playDrop() {
    this.playTone(400, 0.12, 0.15, 'sine');
  }

  playError() {
    const ctx = this.audioContext;
    if (!ctx || this.isMuted) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(250, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.25);
    oscillator.type = 'sawtooth';

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.25);
  }

  playSuccess() {
    const ctx = this.audioContext;
    if (!ctx || this.isMuted) return;

    [523.25, 659.25, 783.99].forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = ctx.currentTime + (index * 0.08);
      gainNode.gain.setValueAtTime(0.1, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.15);
    });
  }

  playGlitch() {
    const ctx = this.audioContext;
    if (!ctx || this.isMuted) return;

    for (let i = 0; i < 5; i++) {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = Math.random() * 800 + 300;
      oscillator.type = 'square';

      const startTime = ctx.currentTime + (i * 0.04);
      gainNode.gain.setValueAtTime(0.06, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.04);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.04);
    }
  }

  playTerminalType() {
    this.playTone(900, 0.03, 0.03, 'sine');
  }

  playNotification() {
    const ctx = this.audioContext;
    if (!ctx || this.isMuted) return;

    [880, 1046.5].forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = ctx.currentTime + (index * 0.08);
      gainNode.gain.setValueAtTime(0.12, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.12);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.12);
    });
  }

  private playTone(frequency: number, volume: number, duration: number, type: OscillatorType) {
    if (!this.audioContext || this.isMuted) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }
}

export const audioManager = AudioManager.getInstance();
