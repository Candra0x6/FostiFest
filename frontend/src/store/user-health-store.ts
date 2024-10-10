import { demographicsPayload } from '@/lib/validators/demographicsSchema';
import { lifestylePayload } from '@/lib/validators/lifestyleSchema';
import { GenerateContentResponse } from '@/services/disease-prediction-ai-service';
import { create } from 'zustand';

export interface UserDetails {
   personalData: demographicsPayload
}

interface UserLifestyle {
    lifestyleFactors: lifestylePayload
}

export interface UserMedicalHistory {
    medicalHistory: string[]
}
interface UserStore {
    userDetails: UserDetails | null;
    userLifestyle: UserLifestyle | null;
    medicalHistory: UserMedicalHistory | null
    generateContentResponse: GenerateContentResponse | null;
    updateUserDetails: (details: UserDetails) => void;
    updateUserLifestyle: (lifestyle: UserLifestyle) => void;
    updateMedicalHistory: (history: string[]) => void;
    updateGenerateContentResponse: (response: GenerateContentResponse) => void;
}

export const useUserHealthStore = create<UserStore>((set) => ({
    userDetails: null,
    userLifestyle: null,
    medicalHistory: null,
    generateContentResponse: null,
    updateGenerateContentResponse: (response) => set(() => ({ generateContentResponse: response })),
    updateUserDetails: (details) => set(() => ({ userDetails: details })),
    updateUserLifestyle: (lifestyle) => set(() => ({ userLifestyle: lifestyle })),
    updateMedicalHistory: (history) => set(() => ({ medicalHistory: { medicalHistory: history } })),
}));