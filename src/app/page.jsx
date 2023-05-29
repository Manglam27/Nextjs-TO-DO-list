import Link from "next/link";
import { prisma } from '@/db'
import Todoitem from "@/components/Todo";
import CustomMenu from "@/components/CustomMenu";


function getTodos () {
    return prisma.Todo.findMany()
}

async function toggleTodo (id, completed) {
    "use server"

    await prisma.Todo.update({
        where: { id },
        data: { completed: completed },
    })
}

async function deleteTodo (id) {   
    "use server"

    await prisma.Todo.delete({
        where: { id },
    })
}


const Todo = async() => {
    const Todo_data = await getTodos()
    return (
        <div>
            <CustomMenu deleteTodo={deleteTodo}/>
            <div className="flex justify-between items-center text-4xl md:text-5xl ">
                <h1>TO-DO</h1>
                <button><Link className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none" href="/new">Create New</Link></button>
            </div>
            <div className=" mt-[110px] pl-5" >
                <ul>
                    {Todo_data.map((Todo) => (
                        <Todoitem key={Todo.id} {...Todo} toggleTodo={toggleTodo}/>

                        // <li key={Todo.id}>{Todo.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Todo;