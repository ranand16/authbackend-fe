import React from "react";
export function Singup({ signup, signupusername, signuppass }) {
    return (
        <form onSubmit={signup}>
            <label htmlFor="select-username">select-username</label>
            <input ref={signupusername} id="select-username" />

            <label htmlFor="select-password">select-password</label>
            <input ref={signuppass} id="select-password" type="text" />
            <button>Signup</button>
        </form>
    );
}
