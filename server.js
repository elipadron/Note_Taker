const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
