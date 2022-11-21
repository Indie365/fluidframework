## API Report File for "@fluid-tools/client-debug-view"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { IClient } from '@fluidframework/protocol-definitions';
import { IFluidClientDebugger } from '@fluid-tools/client-debugger';
import { default as React_2 } from 'react';
import { SharedObjectCore } from '@fluidframework/shared-object-base';

// @public
export interface AudienceMember {
    clients: Map<string, IClient>;
    userId: string;
}

// @public
export interface AudienceMemberViewProps {
    audienceMember: AudienceMember;
    myClientConnection: IClient | undefined;
    myClientId: string | undefined;
}

// @public
export function ClientDebugView(props: ClientDebugViewProps): React_2.ReactElement;

// @public
export interface ClientDebugViewProps extends HasClientDebugger, HasContainerId {
    renderOptions?: RenderOptions;
}

// @public
export const defaultRenderOptions: Required<RenderOptions>;

// @public
export const defaultSharedObjectRenderers: SharedObjectRenderOptions;

// @public
export function getRenderOptionsWithDefaults(userOptions: RenderOptions | undefined): Required<RenderOptions>;

// @public
export function getSharedObjectRendererOptionsWithDefaults(userOptions: SharedObjectRenderOptions | undefined): SharedObjectRenderOptions;

// @public
export interface HasClientDebugger {
    clientDebugger: IFluidClientDebugger;
}

// @public
export interface HasContainerId {
    containerId: string;
}

// @public
export type RenderChild = (childObject: unknown) => React_2.ReactElement;

// @public
export interface RenderOptions {
    onRenderAudienceMember?: (props: AudienceMemberViewProps) => React_2.ReactElement;
    sharedObjectRenderOptions?: SharedObjectRenderOptions;
}

// @public
export type RenderSharedObject = (sharedObject: SharedObjectCore, // TODO: is this the right type?
renderChild: RenderChild) => React_2.ReactElement;

// @public
export interface SharedObjectRenderOptions {
    [k: SharedObjectType]: RenderSharedObject;
}

// @public
export type SharedObjectType = string;

```