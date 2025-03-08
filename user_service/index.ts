const express = require('express');
const app = express();
const PORT = 5000;

// Health check endpoint
app.get('/health', (req: any, res: any) => {
  res.status(200).json({
    status: 'ok',
    message: 'The server is up and running!',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, (error: any) => {
  if (!error)
    console.log(
      'Server is Successfully Running, and App is listening on port ' + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
