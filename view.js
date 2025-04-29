exports.templates = {
    simple: (message) => `<div style="font-family: Arial, sans-serif;">${message}</div>`,
    welcome: (name) => `<div style="font-family: Arial, sans-serif;">Welcome ${name}!</div>`
  };
  
  exports.htmlPages = {
    emailForm: () => `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Send Email</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          h1 { color: #333; }
          label { display: block; margin-top: 10px; }
          input, textarea { width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
          button { background: #4CAF50; color: white; border: none; padding: 10px 15px; margin-top: 10px; cursor: pointer; border-radius: 4px; }
          button:hover { background: #45a049; }
          .result { margin-top: 20px; padding: 10px; border-radius: 4px; }
          .success { background-color: #d4edda; color: #155724; }
          .error { background-color: #f8d7da; color: #721c24; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Send Email</h1>
          <form id="emailForm">
            <label for="to">To:</label>
            <input type="email" id="to" name="to" required>
            
            <label for="subject">Subject:</label>
            <input type="text" id="subject" name="subject" required>
            
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="6" required></textarea>
            
            <button type="submit">Send Email</button>
          </form>
          <div id="result" class="result" style="display: none;"></div>
        </div>
        
        <script>
          document.getElementById('emailForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const to = document.getElementById('to').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            try {
              const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ to, subject, message }),
              });
              
              const result = await response.json();
              const resultDiv = document.getElementById('result');
              
              if (result.success) {
                resultDiv.textContent = 'Email sent successfully!';
                resultDiv.className = 'result success';
              } else {
                resultDiv.textContent = 'Error sending email: ' + result.error;
                resultDiv.className = 'result error';
              }
              
              resultDiv.style.display = 'block';
            } catch (error) {
              const resultDiv = document.getElementById('result');
              resultDiv.textContent = 'Error: ' + error.message;
              resultDiv.className = 'result error';
              resultDiv.style.display = 'block';
            }
          });
        </script>
      </body>
      </html>
    `
  };
  