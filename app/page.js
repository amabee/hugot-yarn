"use client";
import React, { useEffect, useState } from "react";
import "../public/styles/login-style.css";
import { useRouter } from "next/navigation";
import {
  ERROR_MESSAGE,
  EXCEPTION_ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "@/globals/swal";
import { AUTH, MAIN } from "@/globals/endpoints";
import axios from "axios";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      router.push("/Home");
    }
  }, [router]);

  const handleAuth = async () => {
    if (isLogin) {
      await login();
    } else {
      await signup();
    }
  };

  const login = async () => {
    if (!username.length > 0 && !password.length > 0) {
      ERROR_MESSAGE(
        "Invalid Input",
        "Username or Password must never be empty"
      );
      return;
    }
    try {
      const res = await axios.get(AUTH, {
        params: {
          operation: "login",
          json: JSON.stringify({
            username: username,
            password: password,
          }),
        },
      });

      if (res.status === 200) {
        if (res.data && res.data.success) {
          // SUCCESS_MESSAGE("Success", "Logged in successfully");

          sessionStorage.setItem("user", JSON.stringify(res.data.success));
          router.push("/Home");
        } else if (res.data && res.data.error) {
          ERROR_MESSAGE("Auth Failed!", res.data.error);
        } else {
          ERROR_MESSAGE("Auth Failed!", "An unknown error occurred.");
        }
      } else {
        ERROR_MESSAGE("Status Error", `Unexpected status code: ${res.status}`);
        console.log(res);
      }
    } catch (error) {}
  };

  const signup = async () => {
    const formData = new FormData();

    formData.append("operation", "signup");
    formData.append(
      "json",
      JSON.stringify({
        username: username,
        password: password,
        firstname: firstName,
        lastname: lastName,
        email: email,
      })
    );

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const res = await axios({
        url: AUTH,
        method: "POST",
        data: formData,
      });

      if (res.status === 200) {
        if (res.data !== null && res.data.success) {
          SUCCESS_MESSAGE("Success", `${res.data.success}`);
          setFirstName("");
          setUsername("");
          setPassword("");
          setEmail("");
          setLastName("");
          setIsLogin(true);
        } else {
          ERROR_MESSAGE("Error", `${res.data.error}`);
        }
      } else {
        ERROR_MESSAGE("Status Error", `${res.statusText}`);
      }
    } catch (error) {
      EXCEPTION_ERROR_MESSAGE(`${error}`);
    }
  };

  return (
    <div className="container">
      <div className="box box-two">
        <img src="/images/yarn.png" alt="Hugel Yarn" className="logo" />
        {/* <h2>{isLogin ? "Login" : "Sign Up"}</h2> */}
        <form>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <button type="button" className="next-btn" onClick={handleAuth}>
          {isLogin ? "Log In" : "Sign Up"}
        </button>
      </div>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <a
          href={isLogin ? "#login" : "#signup"}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign Up" : "Log In"}
        </a>
      </p>
    </div>
  );
};

export default AuthForm;
