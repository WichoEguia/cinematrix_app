export class Asientos {
    public sala: any = [
        [
            {
                id: 1,
                val: 1,
                letter: 'a',
                seat: false
            }, {
                id: 2,
                val: 2,
                letter: 'a',
                seat: true
            }, {
                id: 3,
                val: 3,
                letter: 'a',
                seat: true
            }, {
                id: 4,
                val: 4,
                letter: 'a',
                seat: false
            }, {
                id: 5,
                val: 5,
                letter: 'a',
                seat: false
            }, {
                id: 6,
                val: 6,
                letter: 'a',
                seat: false
            }
        ],
        [
            {
                id: 7,
                val: 1,
                letter: 'b',
                seat: false
            }, {
                id: 8,
                val: 2,
                letter: 'b',
                seat: false
            }, {
                id: 9,
                val: 3,
                letter: 'b',
                seat: false
            }, {
                id: 10,
                val: 4,
                letter: 'b',
                seat: false
            }, {
                id: 11,
                val: 5,
                letter: 'b',
                seat: false
            }, {
                id: 12,
                val: 6,
                letter: 'b',
                seat: false
            }
        ],
        [
            {
                id: 13,
                val: 1,
                letter: 'c',
                seat: false
            }, {
                id: 14,
                val: 2,
                letter: 'c',
                seat: false
            }, {
                id: 15,
                val: 3,
                letter: 'c',
                seat: false
            }, {
                id: 16,
                val: 4,
                letter: 'c',
                seat: false
            }, {
                id: 17,
                val: 5,
                letter: 'c',
                seat: false
            }, {
                id: 18,
                val: 6,
                letter: 'c',
                seat: false
            }
        ],
        [
            {
                id: 19,
                val: 1,
                letter: 'd',
                seat: false
            }, {
                id: 20,
                val: 2,
                letter: 'd',
                seat: false
            }, {
                id: 21,
                val: 3,
                letter: 'd',
                seat: false
            }, {
                id: 22,
                val: 4,
                letter: 'd',
                seat: true
            }, {
                id: 23,
                val: 5,
                letter: 'd',
                seat: true
            }, {
                id: 24,
                val: 6,
                letter: 'd',
                seat: false
            }
        ]
    ];

    constructor() {}

    getSala() {
        return this.sala;
    }
}