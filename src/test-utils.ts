import { act } from 'react-dom/test-utils';

export async function executeAsync(): Promise<void> {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}
