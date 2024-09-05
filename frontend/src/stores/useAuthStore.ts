import { create } from "zustand";
import { setAxiosToken } from "../config/axios";
import { jwtDecode } from "jwt-decode";

export type AuthState = {
    user: any,
    authenticate: (user: any) => void,
    logout: () => void
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    authenticate(token: string) {
        console.log(token, 'seee')
        const user: any = jwtDecode(token)
        console.log(user, 'in useauthstore')
        setAxiosToken(token)
        localStorage.removeItem('token')
        localStorage.setItem('token', token)
        set(() => ({
            user: user?.UserInfo
        }))
    },
    logout() {
        setAxiosToken(null)
        localStorage.removeItem('token')
        set({ user: null })
    }
}))

export default useAuthStore