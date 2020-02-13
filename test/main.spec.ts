import main from '../src/main';
import Logger from '../src/services/logger.service';
import ProcessStatus from '../src/interfaces/process-status.interface';

const logging = new Logger();

describe('testing main functionality', () => {

  test('should show that 2 records failed due to invalid mac address format (might be 3 from randomized response)', done => {
    main('./csv/input.csv', logging).then((data: ProcessStatus) => {
      if(data!.failedUpdates!.length < 2 || data!.failedUpdates!.length > 3){
        fail('the failed updates do not match the expected');
      }
      done();
    })
  });  
  
  test('should return errors for all records', done => {
    main('./csv/input1.csv', logging).then((data: ProcessStatus) => {
      if(data!.errors!.length < 13 ){
        fail('the error count does not match the expected');
      }
      done();
    })
  });

});