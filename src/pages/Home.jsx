import { Signin } from "./../components/Signin";
import { Singup } from "./../components/Singup";
import axios from "axios";
import React, { createRef } from "react";
import { useStore } from "../hooks/useStore";
import { useNavigate } from "react-router-dom";
import AuthForms from "../components/AuthHome";
const Home = () => {
    const { jwt, setJwt, setUserData } = useStore((s) => s);
    const nav = useNavigate();
    const signinusername = createRef();
    const signupusername = createRef();
    const signinpass = createRef();
    const signuppass = createRef();
    const login = async (e) => {
        e.preventDefault();
        console.log("logging up...");
        console.log(
            signinusername.current.value,
            " :: ",
            signinpass.current.value
        );

        try {
            const signinUser = await axios.post(
                "http://localhost:5200/v1/signin",
                {
                    user: {
                        username: signinusername.current.value,
                        password: signinpass.current.value,
                    },
                }
            );
            console.log("🚀 ~ login ~ signinUser:", signinUser["data"]["data"]);
            const respData = signinUser["data"]["data"];
            const userData = respData["user"];
            const jwt = respData["jwt"]["ujwt"];
            setJwt(jwt);
            setUserData(userData);
            setTimeout(() => {
                nav("/dashboard");
            }, 0);
        } catch (e) {
            console.error(e);
        }
    };

    const signup = async (e) => {
        e.preventDefault();
        console.log("Signing up...");
        console.log(
            signupusername.current.value,
            " :: ",
            signuppass.current.value
        );

        try {
            const signedUpUser = await axios.post(
                "http://localhost:5200/v1/signup",
                {
                    user: {
                        username: signupusername.current.value,
                        password: signuppass.current.value,
                    },
                }
            );
            console.log(
                "🚀 ~ signup ~ signedUpUser:",
                signedUpUser["data"]["data"]
            );
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <section>
            <AuthForms
                signup={signup}
                signupusername={signupusername}
                signuppass={signuppass}
                login={login}
                signinusername={signinusername}
                signinpass={signinpass}
            />
        </section>
    );
};

export default Home;
