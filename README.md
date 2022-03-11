# stack-orchestrator

An easy way to manage the availability of multiple serverless stacks.

## Use case


This API helps to implement integration or e2e testing per feature branch.
It enables to request a stack for a specific branch, deploy the app on this stack, test on it, then release the stack for the next feature branch.

A `stack` is a group of ressources that could be identified by a string, its stack name.

If you use the serverless framework you can deploy your app for a specific stack using `serverless deploy --stage $stackName`.
Most of the ressources created will be marked with the `stackName`.

## Routes

[Postman documentation](https://documenter.getpostman.com/view/7409319/UVXeqxFz)

### Request stack

Gets an available stack, locks it and return its stack name and last deployed commit.

The returned stack is

1. one of the same branch if it exists and is available
2. the older stack available (based on the last requested date)
3. a new stack. The new stack name is `` `${prefix}${stacks.length + 1}` ``. Default prefix is `test-`

### Set last deployed commit

Save the last deployed commit of the stack.

### Release stack

Make the stack available.

### List stacks

Return the list of the stacks of the project.

```ts
type Stacks = {
  stackName: string; // ex: "test-1"
  lastDeployedCommit: string;
  isAvailable: boolean;
  branch: string;    // ex: "main"
  created: string;   // iso date, ex "2022-03-04T14:19:54.448Z"
  modified: string;  // iso date, ex "2022-03-04T14:19:54.448Z"
  entity: 'Stack';
}[]
```

### Delete last stack

Remove the last stack of the list of stacks.
The deleted stack will no more be returned by `requestStack` if another stack is available.
If no stack is available, the stack will be recreated by the `requestStack`.


## Authentication

This API uses `X-API-Key` header to authenticate. It should contain a valid project key.

## Project configuration

To use this API, ask for access at <corentind@theodo.fr>. The only configurable attribute is the `prefix` of the stack names. The default is `test-`.
