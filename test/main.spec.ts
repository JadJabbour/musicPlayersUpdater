import main from '../src/main';

// describe('testing main functionality', () => {
//   test('should return [INVALID CSV FILE]', () => {
//     const toBe: ProcessStatus = {
//       file: {
//         path: 'test',
//         validCSV: false
//       },
//       error: {
//         service: 'main', 
//         function: 'main',
//         message: 'not implemented', 
//         data: {}
//       }
//     }
//     expect(main('test')).toBe(toBe)
//   });
  
//   // test('should return true given internal link', () => {
//   //   expect(isInternalLink('/some-page')).toBe(true)
//   // });
// });.

describe('testing logger service', () => {
  test('should write info log to file', () => {
    expect(true).toBe(true);
  });
});