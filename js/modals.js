function showConfirm(message, onYes, onNo) {
  const modal = document.getElementById("modalConfirm");
  const msg = document.getElementById("modalConfirmMessage");
  msg.textContent = message;

  modal.style.display = "flex";

  const yesBtn = document.getElementById("modalConfirmYes");
  const noBtn = document.getElementById("modalConfirmNo");

  yesBtn.onclick = () => {
    modal.style.display = "none";
    if (onYes) onYes();
  };
  noBtn.onclick = () => {
    modal.style.display = "none";
    if (onNo) onNo();
  };
}

function showAlert(message, onOk) {
  const modal = document.getElementById("modalAlert");
  const msg = document.getElementById("modalAlertMessage");
  msg.textContent = message;

  modal.style.display = "flex";

  const okBtn = document.getElementById("modalAlertOk");
  okBtn.onclick = () => {
    modal.style.display = "none";
    if (onOk) onOk();
  };
}

  </script>
