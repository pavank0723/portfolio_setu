import { CatCount } from "../models";

export const getNextSequenceValue = async (sequenceName) => {
    var sequenceDocument = await CatCount.findAndModify({
        query: { id: sequenceName },
        update: { $inc: { seq: 1 } },
        new: true
    });
    return sequenceDocument.sequence_value;
}