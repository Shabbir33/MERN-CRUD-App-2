import {create} from "zustand";
import axios from "axios";

const authStore = create((set) => ({
    loggedIn: null,

    loginForm:{
        email: "",
        password: ""
    }, 

    signupForm:{
        email: "",
        password: ""
    }, 

    updateLoginForm: (event) => {
        const {name, value} = event.target;
        
        set((state) => {
            return{
                loginForm: {
                    ...state.loginForm,
                    [name]: value,
                },
            };
        });
    },

    updateSignupForm: (event) => {
        const {name, value} = event.target;
        
        set((state) => {
            return{
                signupForm: {
                    ...state.signupForm,
                    [name]: value,
                },
            };
        });
    },

    login: async (e) => {
        const {loginForm} = authStore.getState()

        const res = await axios.post("http://localhost:5000/login", loginForm)

        set({loggedIn: true, loginForm: {
            email: "",
            password: "",
        }})

        console.log(res)
    },

    checkAuth: async () => {
        try {
            await axios.get("http://localhost:5000/check-auth")
            set({loggedIn: true})
        } catch (error) {
            set({loggedIn: false})
        }
    },

    signup: async () => {
        const {signupForm} = authStore.getState();

        const res = await axios.post("http://localhost:5000/signup", signupForm)

        set({
            signupForm:{
                email: "",
                password: "",
            }
        })

        console.log(res)
    },

    logout: async () => {
        await axios.get("http://localhost:5000/logout")
        set({ loggedIn: false})
    },
}));

export default authStore;