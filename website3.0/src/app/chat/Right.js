import React from 'react'

export default function Right() {
    const data = [
        {name:'Rey Jhon',time:'just now', message: 'Hey there! Are you finish creating the chat app?', active: true},
        {name:'Cherry Ann',time:'12:00', message: 'Hello? Are you available tonight?'},
        {name:'Lalaine',time:'yesterday', message: 'I\'m thingking of resigning'},
        {name:'Princess',time:'1 day ago', message: 'I found a job :)'},
        {name:'Charm',time:'1 day ago', message: 'Can you me some chocolates?'},
        {name:'Garen',time:'1 day ago', message: 'I\'m the bravest of all kind'},
    ]
  return (
    <div className="w-80 mt-[127px] h-screen dark:bg-gray-800 bg-gray-100 p-2 hidden md:block">
    <div className="h-full overflow-y-auto">
        <div className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3">Chikaa</div>
        <div className="search-chat flex p-3">
            <input className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700  w-full rounded-l-md" type="text" placeholder="Search Messages"/>
            <div className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
        <div className="text-lg font-semibol text-gray-600 dark:text-gray-200 p-3">Recent</div>
        <div className="p-1">
    {
        data.map((item, index) => (
            
            <div>
            <div className={'conversation-item p-1 dark:bg-gray-700 hover:bg-gray-200 m-1 rounded-md '} >
                <div className={'flex items-center p-2  cursor-pointer  '}>
                    <div className="w-7 h-7 m-1">
                        <img className="rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar"/>
                    </div>
                    <div className="flex-grow p-2">
                        <div className="flex justify-between text-md ">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.name}</div>
                            <div className="text-xs text-gray-400 dark:text-gray-300">{item.time}</div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400  w-40 truncate">
                        {item.message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ))
    }
</div>
    </div>
</div>  
  )
}
