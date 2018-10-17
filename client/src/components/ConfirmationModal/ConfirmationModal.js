import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
            </section>
        </div>
    );
};

export default ConfirmationModal;