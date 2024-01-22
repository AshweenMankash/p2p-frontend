import { Form, Link, useFetcher } from "@remix-run/react"


export default function Login() {
    let fetcher = useFetcher();
    return (
        <div className="text-white flex flex-row gap-0 justify-center items-center animate-fade-up">

            <Form className="flex flex-col gap-4 px-20 py-12 bg-slate-800 mt-40 rounded-lg flex-grow-5" id="SIGNUP" autoComplete={"off"}>
                <h2 className="text-2xl mb-5">Sign up</h2>
                <input className=" mb-1 rounded-md px-6 py-3 font-bold text-green-500 outline-none" spellCheck={false} autoComplete="none" placeholder="username" />
                <input className=" mb-1 rounded-md px-6 py-3 font-bold text-green-500 outline-none" spellCheck={false} autoComplete="none" type="email" placeholder="email address" />
                <input className=" mb-1 rounded-md px-6 py-3 font-bold text-green-500 outline-none" spellCheck={false} autoComplete="none" type="password" placeholder="password" />
                <input className=" mb-1 rounded-md px-6 py-3 font-bold text-green-500 outline-none" spellCheck={false} autoComplete="none" type="password" placeholder="repeat password" />

                <button className="px-4 py-2 bg-orange-400 rounded-lg font-base text-xl" name="button" value={"signUp"}> Continue</button>
            </Form>
            <div className="w-36 mb-5"></div>

            <Form className="flex flex-col gap-4 p-12 bg-slate-600 mt-40 rounded-lg flex-grow-5" id="SIGNIN">
                <h2 className="text-2xl mb-5">Sign in</h2>
                <input className=" mb-2 rounded-md px-6 py-3 font-bold text-green-500 outline-none" spellCheck={false} placeholder="username" />
                <input className=" mb-2 rounded-md px-6 py-3 font-bold text-green-500 outline-none" spellCheck={false} type="password" placeholder="password" />
                <button className="px-4 py-2 bg-orange-400 rounded-lg font-base text-xl" name="button" value={"signIn"}> Continue</button>
            </Form>
        </div>
    )
}