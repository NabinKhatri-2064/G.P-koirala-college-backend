#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/01e7dfa3b744c0956cec7ad65fb00a345fb51f8b3fd79debb461c3c45ebf902e/contract';
import endContract from '../../snapshots/01e7dfa3b744c0956cec7ad65fb00a345fb51f8b3fd79debb461c3c45ebf902e/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/b12c709501135f320bb10b012aa20f703f3116bce774b5dc022b6096cf36a0d9/contract';
import startContract from '../../snapshots/b12c709501135f320bb10b012aa20f703f3116bce774b5dc022b6096cf36a0d9/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'news', column: 'headline' }),
      this.addColumn({
        schema: 'public',
        table: 'news',
        column: col('category', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-news-category', {
        check: () => placeholder('backfill-news-category:check'),
        run: () => placeholder('backfill-news-category:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'news', column: 'category' }),
      this.addColumn({
        schema: 'public',
        table: 'news',
        column: col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-news-description', {
        check: () => placeholder('backfill-news-description:check'),
        run: () => placeholder('backfill-news-description:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'news', column: 'description' }),
      this.addColumn({
        schema: 'public',
        table: 'news',
        column: col('title', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-news-title', {
        check: () => placeholder('backfill-news-title:check'),
        run: () => placeholder('backfill-news-title:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'news', column: 'title' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
