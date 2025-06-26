import { User } from './user.types';
import { Course } from './course.types';

// Types pour les sessions vidéo/visioconférence
export type VideoProvider = 'daily' | 'jitsi' | 'zoom' | 'teams';
export type SessionStatus = 'scheduled' | 'live' | 'ended' | 'canceled';

export interface VideoSession {
  id: number;
  title: string;
  description?: string;
  course_id?: number;
  instructor_id: number;
  scheduled_at: string;
  duration: number; // en minutes
  provider: VideoProvider;
  meeting_url: string;
  meeting_id?: string;
  status: SessionStatus;
  max_participants?: number;
  created_at: string;
  updated_at: string;
  // Relations
  course?: Course;
  instructor?: User;
  participants?: VideoParticipant[];
}

export interface VideoParticipant {
  id: number;
  session_id: number;
  user_id: number;
  joined_at?: string;
  left_at?: string;
  duration?: number; // temps de présence en minutes
  // Relations
  session?: VideoSession;
  user?: User;
}

// Types pour Daily.co
export interface DailyRoomConfig {
  name: string;
  privacy: 'public' | 'private';
  properties: {
    max_participants?: number;
    start_time?: number;
    exp?: number; // expiration timestamp
    enable_chat?: boolean;
    enable_screenshare?: boolean;
    enable_recording?: boolean;
  };
}

export interface DailyRoom {
  id: string;
  name: string;
  api_created: boolean;
  privacy: string;
  url: string;
  created_at: string;
  config: DailyRoomConfig['properties'];
}

// Types pour Jitsi
export interface JitsiConfig {
  roomName: string;
  width: string | number;
  height: string | number;
  parentNode?: HTMLElement;
  configOverwrite?: Record<string, any>;
  interfaceConfigOverwrite?: Record<string, any>;
}