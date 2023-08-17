var express = require('express');
var router = express.Router();
const { Scan, PutItem, GetItem } = require('../controllers/dynamo')
/* GET users listing. */
// {
//     "TableName": "tasks",
    // ScanFilter: {
        //     '<AttributeName>': {
            //       ComparisonOperator: EQ | NE | IN | LE | LT | GE | GT | BETWEEN | NOT_NULL | NULL | CONTAINS | NOT_CONTAINS | BEGINS_WITH, /* required */
            //       AttributeValueList: [
                //         someValue /* "str" | 10 | true | false | null | [1, "a"] | {a: "b"} */,
                //         /* more items */
                //       ]
                //     },
            // }
router.get('/', async (req, res, next) => {
    console.log(req.query);
    var params = { TableName: 'tasks', ScanFilter: {} };
    for (key in req.query) {
        params.ScanFilter[key] = {ComparisonOperator: 'EQ', AttributeValueList: [req.query[key]]}
    }
    console.log(JSON.stringify(params, null, 2));
    const response = await Scan(params);
    res.send(response)
})

router.get('/task/:id', async (req, res, next) => {
    console.log('i am in task api and my id is', req.params.id)
    var params = {
        TableName: 'tasks', 
        Key: {
            id: req.params.id
        }
    };
    const task = await GetItem(params)
    res.send(task);
});


router.post('/task', async (req, res, next)=>{
    console.log('here is our form data', req.body)
    console.log('here is my formdata', req.body);
    var record = JSON.parse(JSON.stringify(req.body))
    record.id = Date.now().toString()
    var params = {
      TableName: 'tasks',
      Item: record
    }
    // checking our parameters
    console.log('this is what we are trying to post', params)
    var tmp = await PutItem(params)
    console.log('This item should have been inserted')
    res.redirect('/tasks')
});

router.post('/updatetask', async(req, res, next)=>{
    console.log('here are my parameters', req.body)
    var params = {
        TableName: 'tasks',
        Item: req.body
    };
    await PutItem(params);
    res.redirect('/tasks')
})
module.exports = router;
