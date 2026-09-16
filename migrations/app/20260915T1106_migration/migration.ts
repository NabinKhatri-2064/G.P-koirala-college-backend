#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0ce379d5f02a386ba6ec8d674d703c5ba3996c4295b2d058f7ec1e75a1dd8185/contract';
import endContract from '../../snapshots/0ce379d5f02a386ba6ec8d674d703c5ba3996c4295b2d058f7ec1e75a1dd8185/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/98e88f0006c69e8d4b0ad9e98cdb0519bffb39a51875a78e0a66ed08386f3890/contract';
import startContract from '../../snapshots/98e88f0006c69e8d4b0ad9e98cdb0519bffb39a51875a78e0a66ed08386f3890/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'blanket' }),
      this.dropTable({ schema: 'public', table: 'news' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
