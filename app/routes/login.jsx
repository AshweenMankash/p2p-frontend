import { Form, Link, useFetcher, json } from "@remix-run/react"
import {} from "~/utils/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";


export async function action({request}){
    let data = await  request.formData(); 
    let email = data.get("email");
    fetch()
    console.log(email);

    return json({})
    
    // let credentials = await signInWithEmailAndPassword(auth, email, password);
    // console.log("WTf!!!");
    // print(credentials);
    // return json({"user": credentials.user});

}

export default function Login() {
    let fetcher = useFetcher();

    console.log(fetcher.data);

    return (
        <div className="text-white flex flex-wrap mx-12 gap-0 justify-center items-center animate-fade-up px-20 py-20 md:p-0">

            <fetcher.Form method="POST" className="flex flex-col gap-4 p-12 bg-slate-600 md:mt-40 rounded-lg flex-grow-5" id="SIGNIN">
                <h2 className="text-2xl mb-5">Sign in</h2>
                <input name="email" className=" mb-2 rounded-md px-6 py-3 font-bold text-green-500 outline-none" spellCheck={false} type="email" placeholder="email" />
                <button type="submit" className="px-4 py-2 bg-orange-400 rounded-lg font-base text-xl" name="signIn" value={"signIn"}> Continue</button>
                {/* <hr className=""/> */}
                {/* <div className="">
                    <Link to="/signup" className="text-blue-300">
                        Signup
                    </Link>
                </div> */}
            </fetcher.Form>
        </div>
    )
}