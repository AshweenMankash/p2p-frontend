import { Form } from "@remix-run/react"
import { useSearchParams } from "@remix-run/react"


export async function action({ request }) {
    const a = await request.formData();
    const data = Object.fromEntries(a);

    var { getSession, commitSession, destroySession } = createCookieSessionStorage(({
        cookie: {
            name: "p2p-user",
            secrets: ["ashweenmankash"]
        }
    }));
    var oldCookie = request.headers.get("Cookie");
    var session = await getSession(oldCookie);

    if (a.get("source") == null || a.get("sink") == null || a.get("sink") == "" || a.get("source") == "") {
        return redirect("Trial/?error=Empty Fields!")
    }
    var requestData = {
        "fetch_from": a.get("source"),
        "put_to": a.get("sink"),
        "frequency": 10,
        "id": await session.get("userId")
    }
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log(data);
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    var response = await fetch(backend_url + "/register", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)

    });

    console.log(response.json());
    return redirect("/");
}


export default function Trial() {
    var [searchParams] = useSearchParams();
    return <div className="flex flex-row h-dvh">
        <Form method="post" action="/?index" id="register_task" preventScrollReset={true} className=" w-1/2">
            {searchParams.get("error") != null ?
                (<div className=" text-red-400 text-2xl ml-36">{searchParams.get("error")}</div>) : (<></>)
            }
            <div className="h-full text-white flex-col justify-start py-24 px-40">
                <div className=" animate-fade-right">
                    <textarea name="source" id="source" rows={10} draggable={false} className="bg-slate-800 text-xl text-white border-slate-800 outline-none w-full text-wrap p-5 drop-shadow-lg shadow-md shadow-green-400 rounded-xl" placeholder="Paste source api's curl here!"></textarea>
                </div>
                <div className=" text-black animate-fade-right mt-5" >
                    <textarea name="sink" id="sink" rows={2} draggable={false} className="text-xl text-neutral-500 bg-slate-800 focus: border-slate-200 w-full text-wrap p-2.5 shadow-lg shadow-blue-400 rounded-xl" placeholder="Paste sink Api's curl here!"></textarea>

                </div>

                {/* <div className="inline-flex">
          <button className="px-12 py-4 rounded-lg bg-green-500 mx-4">Verify</button>
        </div> */}

                <div className="inline-flex flex-shrink-0 align-top mt-10">
                    <button name="register" type="submit" className="px-12 py-4 rounded-lg bg-orange-500 text-xl font-extrabold" id="register">Register Task</button>
                </div>
            </div>


        </Form>
        <div className="flex text-white w-1/2 justify-start animate-fade-left py-10 ">
            <div className="absolute h-4/5 w-full rounded-lg -z-10 bg-neutral-900">

            </div>
            <div className="mt-20 ml-10">

                <h1 className="text-4xl">Instructions</h1>
                <ul className="mt-5 text-xl">
                    <li className="text-green-400">{">\t"} Source means where you want the data from</li>
                    <li className="text-green-400"> {">\t"}  Source CURL must be a non rate limiting API.</li>
                    <li className="text-green-400"> {">\t"}  Source CURL must be a GET API.</li>
                    <li className="mt-4"></li>
                    <li className="text-blue-400">{">\t"} Sink means where you want the data pushed</li>
                    <li className="text-blue-400"> {">\t"}  Sink CURL must be a non rate limiting API.</li>
                    <li className="text-blue-400"> {">\t"}  Sink CURL must be a POST API.</li>
                    <li className="mt-10"></li>

                </ul>
                <span className="">If you want to try the product, check below!</span>
                <div className="flex-col ">
                    <a href="https://restcountries.com/" target="_blank" className=" flex py-2 text-blue-800 hover:text-blue-600">Public API's</a>
                    <a href="https://webhook.site/#!/e23c6ad0-3a75-4217-841e-38a0c040cfa0" target="_blank" className="text-blue-800 hover:text-blue-600 py-2">Webhook Testing</a>
                </div>

            </div>

        </div>
    </div>
}


export function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);

    return (
        <html>
            <head>
                <title>Oh no!</title>
                <Meta />
                <Links />
            </head>
            <body>
                {/* add the UI you want your users to see */}
                <div className="">
                    Something definitely broke!
                </div>
            </body>
        </html>
    );
}