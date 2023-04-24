import { EmailObfuscationPipe } from './email-obfuscation.pipe';

describe('EmailObfuscationPipe', () => {
  it('create an instance', () => {
    const pipe = new EmailObfuscationPipe();
    expect(pipe).toBeTruthy();
  });
});
