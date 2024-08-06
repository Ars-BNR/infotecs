import React from 'react'
import styles from './Modal.module.css'

const Modal = ({ active, setActive, children }) => {
    return (
        <div className={`${styles.modal} ${active ? styles.active : ""}`} onClick={() => setActive(false)}>
            <div className={`${styles.modal__content} ${active ? styles.active : ""}`} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal