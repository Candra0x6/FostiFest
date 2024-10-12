import { UserData } from '@/hooks/useSession';
import {create} from 'zustand';

interface SessionState {
    isLoggedIn: boolean;
    userData: UserData | null;
    login: (data: UserData) => void;
    logout: () => void;
}

const useSessionStore = create<SessionState>((set) => ({
    isLoggedIn: false,
    userData: null,
    login: (data: UserData) => set({ isLoggedIn: true, userData: data }),
    logout: () => set({ isLoggedIn: false, userData: null }),
}));

export default useSessionStore;