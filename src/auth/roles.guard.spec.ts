import { roleguard } from './roles.guard.js';

describe('roleguard', () => {
  it('should be defined', () => {
    expect(new roleguard()).toBeDefined();
  });
});
