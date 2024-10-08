import { IAuthAccessGetDto } from '@/domains/v1/identity/auth/dto/get/model.dto';
import { roles } from '../../src/configs/mapping-roles/index.roles';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import 'dotenv/config';

function getRolesAsArray(obj: Record<string, any>): { name: string; description: string }[] {
  let result: { name: string; description: string }[] = [];
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      if ('name' in obj[key] && 'description' in obj[key]) {
        result.push(obj[key]);
      } else {
        result = result.concat(getRolesAsArray(obj[key]));
      }
    }
  }
  return result;
}

async function seedRoles() {
  console.info('Criando roles...');
  try {
    const http = new HttpService();
    const {
      data: { access_token },
    } = await lastValueFrom(
      http.post<IAuthAccessGetDto>(
        `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_secret: 'khtMLYJ3SmKCaI41aEDaQcAom12aGUAm',
          username: 'johndoe@email.com',
          client_id: 'erp-milk-client',
          grant_type: 'password',
          password: '123456',
        }),
      ),
    );
    getRolesAsArray(roles).map(async (role) => {
      try {
        console.info(`Inserindo role: ${role.name}`);
        return await lastValueFrom(
          http.post(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/roles`, role, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }),
        );
      } catch (error) {}
    });
  } catch (error) {
    throw error;
  }
  console.info('Pronto!');
}

seedRoles();
