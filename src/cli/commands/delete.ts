// import { Web5 } from '@web5/api';

// const password = 'correct horse battery staple';
// const dwnEndpoints = ['http://localhost:3000'];
// const recordIds = [
//   'bafyreidhrty4m56da2gsiocldgxxwtxgprkg3v3nwn73cufmm776te4s7i',
//   'bafyreigffu5zjcgomwoc5kria6lme3lthfnwxlcv7v2neup73fvoelqnsm'
// ];
// const { web5, did } = await Web5.connect({
//   password,
//   sync             : '30s',
//   techPreview      : { dwnEndpoints },
//   didCreateOptions : { dwnEndpoints }
// });
// console.log('web5Connect => did', did);
// const deletes = await Promise.all(recordIds.map(async (recordId) => {
//   return await web5.dwn.records.delete({
//     from    : did,
//     message : { recordId }
//   });
// }));
// console.log('Records deleted:', deletes);