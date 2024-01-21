import { Form } from "@remix-run/react"
import { useSearchParams } from "@remix-run/react"

export default function Trial() {
    var [searchParams] = useSearchParams();
    return <Form method="post" action="/?index" id="register_task" preventScrollReset={true} className="h-lvh">
        {searchParams.get("error") != null ?
            (<div className=" text-red-400 text-2xl ml-36">{searchParams.get("error")}</div>) : (<></>)
        }
        <div className="h-full text-white flex-col justify-start py-24 px-40">
            <div className=" animate-fade-right w-1/2">
                <textarea name="source" id="source" rows={10} draggable={false} className="bg-slate-800 text-xl text-white border-slate-800 outline-none w-full text-wrap p-5 drop-shadow-lg shadow-md shadow-green-400 rounded-xl" placeholder="Paste source api's curl here!"></textarea>
            </div>
            <div className=" text-black animate-fade-right w-1/2 mt-5" >
                <textarea name="sink" id="sink" rows={2} draggable={false} className="text-xl text-neutral-500 bg-slate-800 focus: border-slate-200 w-full text-wrap p-2.5 shadow-lg shadow-blue-400 rounded-xl" placeholder="Paste sink Api's curl here!"></textarea>
                {/* <span className="mt-50 text-green-600 border-lime-100 bg-green-100 rounded-lg p-1 px-3 ">You can get a testing webhook from here! <a className="text-blue-500" target="_blank" href="https://webhook.site/">https://webhook.site/</a></span> */}
            </div>
            
            {/* <div className="inline-flex">
          <button className="px-12 py-4 rounded-lg bg-green-500 mx-4">Verify</button>
        </div> */}

            <div className="inline-flex flex-shrink-0 align-top mt-10">
                <button name="register" type="submit" className="px-12 py-4 rounded-lg bg-orange-500" id="register">Register Task</button>
            </div>
        </div>
        

    </Form>
}