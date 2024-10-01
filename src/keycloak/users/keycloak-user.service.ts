import { IPersonsRolesGetDataDto, IUsersGetAllDto } from '@/domains/v1/identity/persons/dto/get/model.dto';
import { KeycloakUserRepository } from './keycloak-user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KeycloakUserService {
  constructor(private readonly keycloakUserRepository: KeycloakUserRepository) {}

  async findAssignedRoles(keycloakId: string): Promise<Array<IPersonsRolesGetDataDto>> {
    try {
      const { data: groups } = await this.keycloakUserRepository.findAssignedGroups(keycloakId);
      const [{ data }] = await Promise.all(
        groups.map(async (group) => await this.keycloakUserRepository.findAssignedRolesByGroup(group.id)),
      );
      if (!data && !data?.realmMappings) return [];
      return data?.realmMappings.map(
        (role) =>
          ({
            description: role.description,
            name: role.name,
            id: role.id,
          }) as IPersonsRolesGetDataDto,
      );
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<IUsersGetAllDto> {
    try {
      const { data } = await this.keycloakUserRepository.findById(id);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
