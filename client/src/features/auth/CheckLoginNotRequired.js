import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from "./authApiSlice";
import { useSelector, useDispatch } from 'react-redux';
import { selectedToken, setCredentials } from "./authSlice"; // נוסיף את setToken לעדכון ה-token

const CheckLoginNotRequired = () => {
    const dispatch = useDispatch(); // מאפשר לעדכן את ה-state ב-Redux
    const token = useSelector(selectedToken);
    const effectRan = useRef(false);
    const [setTrueSuccess] = useState(false);
    const [refresh, { isLoading }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token');
                try {
                    if (!token) {
                        // אם אין טוקן, ניצור טוקן פיקטיבי ונגדיר אותו
                        const fakeToken = "fake-token-" + Math.random().toString(36).substring(2);
                        dispatch(setCredentials(fakeToken)); // שמירת הטוקן ב-state של Redux
                        console.log("Created fake token:", fakeToken);
                    } else {
                        await refresh(); // אם יש טוקן, נבצע רענון שלו
                        setTrueSuccess(true);
                    }
                } catch (err) {
                    console.error(err);
                }
            };

            if (!token) verifyRefreshToken(); // ריצת הפונקציה אם אין טוקן
        }

        return () => {
            effectRan.current = true;
        };
        // eslint-disable-next-line
    }, [token, refresh, dispatch]);

    let content;
    if (isLoading) {
        console.log('loading');
        content = <h1>בטעינה...</h1>;
    } else {
        content = <Outlet />;
    }

    return content;
};

export default CheckLoginNotRequired;