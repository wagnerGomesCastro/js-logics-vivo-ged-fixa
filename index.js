import { arrayFilesFiltered } from './group-by-call';
import { filesToZipped, filesListBucket } from './filesBucket';

// ===============================================================
// group-by-call
// ===============================================================

//-----------------------------------------------------------
// const result = arrayFilesFiltered.reduce(function ( res, acc) {

//   const namefilezip = acc.split('_').slice(0, 2).join('_');

//   if (!res[namefilezip]) {
//     res[namefilezip] = {
//       files: [],
//     };
//   }

//   res[namefilezip].files.push(acc);
//   return res;
// },
// {});

// console.log(JSON.stringify(result, null, 4));

//-----------------------------------------------------------
// const result = arrayFilesFiltered.reduce(function (res, acc) {
//   const namefilezip = acc.split('_').slice(0, 2).join('_');

//   if (!res[namefilezip]) {
//     res[namefilezip] = [];
//   }

//   res[namefilezip].push(acc);
//   return res;
// }, {});

// console.log(JSON.stringify(Object.values(result), null, 4));

//-----------------------------------------------------------

// ===============================================================
// filesBucket
// ===============================================================

// console.log('filesToZipped', filesToZipped);
// console.log('filesListBucket', filesListBucket);

//----- [01] agrupar os prefixos filesToZipped
let groupByFilesToZipped = filesToZipped.reduce((res, acc) => {
  if (!res[acc.prefix]) {
    res[acc.prefix] = [];

    res[acc.prefix].push({ prefix: acc.prefix, last_indice: 0 });
  }

  return res;
}, {});

groupByFilesToZipped = Object.values(groupByFilesToZipped).flat();
console.log('groupByFilesToZipped', groupByFilesToZipped);
console.log(
  'groupByFilesToZipped',
  JSON.stringify(groupByFilesToZipped, null, 2)
);

/* // groupByFilesToZipped
  [
    {
      prefix: '301599_03012023',
      last_indice: 0,
    },
    {
      prefix: '4392402_03012023',
      last_indice: 0,
    },
  ];

*/

//----- [02]  verificar o maximo no buacket

const Key = '2023/01/03/ged_fixa_/301599_03012023_FIXA_3.zip';
console.log('opa2', Key.lastIndexOf('/' + '301599_03012023' + '_'));

let index = 0;

if (Array.isArray(filesListBucket) && filesListBucket.length > 0) {
  const numMax = filesListBucket.map(({ Key }) => {
    const namefilezip = Key.indexOf('/' + '301599_03012023' + '_');

    if (namefilezip > 0) {
      console.log('namefilezip 2', namefilezip);
      return Number(Key.replace(/^.*[_]/, '').replace('.zip', ''));
    }

    return '';
  });
  index = Math.max(...numMax);
}

console.log('index', index);

//----- [03] incrementar com  maximo ops proximos nos prefixos
