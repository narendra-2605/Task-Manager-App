const router = require('express').Router();
const taskController = require('../controllers/task.controller');

router.get('/temp', async (req, res) => {
    res.send(await Todo.find());
});

router.post('/createTask', taskController.createTask);

router.get('/getAllTaskByUserId', taskController.getAllTaskByUserId);

router.post('/updateTask/:id', taskController.updateTask);

router.delete('/deleteTask/:id', taskController.deleteTask);


module.exports = router;