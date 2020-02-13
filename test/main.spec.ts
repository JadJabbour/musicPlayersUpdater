import main from '../src/main';
import Logger from '../src/services/logger.service';

const logging = new Logger();

describe('testing main functionality', () => {

  test('should throw exception', done => {
    try{
      expect(main('./csv/test.csv', logging)).rejects.toThrow(Error);
    } catch(e) {

    }
  });

  // test('should throw exception [INVALID FILE]', done => {
  //   try{
  //     main('./csv/test.csv', logging).then(() => done());
  //   } catch(e) {

  //   }
  // });

  // test('should show that 2 records failed due to invalid mac address format', done => {
  //   main('./csv/input.csv', logging).then((data) => {
  //     //expect(data.failedUpdates.length).toBe(2);
  //     done();
  //   });
  // });

});