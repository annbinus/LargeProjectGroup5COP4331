import React from 'react'
import '../AppMain.css'; // Two dots to go outside of the components folder
import { SidebarData } from './SidebarData'; // Imports sidebar data

function Sidebar() {
    return (
    <div className='Sidebar'>
        <ul className='SidebarList'>
            {SidebarData.map((val, key)=> {
                return (
                    <li 
                    key={key} 
                    className='SidebarRow'
                    onClick={() => { 
                        window.location.pathname = val.link; /* Applies sidebar's button link */
                        val.handler
                    }}
                    >
                        <div id='SidebarIcon'>{val.icon}</div> {/* Applies sidebar's button icon */}
                    </li>
                )
            })}
        </ul>
    </div>
    );
}

export default Sidebar