import Logging from '../../src/services/logger.service';

describe('testing logger service', () => {
  test('should write info log to file', () => {
    let logging: any;
    try{
      logging = new Logging();
      logging.logger.info('testing'); 
    } catch(e) {
      fail('could not log to file: ' + e.message);
    }
    expect(logging).toBeInstanceOf(Logging);
  });
});