/**
 * 全局声明
 */

declare module "flo-utils" {
  export const getNodeByKeyValues: (collection: Array<any>, values: Array<string>, key: string, childrenKey?: string) => Array<any>
}

declare module '*.svg' {
  // const content: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  const content: any;
  export default content;
}
