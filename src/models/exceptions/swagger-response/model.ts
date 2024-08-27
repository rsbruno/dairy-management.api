export class IApiDocMethodConfigs<T = any> {
  description: string;
  responseModel?: T;
  isPublic?: boolean;
  isArray?: boolean;
}
