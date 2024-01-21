import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, createCookie, createCookieSessionStorage, json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from "uuid";

import image from "~/images/background.jpg"

export const meta: MetaFunction = () => {
  return [
    { title: "P2P" },
    { name: "description", content: "Pull to Push Api converter" },
  ];
};

export async function action({request}:ActionFunctionArgs) {
  const a = await request.formData();
  const data = Object.fromEntries(a);

  var { getSession, commitSession, destroySession } = createCookieSessionStorage(({
    cookie: {
      name: "p2p-user"
    }
  }));
  var oldCookie = request.headers.get("Cookie");
  var session = await getSession(oldCookie);
  data["id"] = 
  data["interval"] = 10;
  var requestData = {
    "fetch_from": a.get("source"),
    "put_to": a.get("sink"),
    "frequency": 10,
    "id": await session.get("userId")
  }
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  console.log(data);
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  var response = await fetch("https://api.railway.internal/register",{
    method:"POST",
    mode: "cors",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(requestData)

  });

  console.log(response.json());
  return redirect("/");
}

export default function Index() {

  var taskData: object = useLoaderData();

  console.log(taskData);
  const tasks: string[] = taskData["tasks"];

  return (<div className=" ">
    <header className="inset-x-0 top-0 z-50">
      <nav className="fixed w-lvw flex items-center justify-center justify-items-start py-6 bg-black text-gray-200 border-b-0 border-b-neutral-600">
        <div className="flex w-1 text-5xl font-base text-white">
          P2P
        </div>
        <div className="flex  w-1/2 gap-x-3 px-6 items-center justify-center">
          <a className="text-green text-sm leading-6 text-gray-400  hover:text-white border-none border-black p-2" href={"https://railway.app"} target="_blank">Hosted on</a>
          {/* <Link className="text-base font-sm leading-6 text-gray-400 hover:text-white border-none border-black p-2" to={"/about"}>Pricing</Link> */}
        </div>
        <div className="flex gap-x-2">
          <button className="">Login</button>
        </div>
      </nav>
      <hr className="border-solid border-t-1 border-neutral-700" />
      <div className="  text-white bg-black  py-36 text-center">
        <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 align-bottom items-end text-5xl font-bold">
          Tired of polling data from API?<br /> Let's convert it into a <span className="text-orange-400">PUSH API</span>.
        </h2>

        <button className=" bg-pink-600 font-bold px-8 py-4 mt-10">Try now!</button>
      </div>
    </header>
    <Form method="post" action="/?index" id="register_task">
    <div className="flex flex-row bg-white m-12 text-black">
      <div className="flex-1 px-10">
        <textarea name="source" id="source" rows={10} draggable={false} className=" text-xl text-neutral-500 bg-slate-200 focus: border-slate-200 w-full text-wrap p-2.5" placeholder="Paste source api's curl here!"></textarea>
      </div>
      <div className="flex-1 px-10" >
        <textarea name="sink" id="sink" rows={10} draggable={false} className="text-xl text-neutral-500 bg-slate-200 focus: border-slate-200 w-full text-wrap p-2.5" placeholder="Paste sink Api's curl here!"></textarea>
        <span>You can get a testing webhook from here! <a className="text-blue-500" target="_blank" href="https://webhook.site/">https://webhook.site/</a></span>
      </div>
    </div>
    <div className="flex-col w-128 px-24 text-black">
      {/* <div className="inline-flex">
          <button className="px-12 py-4 rounded-lg bg-green-500 mx-4">Verify</button>
        </div> */}
      <div className="inline-flex">
        <button name="register" type="submit" className="px-12 py-4 rounded-lg bg-orange-500" id="register">Register Task</button>
      </div>
    </div>
    </Form>
    <div>

      <div className="h-64 px-24 mt-12">
        <h3 className="font-light text-3xl mb-8">Registered tasks</h3>

        {tasks.map((e) => {
          return (
            <h1 className="text-blue-500">{e}</h1>
          )
        })}
      </div>

    </div>
  </div>
  );
}




export async function loader({ request }:LoaderFunctionArgs) {
  var { getSession, commitSession, destroySession } = createCookieSessionStorage(({
    cookie: {
      name: "p2p-user"
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





  var resp = await fetch("https://api-production-1a1e.up.railway.app/task?id=" + userId);
  const data = await resp.json();
  console.log(data, "*************************************************8");
  return json(data, { headers: { 'Set-Cookie': cookie } });
}



