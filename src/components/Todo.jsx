"use client"

function Todoitem({id, title, completed , toggleTodo}){
    return (
        <div>           
            <li className=" flex items-center justify-left text-3xl md:text-4xl mt-5">
                <input 
                id={id}
                type="checkbox" 
                className=" cursor-pointer peer w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0 mr-5"
                defaultChecked={completed}
                onChange={(e) => toggleTodo(id, e.target.checked)}       
                /> 

                <label 
                htmlFor={id} 
                className="cursor-pointer peer-checked:line-through peer-checked:text-green-600">
                    {title}
                </label>
            </li>
        </div>
        
    );
};

export default Todoitem;