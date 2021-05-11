/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */

const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
const _ = require('underscore');

let NpcModel = {};
// const { Npc } = models;

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const NpcSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName,
    },
    sex: {
        type: String,
        required: true,
    },
    career: {
        type: String,
        required: true,
    },
    race: {
        type: String,
        required: true,
    },
    personality: {
        type: String,
        required: true,
    },
    blood: {
        type: Number,
        required: true,
    },
    mana: {
        type: Number,
        required: true,
    },
    strength: {
        type: Number,
        required: true,
    },
    spellpower: {
        type: Number,
        required: true,
    },
    speed: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});


NpcSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    sex: doc.sex,
    career: doc.career,
    race: doc.race,
    personality: doc.personality,
    blood: doc.blood,
    mana: doc.blood,
    strength: doc.strength,
    spellpower: doc.spellpower,
    speed: doc.speed,
});
NpcSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };
    return NpcModel.find(search).select('name sex career race personality blood mana strength spellpower speed').lean().exec(callback);
};

NpcSchema.statics.findAndDelete = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };

    return NpcModel.deleteOne(search).exec(callback);
};
NpcModel = mongoose.model('Npc', NpcSchema);
module.exports.NpcModel = NpcModel;
module.exports.NpcSchema = NpcSchema;