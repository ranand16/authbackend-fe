import React from "react";
export function Signin({ login, signinusername, signinpass }) {
    return (
        <form onSubmit={login}>
            <label htmlFor="username">username</label>
            <input ref={signinusername} id="username" />

            <label htmlFor="password">password</label>
            <input ref={signinpass} id="password" type="password" />

            <button>Signin</button>
        </form>
    );
}
