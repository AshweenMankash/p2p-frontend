import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, createCookie, createCookieSessionStorage, json, redirect } from "@remix-run/node";
import { Form, Link, Links, Meta, Scripts, useLoaderData, useNavigate, useNavigation, useRouteError, useSearchParams } from "@remix-run/react";
import { useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Outlet } from "@remix-run/react";
import backend_url from "~/config";
import image from "~/images/background.jpg"



export const meta: MetaFunction = () => {
  return [
    { title: "P2P" },
    { name: "description", content: "Pull to Push Api converter" },
  ];
};

async function getTasks(userId:string){
  var resp = await fetch(backend_url+"/task?id=" + userId);
  const data = await resp.json();
  return data;
}

function useRevalidate(){
   let navigate = useNavigate();
   return useCallback(function revalidate(){
    navigate('.',{replace:true});
   },[navigate]);
}

async function pollTasks({enabled=false, interval=1000}){
    let revalidate = useRevalidate();
    useEffect(function pollInterval(){
      if(enabled) return;

      let intervalId = setInterval(revalidate, interval);
      return ()=> clearInterval(intervalId);
    },[revalidate])

}

export async function action({request}:ActionFunctionArgs) {
  const a = await request.formData();
  const data = Object.fromEntries(a);

  var { getSession, commitSession, destroySession } = createCookieSessionStorage(({
    cookie: {
      name: "p2p-user",
      secrets:["ashweenmankash"]
    }
  }));
  var oldCookie = request.headers.get("Cookie");
  var session = await getSession(oldCookie);
  
  if (a.get("source") == null || a.get("sink") == null|| a.get("sink") == ""|| a.get("source") == ""){
    return redirect("/?error=Empty Fields!")
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
  var response = await fetch(backend_url+"/register",{
    method:"POST",
    mode: "cors",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(requestData)

  });

  console.log(response.json());
  return redirect("/");
}

export default function Index() {

  const navigate = useNavigate();

  var taskData: object = useLoaderData();
  var [searchParams, setSearcParams] = useSearchParams();
  const {state} = useNavigation();
  pollTasks({enabled:true});
  if(state == 'loading'){
    return (
      <div className="text-3xl font-extrabold">
        Loading ....
      </div>
    )
  }

  console.log(taskData);
  const tasks:[] = taskData["tasks"];

  return (
    <header className="flex h-lvh items-center">
      
      {/* <hr className="border-solid border-t-1 border-neutral-700" /> */}
      <div className="flex flex-col  w-dvw items-center mb-40">
        <h2 className="flex-1 bg-clip-text text-white  text-6xl font-bold text-left leading-14 justify-self-center animate-fade-up">
          Tired of polling data from API?<br /> Let's convert it into a <span className="text-orange-400 animate-fade-up animate-delay-100">PUSH API</span>.
        </h2>

        <button  onClick={()=>navigate("/trial")} className="animate-bounce flex-1 bg-gradient-to-r from-pink-500 via-orange-400 to-orange-500 font-bold px-8 py-4 mt-20 w-1/5">Try now!</button>
        {/* <svg className="fill-white mt-24 animate-bounce flex-1 transform: scale-150" width="96" height="96" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"/></svg> */}
      </div>
      
    </header>
  );
}




export async function loader({ request }:LoaderFunctionArgs) {
  console.log(backend_url);
  var { getSession, commitSession, destroySession } = createCookieSessionStorage(({
    cookie: {
      name: "p2p-user",
      secrets:["ashweenmankash"]
    }
  }));

  var oldCookie = request.headers.get("Cookie");
  const session = await getSession(oldCookie);

  var userId = session.get("userId");

  if (userId == null) {
    session.set("userId", uuidv4());
  }
  userId = session.get("userId");
  const cookie = await commitSession(session);




  var data = await getTasks(userId);
  
  console.log(data, "*************************************************8");
  return json(data, { headers: { 'Set-Cookie': cookie } });
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