// Write your "actions" router here!
const express = require('express')
const {checkCompletion, checkId} = require('./actions-middlware')
const Actions = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get('/:id',checkId,(req, res) => {
    res.status(200).json(req.action)
})


router.post('/',checkCompletion, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body)
        res.status(201).json(newAction)
    } catch (err) {
        next(err)
    }
})
router.put('/:id',checkCompletion, checkId, (req, res, next) => {
    Actions.update(req.params.id, { description: req.description,
        notes: req.notes, completed: req.completed, project_id: req.project_id })
        .then(() => {
            return Actions.get(req.params.id)
        })
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

router.delete('/:id',checkId, async (req, res, next) => {
    try{
        await Actions.remove(req.params.id)
        res.json(req.action)
    }catch(err){
        next(err)
    }
})

module.exports = router

