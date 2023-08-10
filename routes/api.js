var express = require('express');
var router = express.Router();
const {Scan} = require('../controller/dynamo')

// ScanFilter: {
//   '<AttributeName>': {
//     ComparisonOperator: EQ | NE | IN | LE | LT | GE | GT | BETWEEN | NOT_NULL | NULL | CONTAINS | NOT_CONTAINS | BEGINS_WITH, /* required */
//     AttributeValueList: [
//       someValue /* "str" | 10 | true | false | null | [1, "a"] | {a: "b"} */,
//       /* more items */
//     ]
//   },
//   /* '<AttributeName>': ... */
// }
/* GET users listing. */
router.get('/', async (req, res, next) => {
  console.log(req.query);
  var params = { TableName: 'tasks', ScanFilter: {} };
  for (key in req.query) {
    params.ScanFilter[key] = {ComparisonOperator: 'EQ', AttributeValueList: [req.query[key]]}
  }
  console.log(JSON.stringify(params, null, 2));
  const response = await Scan(params)
  res.send(response)
})

router.post('/task', async (req, res, next) => {
  console.log('form data', req.body)
})

module.exports = router;