/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Contains a programatic API for generating {@link https://en.wikipedia.org/wiki/Markdown | Markdown} documentation
 * from an API report generated by {@link https://api-extractor.com/ | API-Extractor}.
 *
 * @remarks Akin to {@link https://github.com/microsoft/rushstack/tree/main/apps/api-documenter | API-Documenter} and
 * is heavily based upon it and uses it under the hood, but is designed to be more extensible and can be used
 * programatically.
 *
 * @packageDocumentation
 */

export {
    MarkdownDocumenterConfiguration,
    markdownDocumenterConfigurationWithDefaults,
} from "./Configuration";
export {
    DocAlert,
    DocAlertType,
    DocEmphasisSpan,
    DocHeading,
    DocList,
    DocNoteBox,
    DocTable,
    DocTableCell,
    DocTableRow,
    IDocAlertParameters,
    IDocHeadingParameters,
    IDocListParameters,
    ListKind,
} from "./doc-nodes";
export { Heading } from "./Heading";
export { Link } from "./Link";
export { loadModel } from "./LoadModel";
export { defaultConsoleLogger, Logger, LoggingFunction, verboseConsoleLogger } from "./Logging";
export { MarkdownDocument } from "./MarkdownDocument";
export { getDocumentItems, renderDocuments, renderFiles } from "./MarkdownDocumenter";
export {
    emitMarkdown,
    EmitterContext,
    EmitterOptions,
    MarkdownEmitter,
    maxHeadingLevel,
} from "./MarkdownEmitter";
export {
    DefaultPolicies,
    defaultPolicyOptions,
    DocumentBoundaries,
    FileNamePolicy,
    HeadingTitlePolicy,
    HierarchyBoundaries,
    LinkTextPolicy,
    PackageFilterPolicy,
    PolicyOptions,
    UriBaseOverridePolicy,
} from "./Policies";
export {
    DefaultRenderingPolicies,
    defaultRenderingPolicies,
    renderApiItemDocument,
    RenderApiItemWithChildren,
    RenderApiItemWithoutChildren,
    RenderingHelpers,
    RenderingPolicies,
    renderModelDocument,
    renderPackageDocument,
    RenderSectionWithInnerContent,
} from "./rendering";
export {
    ApiFunctionLike,
    ApiMemberKind,
    ApiModifier,
    ApiModuleLike,
    ApiSignatureLike,
    doesItemGenerateHierarchy,
    doesItemKindGenerateHierarchy,
    doesItemKindRequireOwnDocument,
    doesItemRequireOwnDocument,
    filterByKind,
    getAncestralHierarchy,
    getDefaultValueBlock,
    getDeprecatedBlock,
    getExampleBlocks,
    getFileNameForApiItem,
    getFilePathForApiItem,
    getFilteredParent,
    getFirstAncestorWithOwnDocument,
    getHeadingForApiItem,
    getHeadingIdForApiItem,
    getLinkForApiItem,
    getLinkUrlForApiItem,
    getModifiers,
    getQualifiedApiItemName,
    getReturnsBlock,
    getSeeBlocks,
    getThrowsBlocks,
    getUnscopedPackageName,
    isDeprecated,
    isOptional,
    isReadonly,
    isStatic,
    mergeSections,
} from "./utilities";

// Conveinence re-exports of API model types
export { ApiItem, ApiItemKind, ApiModel, ApiPackage } from "@microsoft/api-extractor-model";
