import React, { Children } from "react";
import styles from "./../styles/Modal.module.css";

const Modal = ({ setIsOpen, Children, title }) => {
    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.heading}>{title}</h2>
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                        X
                    </button>
                    <div className={styles.modalContent}>
                        {Children}
                    </div>
                    <div className={styles.modalActions}>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;