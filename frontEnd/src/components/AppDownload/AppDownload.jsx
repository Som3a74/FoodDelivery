/* eslint-disable no-unused-vars */
import React from 'react'
import './appDownload.css'
import { assets } from '../../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id="app-download">
        <p>For Better Experience Download <br /> Tomato App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="assets.play_store-one" />
            <img src={assets.app_store} alt="assets.play_store-two" />
        </div>
    </div>
  )
}

export default AppDownload