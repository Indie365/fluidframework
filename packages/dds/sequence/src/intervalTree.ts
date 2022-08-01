/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    IIntegerRange,
    RBNode,
    IRBAugmentation,
    IRBMatcher,
    RedBlackTree,
    ConflictAction,
    RBNodeActions,
} from "@fluidframework/merge-tree";
import { ISequencedDocumentMessage } from "@fluidframework/protocol-definitions";

export interface AugmentedIntervalNode {
    minmax: IInterval;
}

export const integerRangeToString = (range: IIntegerRange) => `[${range.start},${range.end})`;

export interface IInterval {
    clone(): IInterval;
    compare(b: IInterval): number;
    compareStart(b: IInterval): number;
    compareEnd(b: IInterval): number;
    modify(
        label: string,
        start: number | undefined,
        end: number | undefined,
        op?: ISequencedDocumentMessage
    ): IInterval | undefined;
    overlaps(b: IInterval): boolean;
    union(b: IInterval): IInterval;
}

const intervalComparer = (a: IInterval, b: IInterval) => a.compare(b);

export type IntervalNode<T extends IInterval> = RBNode<T, AugmentedIntervalNode>;

export type IntervalConflictResolver<TInterval> = (a: TInterval, b: TInterval) => TInterval;

export class IntervalTree<T extends IInterval> implements IRBAugmentation<T, AugmentedIntervalNode>,
    IRBMatcher<T, AugmentedIntervalNode> {
    public intervals = new RedBlackTree<T, AugmentedIntervalNode>(intervalComparer, this);

    public remove(x: T) {
        this.intervals.remove(x);
    }

    public removeExisting(x: T) {
        this.intervals.removeExisting(x);
    }

    public put(x: T, conflict?: IntervalConflictResolver<T>) {
        let rbConflict: ConflictAction<T, AugmentedIntervalNode> | undefined;
        if (conflict) {
            rbConflict = (key: T, currentKey: T) => {
                const ival = conflict(key, currentKey);
                return {
                    key: ival,
                };
            };
        }
        this.intervals.put(x, { minmax: x.clone() }, rbConflict);
    }

    public map(fn: (x: T) => void) {
        const actions: RBNodeActions<T, AugmentedIntervalNode> = {
            infix: (node) => {
                fn(node.key);
                return true;
            },
            showStructure: true,
        };
        this.intervals.walk(actions);
    }

    public mapUntil(fn: (X: T) => boolean) {
        const actions: RBNodeActions<T, AugmentedIntervalNode> = {
            infix: (node) => {
                return fn(node.key);
            },
            showStructure: true,
        };
        this.intervals.walk(actions);
    }

    public mapBackward(fn: (x: T) => void) {
        const actions: RBNodeActions<T, AugmentedIntervalNode> = {
            infix: (node) => {
                fn(node.key);
                return true;
            },
            showStructure: true,
        };
        this.intervals.walkBackward(actions);
    }

    // TODO: toString()
    public match(x: T) {
        return this.intervals.gather(x, this);
    }

    public matchNode(node: IntervalNode<T> | undefined, key: T) {
        return !!node && node.key.overlaps(key);
    }

    public continueSubtree(node: IntervalNode<T> | undefined, key: T) {
        return !!node && node.data.minmax.overlaps(key);
    }

    public update(node: IntervalNode<T>) {
        if (node.left && node.right) {
            node.data.minmax = node.key.union(
                node.left.data.minmax.union(node.right.data.minmax));
        } else {
            if (node.left) {
                node.data.minmax = node.key.union(node.left.data.minmax);
            } else if (node.right) {
                node.data.minmax = node.key.union(node.right.data.minmax);
            } else {
                node.data.minmax = node.key.clone();
            }
        }
    }
}