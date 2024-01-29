import { Form, Link, json, useFetcher } from "@remix-run/react"
import backend_url from "~/config";
import { useRouteError, Meta, Links } from "@remix-run/react";
import { signUp } from "~/utils/firebaseConfig";
import Firebase from "~/utils/firebaseConfig";
import { createUserWithEmailAndPassword, getAuth, signInWithRedirect, GoogleAuthProvider, signInWithPopup, getRedirectResult, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";
import { credential } from "firebase-admin";

export async function action({ request }) {
    const a = await request.formData();
    const googleLogin = a.get("google-login");

    // console.log(a.entries());
    // for( let key in a.keys()){
    //     console.log(key, value);
    // }
    console.log(Object.fromEntries(a));
    if (googleLogin) {
        console.log(a.get("idToken"));
    } else if(a.get("button")=="signUp") {



        const email = a.get("email");
        const password = a.get("password");
        const repassword = a.get("repassword");

        request.url
        console.log(email, password, repassword);



        let auth = getAuth(Firebase);

        await sendSignInLinkToEmail(auth,email,{url:"http://localhost:3000/signup",handleCodeInApp:true});
        // signInWithEmailLink(auth, email, )
        // if(password!=repassword){
        //     return json({repassword:"Not Same"});
        // }
        console.log(email, password);

        console.log("Got firebase");
        // let user = await signUp(email, password);


        // console.log(user);
        console.log("Completed");

    }
    return json({ "name": "user" });
}


async function signInWithGoogle(e) {
    e.preventDefault();
    const auth = getAuth(Firebase);
    let provider = new GoogleAuthProvider();
    console.log("WTF");
    await signInWithPopup(auth, provider);
    console.log("WTF After redirect");
    let result = await  getRedirectResult(auth);
    console.log("Signed In?")
    console.log(result.user.email);
}

export default function SignUp() {
    let fetcher = useFetcher();
    let formData = fetcher.data;

    let repassword = "false";
    // console.log(repassword);
    return <div className="text-white flex flex-wrap mx-12 gap-0 justify-center items-center animate-fade-up px-20 py-20 md:p-0 h-dvh">
        <fetcher.Form method="POST" className="flex flex-col gap-4 px-10 py-12 bg-slate-800 rounded-lg" id="SIGNUP" autoComplete={"off"}>
            <h2 className="text-2xl mb-5">Sign up</h2>
            <input name="email" className=" mb-1 rounded-md px-6 py-3 font-bold text-green-500 outline-none" spellCheck={false} autoComplete="none" type="email" placeholder="email address" />
            <input name="password" className=" mb-1 rounded-md px-6 py-3 font-bold text-green-500 outline-none" spellCheck={false} autoComplete="none" type="password" placeholder="password" />
            <input name="repassword" className={repassword ? " mb-1 rounded-md px-6 py-3 font-bold text-green-500 outline-red-400" : " mb-1 rounded-md px-6 py-3 font-bold text-green-500 outline-none"} spellCheck={false} autoComplete="none" type="password" placeholder="repeat password" />
            <span className="text-red-400 p-0 m-0">{repassword}</span>
            <button className="px-4 py-2 bg-orange-400 rounded-lg font-base text-xl" name="button" type="submit" value={"signUp"}> Continue</button>
            <button className="px-4 py-2 bg-orange-400 rounded-lg font-base text-xl" name="SignWithGoogle" value={"signUp"} onClick={(e) => signInWithGoogle(e)}> Sign In with Google</button>
        </fetcher.Form>
    </div>
}



export async function loader({ request }) {
    console.log(backend_url);
    // let currentUser = getAuth().currentUser;

    // console.log(currentUser);

    return json({});
}


export function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);

    return (

        <div className="">
            Something definitely broke!
        </div>

    );
}
