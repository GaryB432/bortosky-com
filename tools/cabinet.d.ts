/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Bortoskys' Filing Cabinet Schema
 */
export interface Schema {
  hangingFolders?: {
    id?: string;
    description?: string;
    content?: {
      folder: Folder | string;
    }[];
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}
export interface Folder {
  description?: string;
  content?: (Document | string)[];
}
export interface Document {
  description: string;
  date?: string;
}
