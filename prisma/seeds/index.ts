import { seedOccupations } from './occupations.seed';
import { seedFarms } from './farms.seed';

async function main() {
  seedOccupations();
  seedFarms();
}
main();
