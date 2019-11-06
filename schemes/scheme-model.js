const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    addScheme,
    update,
    remove,
};

function find(){
    return db('schemes');
}

function findById(id) {
    return db('schemes')
    .where('id', id)
    .first();
}

function findSteps(id) {
    return db('steps as st')
    .join('schemes as sc', 'st.scheme_id', 'sc.id')
    .select('st.id', 'sc.scheme_name', 'st.step_number', 'st.instructions')
    .where({ scheme_id: id })
}

function addScheme(scheme) {
    return db('schemes')
    .insert(scheme, 'id')
    .then(([id]) => {
        return findById(id);
    });
}

function add(step, scheme_id) {
    return (
        db('schemes')
      // .join("schemes as sc", "st.scheme_id", "sc.id")
      .insert(step, scheme_id)
    
    )
}

function update(changes, id) {
    return db('schemes')
    .update(changes)
    .where('id', id)
    .then(() => {
        return findById(id);
    })
}

function remove(id) {
    return db('schemes')
    .where({ id })
    .del();
}