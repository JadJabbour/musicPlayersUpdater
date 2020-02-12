import Logging from '../../src/services/logger.service';
import Log from 'simple-node-logger';

describe('testing logger service', () => {
  test('should write info log to file', () => {
    const logging = new Logging();
    logging.logger.info('testing'); 

    expect(logging).toBeInstanceOf(Logging)
  });
});