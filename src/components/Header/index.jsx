import React from 'react';
import './header.css';

export default function Header() {
    return (
        <header className='header'>
            <div className='header-flex'>
                <div className='logo-container'>
                    <img src='/assets/spotify-logo.png' className='spotify-logo' width={120} height={48} />
                </div>

                <div className='profile-container'>
                    <img src='/assets/profile.png' className='user-icon' width={48} height={48} />
                </div>
            </div>
        </header>
    )
}
