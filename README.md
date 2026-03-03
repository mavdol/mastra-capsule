# @capsule-run/mastra

Capsule integration for Mastra.

## What is this?

`@capsule-run/mastra` gives Mastra agents the ability to safely execute Python and JavaScript code in an isolated WebAssembly sandbox.

## Installation

```bash
npm install @capsule-run/mastra
```

## Usage

The package exposes two tools ready to be passed to any Mastra agent: `capsulePythonTool` and `capsuleJsTool`.

```typescript
import { Agent } from '@mastra/core/agent';
import { capsulePythonTool, capsuleJsTool } from '@capsule-run/mastra';

export const simpleAgent = new Agent({
  id: 'simple-agent',
  name: 'Simple Agent',
  instructions: 'You are a helpful assistant.',
  model: 'openai/gpt-4o',
  tools: {capsulePythonTool, capsuleJsTool},
});
```


## More information

Visit the [Capsule](https://github.com/mavdol/capsule) repository for more information.

## License

MIT
