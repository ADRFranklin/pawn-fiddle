import './common/env';
import Server from './common/express';
import './common/socket';

export default Server.listen(process.env.PORT || 4000);
