function getDiffBetween(oldArray, newArray){
    const oldIds = new Set(oldArray.map(item => item.id));
    const newIds = new Set(newArray.map(item => item.id));
    const removedIds = difference(oldIds, newIds);
    const addedIds = difference(newIds, oldIds);

    const removedItems = [...removedIds].map(id => ({id}));
    const addedItems = [...addedIds]
        .map(id => newArray.find(element => element.id == id));
    const remainingNewItems = newArray
        .filter(item => !removedIds.has(item.id) && !addedIds.has(item.id));
    const remainingOldItems = oldArray
        .filter(item => !removedIds.has(item.id) && !addedIds.has(item.id));

    const diffArray = removedItems
        .reduce(addToDiffList.bind(null, "REMOVE"), []);

    remainingNewItems.reduce((diffArray, remainingNewItem) => {
        const matchedOldItem = remainingOldItems
            .find(remainingOldItem => remainingOldItem.id == remainingNewItem.id);
        const differences = diffObjects(matchedOldItem, remainingNewItem);
        if (differences){
            addToDiffList("CHANGE", diffArray, differences);
        }
        return diffArray;
    }, diffArray);

    return addedItems
        .reduce(addToDiffList.bind(null, "ADD"), diffArray)
        .sort((a, b) => +a.id - +b.id);
}

function diffObjects(firstObject, secondObject){
    const diffObject = Object.getOwnPropertyNames(firstObject)
        .reduce((diffObject, property) => {
            if (firstObject[property] !== secondObject[property]){
                diffObject[property] = secondObject[property];
            }
            return diffObject;
        }, {
            id: firstObject.id
        });;
    return Object.keys(diffObject).length > 1 ? diffObject : null;
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
    difference,
    diffObjects
};
