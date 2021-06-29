const { app } = require('./app');

let port = 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
