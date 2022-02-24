import { Provider } from 'styletron-react';
import { Client } from 'styletron-engine-atomic';

const client = new Client();
export default (story) => <Provider value={client}>{story()}</Provider> 