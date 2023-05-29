import { redirect } from 'next/navigation';
import Link from "next/link";
import { prisma } from '@/db'

async function addTodo (data) {
    "use server"

    const title = data.get('title')?.valueOf()
    if (title === undefined || title.length === 0 || title.length > 150) {
        throw new Error('Invalid title')
    }

    await prisma.Todo.create({ data: { title , completed: false } })
    redirect('/')
}



const New = () => {
    return (
        <div>
            <h1 className=" flex justify-center items-center text-4xl md:text-5xl ">Make New Task</h1>
           
           <form action={addTodo}>
            <input name="title" type="text" className=' m-auto mt-[50px] mb-[50px] h-12 bg-transparent border border-slate-300 text-slate-300 px-2 py-1 rounded text-3xl md:text-4xl w-full ' />
            
            <div className="flex justify-center gap-4 w-full items-center text-2xl md:text-3xl  ">
                <Link href="/" className=" flex justify-center w-full border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">cancel</Link>
                <button  type="submit" className=" w-full border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Add</button>
            </div>
            </form>
        </div>
    );
};

export default New;