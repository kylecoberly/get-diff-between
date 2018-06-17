const {deepEqual} = require("assert");
const {getDiffBetween} = require("../index");

describe("#getDiffBetween", () => {
    it("returns an empty array if both lists are empty", () => {
        const list = [];
        const updatedList = [];
        deepEqual(getDiffBetween(list, updatedList), []);
    });
    xit("returns an empty array if two arrays are equal", () => {
        const list = [{
            id: 1,
            name: "Kyle"
        }];
        const updatedList = [{
            id: 1,
            name: "Kyle"
        }];
        deepEqual(getDiffBetween(list, updatedList), []);
    });
    xit("detects an addition", () => {
        const list = [{
            id: 2,
            name: "Kyle"
        }];
        const updatedList = [];
        deepEqual(getDiffBetween(list, updatedList), [{
            type: "ADD",
            id: 2
        }]);
    });
    xit("detects an addition", () => {
        const list = [];
        const updatedList = [{
            id: 1,
            name: "Kyle"
        }];
        deepEqual(getDiffBetween(list, updatedList), [{
            type: "REMOVE",
            id: 1
        }]);
    });
    xit("detects a change", () => {
        const list = [{
            id: 1,
            name: "Kyle"
        }];
        const updatedList = [{
            id: 1,
            name: "Elyse"
        }];
        deepEqual(getDiffBetween(list, updatedList), [{
            type: "CHANGE",
            id: 1,
            name: "Elyse"
        }]);
    });
    xit("lists the changes between two arrays of objects", () => {
        const list = [{
            id       : 1,
            name     : "Barbara",
            quantity : 3,
        },{
            id       : 2,
            name     : "Tom",
            quantity : 0,
        },{
            id       : 3,
            name     : "Sam",
            quantity : 1,
        }];

        const updatedList = [{
            // barb's name is changing
            id       : 1,
            name     : "Barb",
            quantity : 3,
        },{
            // sam's quantity is changing
            quantity : 8,
            name     : "Sam",
            id       : 3,
        },{
            // tom has been deleted
            // nelson is being added
            name     : "Nelson",
            id       : 4,
            quantity : 6,
        }];

        deepEqual(getDiffBetween(list, updatedList), [{
            type     : "CHANGE",
            id       : 1,
            name     : "Barb",
        },{
            type     : "REMOVE",
            id       : 2,
        },{
            type     : "CHANGE",
            id       : 3,
            quantity : 8,
        },{
            type     : "ADD",
            id       : 4,
            name     : "Nelson",
            quantity : 6,
        }]);
    });
});
