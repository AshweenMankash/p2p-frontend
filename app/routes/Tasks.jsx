import { redirect } from "@remix-run/node";

export default function Tasks() {
    return <div className="text-black h-64 bg-blue-200 m-0 items-center">
        <form method="post" className="flex-row" id="submit-task">
            <span className="flex">
                <label>Source CURL</label>
                <input id="source" />
            </span>
            <span className="flex">
                <label>Sink CURL</label>
                <input id="sink" />
            </span>
            
            <button>Verify</button>

        </form>
    </div>
}



export async function action({request}){
    const form = await request.formData();
    const formData = Object.fromEntries(form);
    console.log(formData);  
    
    return redirect("/");
    return {}
}