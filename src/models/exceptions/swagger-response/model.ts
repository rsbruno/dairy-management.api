export class IApiDocMethodConfigs<T = {}> {
  description: string;
  isArray?: boolean;
  isPublic?: boolean;
  responseModel?: T;
}
