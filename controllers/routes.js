const Routes = require('../models').Routes;
// const Intersections = require('../models').Intersections;

module.exports = {
    /*
    list(req, res) {
        return Routes
            .findAll({
                include: [{
                    model: Intersections,
                    as: 'intersections'
                }],
                order: [
                    ['route_id', 'DESC'],
                    [{ model: Intersections, as: 'intersections' }, 'createdAt', 'DESC'],
                ],
            })
            .then((classrooms) => res.status(200).send(classrooms))
    .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Classroom
            .findById(req.params.id, {
                include: [{
                    model: Student,
                    as: 'students'
                }],
            })
            .then((classroom) => {
            if (!classroom) {
            return res.status(404).send({
                message: 'Classroom Not Found',
            });
        }
        return res.status(200).send(classroom);
    })
    .catch((error) => res.status(400).send(error));
    },
    */

    add(req, res) {
        return Routes
            .create({
                route_id: req.body.route_id
            })
            .then((route) => res.status(201).send(route))
    .catch((error) => res.status(400).send(error));
    },
    /*
    update(req, res) {
        return Classroom
            .findById(req.params.id, {
                include: [{
                    model: Student,
                    as: 'students'
                }],
            })
            .then(classroom => {
            if (!classroom) {
            return res.status(404).send({
                message: 'Classroom Not Found',
            });
        }
        return classroom
            .update({
                class_name: req.body.class_name || classroom.class_name,
            })
            .then(() => res.status(200).send(classroom))
    .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Classroom
            .findById(req.params.id)
            .then(classroom => {
            if (!classroom) {
            return res.status(400).send({
                message: 'Classroom Not Found',
            });
        }
        return classroom
            .destroy()
            .then(() => res.status(204).send())
    .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
    },
    */
};