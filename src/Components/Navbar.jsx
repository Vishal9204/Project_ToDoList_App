import React from "react" ;

const Navbar = () => {
    return (
        <nav className = 'flex justify-between shadow-xl bg-slate-600 text-white py-2'>
            <div className="logo">
                <span className="font-bold text-2xl mx-9 cursor-pointer">ToDoList</span>
            </div>
            <ul className="flex gap-5 mx-8">
            <li className = "cursor-pointer hover:font-bold transition-all">Home</li>
            <li className = "cursor-pointer hover:font-bold transition-all">About</li>
            <li className = "cursor-pointer hover:font-bold transition-all">Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar ;