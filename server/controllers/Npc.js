/* eslint-disable linebreak-style */
/* eslint-disable indent */
const models = require('../models');

const npcName = ['Jacob', 'Ryan', 'Jae', 'Sean', 'Brad', 'Cullen', 'Oliver', 'Jonathan', 'Jared', 'Tom', 'Kippy', 'David', 'John', 'Frank'];
const npcSex = ['male', 'female'];
const npcCareer = ['warrior', 'rogue', 'priest', 'mage', 'shaman', 'hunter', 'dryad', 'paladin', 'warlock'];
const npcRace = ['Draenei', ' Dwarf', 'Gnome', 'Human', 'Night Elf', 'Worgen', 'Void Elf', 'Lightforged', 'Dark Iron', 'Kul Tiran',
    'Mechagnon', 'Pandaren', 'Blood Elf', 'Goblin', 'Orc', 'Tauren', 'Troll', 'Undead', 'NightBorne', 'Nighmount', "Mag'har", 'Zandalari',
    'Vulpera',
];
const npcPersonality = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];

const {
    Npc,
} = models;


const makeNpc = (req, res) => {
    if (!req.body.name || !req.body.age || !req.body.sex) {
        const npcData = {
            name: npcName[Math.floor(Math.random() * npcName.length)],
            sex: npcSex[Math.floor(Math.random() * npcSex.length)],
            career: npcCareer[Math.floor(Math.random() * npcCareer.length)],
            race: npcRace[Math.floor(Math.random() * npcRace.length)],
            personality: npcPersonality[Math.floor(Math.random() * npcPersonality.length)],
            blood: Math.floor(Math.random() * 100),
            mana: Math.floor(Math.random() * 100),
            strength: Math.floor(Math.random() * 100),
            spellpower: Math.floor(Math.random() * 100),
            speed: Math.floor(Math.random() * 100),
            owner: req.session.account._id,
        };
        const newNpc = new Npc.NpcModel(npcData);
        const npcPromise = newNpc.save();
        npcPromise.then(() => res.json({
            redirect: '/maker',
        }));
        npcPromise.catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                return res.status(400).json({
                    error: 'Npc already exists.',
                });
            }
            return res.status(400).json({
                error: 'An error occurred ',
            });
        });
        return npcPromise;
    }
    const npcData = {
        name: req.body.name,
        sex: req.body.sex,
        career: req.body.career,
        race: req.body.race,
        personality: req.body.personality,
        blood: req.body.blood,
        mana: req.body.blood,
        strength: req.body.strength,
        spellpower: req.body.spellpower,
        speed: req.body.speed,
        owner: req.session.account._id,
    };
    const newNpc = new Npc.NpcModel(npcData);
    const npcPromise = newNpc.save();
    npcPromise.then(() => res.json({
        redirect: '/maker',
    }));
    npcPromise.catch((err) => {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({
                error: 'Npc already exists.',
            });
        }
        return res.status(400).json({
            error: 'An error occurred ',
        });
    });
    return npcPromise;
};

const makerPage = (req, res) => {
    Npc.NpcModel.findByOwner(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Am error occurred',
            });
        }

        return res.render('app', {
            csrfToken: req.csrfToken(),
            npcs: docs,
        });
    });
};


const getNpcs = (request, response) => {
    const req = request;
    const res = response;
    return Npc.NpcModel.findByOwner(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: 'An error occurred'
            });
        }
        return res.json({
            npcs: docs
        });
    });
};

const deleteNpc = (request, response) => {
    const req = request;
    const res = response;

    return Npc.NpcModel.findAndDelete(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: 'An error occurred',
            });
        }
        return res.json({
            npcs: docs,
        });
    });
};

module.exports.makerPage = makerPage;
module.exports.getNpcs = getNpcs;
module.exports.make = makeNpc;
module.exports.deleteNpc = deleteNpc;