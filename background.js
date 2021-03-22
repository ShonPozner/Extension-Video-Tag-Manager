var debug = true;

chrome.runtime.onInstalled.addListener(({ reason, version }) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    installScreen(reason, version);
  }
});

// Click on icon..
chrome.action.onClicked.addListener((tab) => {
  showEditor(tab);
});

function showEditor(tab) {
  //------->Maybe: for get the url.. of the website if zoom, youytube and so on... then edit else go to web
  if (debug) 
    console.log("click on the icon...\n  from url :" + tab.url);
    // var url_encoded_url = encodeURIComponent(tab.url); //if want to use the url..

  chrome.windows.get(tab.windowId, { populate: true }, function (clickedWindow) {
    let idTabThatClicked = tab.id 

    if (debug)
        console.log("screan height: " + clickedWindow.height + "\nscrren width: " + clickedWindow.width);

    let widthScreenSize = clickedWindow.width;

    let heightEditorSize = parseInt(clickedWindow.height);
    let widthEditorSize = parseInt(widthScreenSize/2.5);
    // var l = parseInt(widthScreenSize - w);
    let offsetFromTop = 0;
    let offsetFromLeft = 0;

    if (debug) {
        console.log("Editor height: " + heightEditorSize + "\nEditor width: " + widthEditorSize);
        console.log("Editor Offset Top: " + offsetFromTop + "\nEditor Offset Left: " + widthScreenSize - widthEditorSize);
    }

    chrome.tabs.create(
      {
        url: chrome.runtime.getURL("edit.html"),
        active: false,
      },
      function (editTab) {
        // After the tab has been created, open a window to inject the tab
        chrome.windows.create({
          tabId: editTab.id,
          focused: true,
          height: heightEditorSize,
          width: widthEditorSize,
          top: offsetFromTop,
          left: widthScreenSize - widthEditorSize,
          type: "popup",
        });
      }
    );
    if (debug) {
        console.log()
        console.log("Video:");
        console.log("Video height: " + heightEditorSize + "\Video width: " + (widthScreenSize - widthEditorSize));
        console.log("Video Offset Top: " + offsetFromTop + "\nVideo Offset Left: " + (offsetFromLeft));
    }


    // create new window for the video
    chrome.windows.create(
      {
        tabId: idTabThatClicked,
        focused: false,
        height: heightEditorSize,
        width: widthScreenSize - widthEditorSize,
        top: offsetFromTop,
        left: offsetFromLeft,
        type: "popup"
      });
  });

  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id },
  //     function: getScreenSize
  //   }, ()=>{
  //   });
}

// ------->Maybe: create popup of install succ??
//need to check te paramters...
function installScreen(reason, version) {
  if (debug) {
    console.log("install the Extension");
  }
}

// function getScreenSize() {
//     // if (confirm('You want to start summarizing this video?'))
//     console.log(screen.height, screen.width)}

// Handle requests for passwords
function setPassword(password) {
  // Do something, eg..:
  console.log(password);
}
