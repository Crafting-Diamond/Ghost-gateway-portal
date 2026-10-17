function launchGame(gameURL) {
    // Opens the blank window container
    var newTab = window.open("about:blank", "_blank");
    
    if (!newTab) {
        alert("Please allow pop-ups for this site to launch the program!");
        return;
    }

    // Modern way to inject the full-screen iframe code cleanly
    var codeToInject = `
      <!DOCTYPE html>
      <html style="margin:0;padding:0;overflow:hidden;height:100%;">
      <head>
          <title>Application Workspace</title>
      </head>
      <body style="margin:0;padding:0;overflow:hidden;height:100%;">
        <iframe src="${gameURL}" style="border:none;width:100vw;height:100vh;margin:0;padding:0;" allow="pointer-lock; fullscreen;"></iframe>
      </body>
      </html>
    `;
    
    newTab.document.write(codeToInject);
    newTab.document.close();
}
