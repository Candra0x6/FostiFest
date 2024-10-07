import { demographicsPayload } from '@/lib/validators/demographicsSchema';
import { lifestylePayload } from '@/lib/validators/lifestyleSchema';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserDetails {
   DataDiri: demographicsPayload
}

interface UserLifestyle {
    KebiasaanHidup: lifestylePayload
}

interface UserMedicalHistory {
    RiwayatPenyakit: string[]
}
interface UserStore {
    userDetails: UserDetails | null;
    userLifestyle: UserLifestyle | null;
    medicalHistory: UserMedicalHistory | null
    updateUserDetails: (details: UserDetails) => void;
    updateUserLifestyle: (lifestyle: UserLifestyle) => void;
    updateMedicalHistory: (history: string[]) => void;
}

export const useUserHealthStore = create<UserStore>((set) => ({
    userDetails: null,
    userLifestyle: null,
    medicalHistory: null,
    updateUserDetails: (details) => set(() => ({ userDetails: details })),
    updateUserLifestyle: (lifestyle) => set(() => ({ userLifestyle: lifestyle })),
    updateMedicalHistory: (history) => set(() => ({ medicalHistory: { RiwayatPenyakit: history } })),
}));