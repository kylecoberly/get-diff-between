function getDiffBetween(oldArray, newArray){
    oldIds = new Set(oldArray.map(item => item.id));
    newIds = new Set(newArray.map(item => item.id));
    const removals = difference(oldIds, newIds);
    const additions = difference(newIds, oldIds);
    const addedItems = [...additions].map(id => newArray.find(element => element.id == id));

    const diffArray = [...removals].reduce((diffArray, removalId) => {
        addRemoval(diffArray, removalId);
        return diffArray;
    }, []);

    return addedItems.reduce((diffArray, item) => {
        addAddition(diffArray, item);
        return diffArray;
    }, diffArray);
}

function difference(minuend, subtrahend){
    return new Set([...minuend].filter(element => !subtrahend.has(element)));
}

function addRemoval(array, id){
    array.push({
        type: "REMOVE",
        id: id
    });
    return array;
}

function addAddition(array, item){
    array.push(Object.assign({
        type: "ADD",
    }, item));
    return array;
}

module.exports = {
    getDiffBetween,
    difference
};
