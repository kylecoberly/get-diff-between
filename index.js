function getDiffBetween(oldArray, newArray){
    oldIds = new Set(oldArray.map(item => item.id));
    newIds = new Set(newArray.map(item => item.id));
    const removals = difference(oldIds, newIds);
    const additions = difference(newIds, oldIds);
    const removedItems = [...removals].map(id => ({id}));
    const addedItems = [...additions].map(id => newArray.find(element => element.id == id));

    const diffArray = removedItems.reduce(addToDiffList.bind(null, "REMOVE"), []);
    return addedItems.reduce(addToDiffList.bind(null, "ADD"), diffArray);
}

function addToDiffList(message, diffArray, item){
    diffArray.push(Object.assign({
        type: message
    }, item));
    return diffArray;
}

function difference(minuend, subtrahend){
    return new Set([...minuend].filter(element => !subtrahend.has(element)));
}

module.exports = {
    getDiffBetween,
    difference
};
