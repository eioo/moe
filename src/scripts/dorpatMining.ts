import { player } from '../lib/player';
import { world } from '../lib/world';
import { ScriptBase } from './shared/scriptBase';

export class DorpatMiningScript extends ScriptBase {
  getAction() {
    if (current_map === 0) {
      if (player.inventory.isFull() && player.pet.isFull()) {
        if (player.atPosition(83, 37)) {
          return this.depositItems;
        }

        return this.walkToBank;
      }

      return this.walkToMine;
    }

    if (current_map === 1) {
      if (player.inventory.isFull() && player.pet.isFull()) {
        return this.walkToOverWorld;
      }

      if (player.atPosition(67, 15)) {
        return this.startMining;
      }

      return this.walkToMiningSpot;
    }

    return this.stop;
  }

  walkToMine = async () => {
    this.currentAction = 'Walking to mine';
    await player.moveTo(66, 30);
    await world.useTeleportNear();
  };

  walkToMiningSpot = async () => {
    this.currentAction = 'Walking to mining spot';
    await player.moveTo(69, 15);
    await this.sleep(500, 1500);
    await player.moveTo(67, 15);
  };

  startMining = async () => {
    this.currentAction = 'Mining';
    await player.useSkill(67, 15);
    await player.inventory.waitUntilFull();
    await player.pet.load();
    await player.useSkill(67, 15);
    await player.inventory.waitUntilFull();
  };

  walkToOverWorld = async () => {
    this.currentAction = 'Walking to overworld';
    await player.moveTo(69, 15);
    await this.sleep(500, 1500);
    await player.moveTo(67, 29);
    await world.useTeleportNear();
  };

  walkToBank = async () => {
    this.currentAction = 'Walking to bank';
    await player.moveTo(83, 37);
  };

  depositItems = async () => {
    this.currentAction = 'Depositing items';
    await world.chest.open(83, 38);
    await world.chest.depositAll();
    await this.sleep(3000, 7000);
  };
}
