#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0ce379d5f02a386ba6ec8d674d703c5ba3996c4295b2d058f7ec1e75a1dd8185/contract';
import startContract from '../../snapshots/0ce379d5f02a386ba6ec8d674d703c5ba3996c4295b2d058f7ec1e75a1dd8185/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/b12c709501135f320bb10b012aa20f703f3116bce774b5dc022b6096cf36a0d9/contract';
import endContract from '../../snapshots/b12c709501135f320bb10b012aa20f703f3116bce774b5dc022b6096cf36a0d9/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'news',
        columns: [
          col('date', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('headline', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('image', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
