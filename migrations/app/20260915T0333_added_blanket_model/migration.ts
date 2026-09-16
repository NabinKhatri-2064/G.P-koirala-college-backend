#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/01e7dfa3b744c0956cec7ad65fb00a345fb51f8b3fd79debb461c3c45ebf902e/contract';
import startContract from '../../snapshots/01e7dfa3b744c0956cec7ad65fb00a345fb51f8b3fd79debb461c3c45ebf902e/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/98e88f0006c69e8d4b0ad9e98cdb0519bffb39a51875a78e0a66ed08386f3890/contract';
import endContract from '../../snapshots/98e88f0006c69e8d4b0ad9e98cdb0519bffb39a51875a78e0a66ed08386f3890/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'blanket',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
