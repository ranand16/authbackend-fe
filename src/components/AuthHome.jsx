import React from "react";

const AuthForms = ({
    signup,
    signupusername,
    signuppass,
    login,
    signinusername,
    signinpass,
}) => {
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>SIGNUP</h2>
            <form onSubmit={signup} style={styles.form}>
                <label htmlFor="select-username" style={styles.label}>
                    Select Username
                </label>
                <input
                    ref={signupusername}
                    id="select-username"
                    style={styles.input}
                />

                <label htmlFor="select-password" style={styles.label}>
                    Select Password
                </label>
                <input
                    ref={signuppass}
                    id="select-password"
                    type="password"
                    style={styles.input}
                />

                <button style={styles.button}>Signup</button>
            </form>

            <h2 style={styles.heading}>LOGIN</h2>
            <form onSubmit={login} style={styles.form}>
                <label htmlFor="username" style={styles.label}>
                    Username
                </label>
                <input
                    ref={signinusername}
                    id="username"
                    style={styles.input}
                />

                <label htmlFor="password" style={styles.label}>
                    Password
                </label>
                <input
                    ref={signinpass}
                    id="password"
                    type="password"
                    style={styles.input}
                />

                <button style={styles.button}>Signin</button>
            </form>
        </div>
    );
};
const styles = {
    container: {
        maxWidth: "450px",
        margin: "0 auto",
        padding: "40px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    heading: {
        color: "#333",
        marginBottom: "30px",
        fontSize: "2rem",
        fontWeight: "600",
        letterSpacing: "1px",
        borderBottom: "3px solid #007BFF",
        display: "inline-block",
        paddingBottom: "10px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    label: {
        textAlign: "left",
        color: "#333",
        fontSize: "1rem",
        fontWeight: "500",
        marginBottom: "8px",
    },
    input: {
        padding: "12px 15px",
        fontSize: "1.1rem",
        borderRadius: "8px",
        border: "1px solid #ddd",
        outline: "none",
        backgroundColor: "#f9f9f9",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    inputFocus: {
        borderColor: "#007BFF",
        boxShadow: "0 0 8px rgba(0, 123, 255, 0.2)",
    },
    button: {
        padding: "12px",
        fontSize: "1.1rem",
        color: "#ffffff",
        backgroundColor: "#007BFF",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
    },
    buttonHover: {
        backgroundColor: "#0056b3",
        transform: "translateY(-2px)",
    },
    errorMessage: {
        color: "#ff3860",
        fontSize: "0.9rem",
        marginTop: "-10px",
        marginBottom: "20px",
        textAlign: "left",
    },
    successMessage: {
        color: "#28a745",
        fontSize: "1rem",
        marginTop: "-10px",
        marginBottom: "20px",
        textAlign: "left",
    },
};

export default AuthForms;
