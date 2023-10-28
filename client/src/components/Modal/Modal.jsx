import React from 'react'
import ReactDom from 'react-dom'

// Style
import "./Modal.scss"

const Modal = ({ open, onClose }) => {

    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className='overlay' onClick={onClose}></div>
            <div className='modal'>

                <div className="modal-container">

                    <div class="modal-content">

                        <button onClick={onClose} className='modal-close-btn'>&times;</button>

                        <div class="content">

                            <form action="#">

                                <div class="content-header">

                                    <h3 class="content-title">Source Code</h3>

                                    <p class="content-desc">
                                        To see the <span>Source Code</span>, refer to the link below
                                    </p>

                                    <p class="content-desc">
                                        برای دیدن <span>سورس کد</span> به لینک زیر مراجعه کنید
                                    </p>

                                </div>

                                <button type="submit" class="button">
                                    <a href="https://github.com/aliafarinifard/fullstack-real-estate" target="_blank">Source Code</a>
                                </button>

                            </form>

                        </div>

                        <div class="content-img">
                            <img src="./modal-img.png" alt="Modal" />
                        </div>

                    </div>

                </div>

            </div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal