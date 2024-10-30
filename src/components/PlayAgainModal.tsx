import React, { useState } from "react";

function PlayAgainModal({ isVisible, onConfirm, onCancel }: any) {
  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Do you want to play again?</h2>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
}

export default PlayAgainModal;
