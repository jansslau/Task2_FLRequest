 let currentBackground = "NAVINDEX1.png";

function handleButtonClick(buttonNumber) {
  if (currentBackground === "ATCLOGONSTATUS.png") {
    if (buttonNumber === 14) {
      changeBackground("LOGONSTATUS2ON.png");
      return;
    }
  }
    
  if (currentBackground === "LOGONSTATUS2ON.png") {
    if (buttonNumber === 13) {
      changeBackground("ATCLOGONSTATUS.png");
      return;
    }
  }
  if (currentBackground === "NAVINDEX1.png") {
    if (buttonNumber === 7) {
      changeBackground("ATCINDEX.png");
      return;
    }
  }

  if (currentBackground === "ATCINDEX.png") {
    if (buttonNumber === 2) {
      changeBackground("ATCREQUEST1.png");
      return;
    } else if (buttonNumber === 6) {
      changeBackground("ATCLOGONSTATUS.png");
      return;
    }
  }

  if (currentBackground === "ATCREQUEST1.png") {
    if (buttonNumber === 1) {
      openVirtualScratchpad();
      return;
    }
  }

  if (currentBackground === "ATCLOGONSTATUS.png") {
    if (buttonNumber === 6) {
      changeBackground("ATCINDEX.png");
      return;
    }
  }

  if (currentBackground === "ATCALT350.PNG") {
    if (buttonNumber === 9) {
      changeBackground("ATCALT350PERF.png");
      return;
    }
  }

  if (currentBackground === "ATCALT350PERF.png") {
    if (buttonNumber === 12) {
      changeBackground("VERIFYREQUESTALT.png");
      return;
    } else if (buttonNumber === 6) {
      changeBackground("ATCREQUEST1.png");
      return;
    }
  }

if (currentBackground === "VERIFYREQUESTALT.png") {
  if (buttonNumber === 6) {
    changeBackground("ATCALT350.PNG");
  } else if (buttonNumber === 12) {
    displaySequence(["VERIFYREQUESTALTSENDING.png", "ATREQUESTOPEN.png"]);
      setTimeout(() => {
      updateSidebarMessage("We are now waiting for a response from ATC");
    }, 3000);
    setTimeout(() => {
      playAudio("ATREQUESTOPEN_UPLINK.png");
    }, 8000);
  }
}

if (currentBackground === "ATREQUESTOPEN_UPLINK.png") {
  if (buttonNumber === 1) {
    changeBackground("ATCUPLINK.png");
    updateSidebarMessage("We have received a Standby Message by ATC. It is best practice to display the ATC log Page during CPDLC Idle time. Execute this step to continue");
    return;
  }
}
  
if (currentBackground === "ATCUPLINK.png") {
  if (buttonNumber === 12) {
    changeBackground("ATCLOG1.png");
    updateSidebarMessage("The request (downlink message) to climb to FL 350 is still open, meaning we are waiting for a further reply by ATC");

    setTimeout(() => {
      changeBackground("ATCLOG2.png");
      updateSidebarMessage("We now received a new Uplink Message by ATC, in order to view it we need to click on the appropriate button next to the word 'NEW'");
      playAudio("ATCLOG2.png");
    }, 5000);
  } 
}

if (currentBackground === "ATCLOG2.png") {
  if (buttonNumber === 7) {
    changeBackground("ATCUPLINK2.png");
       updateSidebarMessage("The message status changed from NEW to OPEN. You can now accept the clearance");
    return;
  }
}
if (currentBackground === "ATCUPLINK2.png") {
  if (buttonNumber === 9) {
    displaySequence(["VERIFYRESPONSE1.png", "VERIFYRESPONSE2.png"]);
    return;
  }
}
if (currentBackground === "VERIFYRESPONSE2.png") {
  if (buttonNumber === 12) {
    displaySequence(["VERIFYRESPONSE3.png", "ATCUPLINK_ACCEPTED.png"]);
    return;
  }
}

}




function changeBackground(newBackground) {
  document.getElementById("NAVINDEX1").src = newBackground;
  currentBackground = newBackground;
  document.getElementById("waiting-message").style.display = "none"; // nicht anzeigen der Msg vorher
}

function displaySequence(pictures) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < pictures.length) {
      changeBackground(pictures[index]);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 2000);
}

function playAudio(backgroundImage) {
  let audio = new Audio('audio.mp3');
  audio.play();

  audio.onended = function () {
    changeBackground(backgroundImage);
  };
}

function openVirtualScratchpad() {
  let userInput = prompt("Please enter requested FL or ALT:", "");
  if (userInput !== null) {
    changeBackground("ATCALT350.PNG");
  }
}

function updateSidebarMessage(message) {
  document.getElementById("sidebar-message").innerText = message;
  document.getElementById("sidebar-message").style.display = "block";
}
