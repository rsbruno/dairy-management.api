export class IApiDocMethodConfigs<T = any> {
  description: string;
  isArray?: boolean;
  isPublic?: boolean;
  responseModel?: T;
}
