import { authguard } from './auth.guard.js';

describe('authguard', () => {
  it('should be defined', () => {
    expect(new authguard()).toBeDefined();
  });
});
