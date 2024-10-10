import { Web5 } from '@web5/api';

const password = 'correct horse battery staple';
const dwnEndpoints = ['http://localhost:3000'];
const recordIds = [
  'bafyreihw5fhgeyzbp43xftv74sdymlf2y73cbjvflzlzuqfk7tzm4soju4',
  'bafyreiawphshjotzyr6cqjf4pcsb67fzwdiwm447mwpo4pjkg5vijqt6rq',
  'bafyreib3ktthhum777m2wjmldut2xapxqbimwoxbh2qituykgjx5itfatu',
  'bafyreig6dof5gd76jsrk7c5evlhwasr5eqn7tlr7cdxiwp7rbo2mk6hkei',
  'bafyreig6pbgyzkcrjw6ycgckjmcjcqcbh6cttmwct2mgubqc5xq6std7ei',
  'bafyreifz5b6nzx5sigztjxogsj3w6judbd37aprbgweefpcm3xy6ixgntq',
];
const { web5, did } = await Web5.connect({
  password,
  sync             : '30s',
  techPreview      : { dwnEndpoints },
  didCreateOptions : { dwnEndpoints }
});
console.log('web5Connect => did', did);
const deletes = await Promise.all(recordIds.map(async (recordId) => {
  return await web5.dwn.records.delete({
    from    : did,
    message : { recordId }
  });
}));
console.log('Records deleted:', deletes);