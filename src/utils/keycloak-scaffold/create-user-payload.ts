import { generateSecret } from '../generate-random-string';

type ICredentialsProps = {
  temporary: boolean;
  value: string;
  type: string;
};

export interface ICreateUserProps {
  credentials: ICredentialsProps[];
  requiredActions: string[];
  emailVerified: boolean;
  firstName: string;
  enabled: boolean;
  lastName: string;
  username: string;
  groups: string[];
  email: string;
}

export const createUserTemplatePayload = (payload: Partial<ICreateUserProps>): ICreateUserProps => ({
  username: payload.email ?? payload.username,
  groups: payload.groups ?? [],
  firstName: payload.firstName,
  lastName: payload.lastName,
  emailVerified: false,
  email: payload.email,
  requiredActions: [],
  enabled: true,
  credentials: [
    {
      value: generateSecret(8, true),
      temporary: false,
      type: 'password',
    },
  ],
});
