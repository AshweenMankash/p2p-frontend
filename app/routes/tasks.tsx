import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export default function Tasks({tasks=[]}) {
    return <div className="">
        <h3 className="font-light text-3xl mb-8">Registered tasks</h3>

        {tasks.map((e) => {
            return (
                <div className="flex-col">
                    <h1 className="text-blue-500 flex">{e["id"]} </h1>
                    <p className="flex">( {e["data"]["total_run_count"]})</p>
                    <div className=" bg-black h-64 w-64 flex">
                        
                    </div>
                </div>
            )
        })}
        <div className="h-64 w-64" >
        <Outlet />
        </div>
    </div>
}
// createLoader
export async function loader({request}){
    console.log("Here ---------------------------------------------<-----<--<");
    return json({})
}
