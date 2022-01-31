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
  $schema?: true;
  hangingFolders: {
    id?: string;
    description?: string;
    content?: (
      | Document
      | {
          folder?:
            | {
                description?: string;
                content?: Document[];
              }
            | string;
        }
    )[];
  }[];
  [k: string]: unknown;
}
export interface Document {
  subject: string;
  date?: string;
}
