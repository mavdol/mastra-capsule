import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { run } from '@capsule-run/sdk/runner';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SANDBOX_PY = join(__dirname, 'sandboxes', 'sandbox-py.wasm');
const SANDBOX_JS = join(__dirname, 'sandboxes', 'sandbox-js.wasm');

async function invokeSandbox(wasmFile: string, code: string): Promise<string> {
  const res = await run({ file: wasmFile, args: [code] });

  if (res.success) {
    return String(res.result ?? '');
  }

  throw new Error(res.error?.message ?? 'Capsule execution failed');
}

export const capsulePythonTool = createTool({
  id: 'python_repl',
  description:
    'Execute any Python code in a secure isolated WebAssembly sandbox. ' +
    'The last evaluated expression is returned as the result. ' +
    'End your code with an expression or return a value.',
  inputSchema: z.object({
    code: z.string().describe(
      'Python code to execute. End with an expression or return statement to get a value.'
    ),
  }),
  outputSchema: z.string().describe('The result of the executed code as a string'),
  execute: async ({ code }: { code: string }) => {
    return invokeSandbox(SANDBOX_PY, code);
  },
});

export const capsuleJsTool = createTool({
  id: 'javascript_repl',
  description:
    'Execute any JavaScript code in a secure isolated WebAssembly sandbox. ' +
    'The last evaluated expression is returned as the result. ' +
    'End your code with an expression or return a value.',
  inputSchema: z.object({
    code: z.string().describe(
      'JavaScript code to execute. End with an expression or return statement to get a value.'
    ),
  }),
  outputSchema: z.string().describe('The result of the executed code as a string'),
  execute: async ({ code }: { code: string }) => {
    return invokeSandbox(SANDBOX_JS, code);
  },
});
