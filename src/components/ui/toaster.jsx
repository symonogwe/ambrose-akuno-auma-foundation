/* eslint-disable react-refresh/only-export-components */
import { createToaster, Toaster as ChakraToaster } from '@chakra-ui/react';

export const toaster = createToaster({
  placement: 'top',
  pauseOnPageIdle: true,
});

export const Toaster = () => <ChakraToaster toaster={toaster} />;
