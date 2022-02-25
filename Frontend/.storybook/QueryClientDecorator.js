import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();
export default (Story) => <QueryClientProvider client={client}><Story /></QueryClientProvider> 