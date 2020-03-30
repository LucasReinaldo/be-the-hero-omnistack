const genUniqueId = require('../../utils/genUniqueId')

describe('Generate Unique ID', () => {
    it('should generate an unique ID containing 12 characters.', () => {
        const id = genUniqueId();

        expect(id).toHaveLength(12);
    });
});