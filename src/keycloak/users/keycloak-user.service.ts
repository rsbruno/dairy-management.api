import { Injectable } from '@nestjs/common';

import { KeycloakUserRepository } from './keycloak-user.repository';

@Injectable()
export class KeycloakUserService {
  constructor(private readonly keycloakUserRepository: KeycloakUserRepository) {}

  async findAssignedRoles(keycloakId: string): Promise<Array<any>> {
    try {
      const { data: groups } = await this.keycloakUserRepository.findAssignedGroups(keycloakId);
      const [{ data }] = await Promise.all(
        groups.map(async group => await this.keycloakUserRepository.findAssignedRolesByGroup(group.id)),
      );
      if (!data && !data?.realmMappings) return [];
      return data?.realmMappings.map(
        role =>
          ({
            description: role.description,
            name: role.name,
            id: role.id,
          }) as any,
      );
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const { data } = await this.keycloakUserRepository.findById(id);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
