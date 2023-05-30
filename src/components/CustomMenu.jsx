"use client";
import React, { useEffect } from 'react';
import '@/app/globals.css'


const CustomMenu = ({deleteTodo}) => {
    const menuRef = React.useRef(null);
    const menuState = {
        visible: false,
        x: 0,
        y: 0,
    };

    const showMenu = (x, y) => {
        menuState.visible = true;
        menuState.x = x;
        menuState.y = y;
        menuRef.current.style.display = 'block';
        menuRef.current.style.left = `${x}px`;
        menuRef.current.style.top = `${y}px`;
    };

    const hideMenu = () => {
        menuState.visible = false;
        menuRef.current.style.display = 'none';
    };

    let forAttributeValue  = '';

    const handleContextMenu = (event) => {
        event.preventDefault();
        showMenu(event.clientX, event.clientY);
        window.addEventListener('click', handleWindowClick);


        const targetComponent = event.target;
        forAttributeValue = targetComponent.getAttribute('for');
    };

    const handleWindowClick = (event) => {
        if (!event.target.classList.contains('menu-item')) {
            hideMenu();
        }
    };

    const handleMenuItemClick = (event) => {
        console.log('clicked', event.target);
    
        if (event.target.innerHTML === 'Delete') {
            console.log('Component ID:', forAttributeValue);
            if(forAttributeValue != null){deleteTodo(forAttributeValue); }
            hideMenu();    
        }
        hideMenu();
    };

    useEffect(() => {
        window.addEventListener('contextmenu', handleContextMenu);
        return () => {
            window.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('click', handleWindowClick);
        };
    }, []);

    return (
        <div
            id="menu"
            ref={menuRef}
            className="menu"
            style={{
                display: 'none',
                position: 'absolute',
            }}
        >
            <div className="menu-item" onClick={handleMenuItemClick}>Copy</div>
            <div className="menu-item" onClick={handleMenuItemClick}>Delete</div>
        </div>
    );
};

export default CustomMenu;
