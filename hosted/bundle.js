"use strict";

/* eslint-disable quotes */

/* eslint-disable indent */
var csrfT;
var api = {
  key: "WEqRRNiZ_wRDx4_53JYqGcDa7XpU0c5Ayc40B4LonW4",
  base: "https://api.unsplash.com/search/photos/"
};

function searchPhotos(city) {
  var url = "".concat(api.base, "?query=").concat(city, "&client_id=").concat(api.key);
  return url;
}

var handleNpc = function handleNpc(e) {
  e.preventDefault();
  $("#npcMessage").animate({
    width: 'hide'
  }, 350);
  sendAjax('POST', $("#npcForm").attr("action"), $("#npcForm").serialize(), function () {
    loadNpcsFromServer();
  });
  return false;
};

var handleDelete = function handleDelete(e) {
  e.preventDefault();
  sendAjax("DELETE", $("#deleteForm").attr("action"), $("#deleteForm").serialize(), function () {
    loadNpcsFromServer();
  });
  return false;
};

var handleUpdate = function handleUpdate(e) {
  e.preventDefault();
  $("#serverMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#pass").val() == '' || $("#newPass").val() == '' || $("#newPass2").val() == '') {
    handleError("All fields are required.");
    return false;
  }

  if ($("#newPass").val() !== $("#newPass2").val()) {
    handleError("Passwords do not match.");
    return false;
  }

  sendAjax('POST', $("#updateForm").attr("action"), $("#updateForm").serialize(), redirect);
  return false;
};

var NpcForm = function NpcForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "npcForm",
    onSubmit: handleNpc,
    name: "npcForm",
    action: "/maker",
    method: "POST",
    className: "npcForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "npcName",
    type: "text",
    name: "name",
    placeholder: "Npc Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "sex"
  }, "Sex: "), /*#__PURE__*/React.createElement("input", {
    mid: "npcSex",
    type: "text",
    name: "sex",
    placeholder: "Npc Sex"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "career"
  }, "Career: "), /*#__PURE__*/React.createElement("input", {
    mid: "npcCareer",
    type: "text",
    name: "career",
    placeholder: "Npc Career"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "race"
  }, "Race: "), /*#__PURE__*/React.createElement("input", {
    mid: "npcRace",
    type: "text",
    name: "race",
    placeholder: "Npc Race"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "personality"
  }, "Personality: "), /*#__PURE__*/React.createElement("input", {
    mid: "npcPersonality",
    type: "text",
    name: "personality",
    placeholder: "Npc Personality"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    htmlFor: "blood"
  }, "blood: "), /*#__PURE__*/React.createElement("input", {
    mid: "npcBlood",
    type: "number",
    name: "blood",
    placeholder: "Npc Blood"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "mana"
  }, "Mana: "), /*#__PURE__*/React.createElement("input", {
    mid: "npcMana",
    type: "number",
    name: "mana",
    placeholder: "Npc Mana"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "strength"
  }, "Strength: "), /*#__PURE__*/React.createElement("input", {
    mid: "npcStrength",
    type: "number",
    name: "strength",
    placeholder: "Npc Strength"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "spellpower"
  }, "Spellpower: "), /*#__PURE__*/React.createElement("input", {
    mid: "npcSpellpower",
    type: "number",
    name: "spellpower",
    placeholder: "Npc Spellpower"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "speed"
  }, "Speed: "), /*#__PURE__*/React.createElement("input", {
    mid: "npcSpeed",
    type: "number",
    name: "speed",
    placeholder: "Npc Speed"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeNpcSubmit",
    type: "submit",
    value: "Make Npc"
  }));
};

var NpcList = function NpcList(props) {
  if (props.npcs.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "npcl_ist"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyNpc"
    }, "No Npcs yet"));
  }

  var npcNodes = props.npcs.map(function (npc) {
    var personalityURL = "https://www.16personalities.com/" + npc.personality + "-personality";
    var careerURL = "https://worldofwarcraft.com/en-us/game/classes/" + npc.career;
    var raceURL = "https://wowpedia.fandom.com/wiki/" + npc.race;
    var imgURL = "/assets/img/career/" + npc.career + ".png";
    return /*#__PURE__*/React.createElement("div", {
      key: npc._id,
      className: "npc"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/npc.png ",
      alt: "npc face",
      className: "npcFace"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "npcName"
    }, " Name: ", npc.name, " "), /*#__PURE__*/React.createElement("div", {
      "class": "npcInfo"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "npcSex"
    }, " Sex: ", npc.sex, " "), /*#__PURE__*/React.createElement("a", {
      href: careerURL
    }, /*#__PURE__*/React.createElement("h3", {
      className: "npcCareer"
    }, " Career: ", npc.career, " ")), /*#__PURE__*/React.createElement("a", {
      href: raceURL
    }, /*#__PURE__*/React.createElement("h3", {
      className: "npcRace"
    }, " Race: ", npc.race, " ")), /*#__PURE__*/React.createElement("a", {
      href: personalityURL
    }, /*#__PURE__*/React.createElement("h3", {
      className: "npcPersonality"
    }, " Personality: ", npc.personality, " "))), /*#__PURE__*/React.createElement("div", {
      "class": "npcData"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "npcBlood"
    }, " Blood: ", npc.blood, " "), /*#__PURE__*/React.createElement("h3", {
      className: "npcMana"
    }, " Mana: ", npc.mana, " "), /*#__PURE__*/React.createElement("h3", {
      className: "npcStrength"
    }, " Strength: ", npc.strength, " "), /*#__PURE__*/React.createElement("h3", {
      className: "npcSpellpower"
    }, " Spellpower: ", npc.spellpower, " "), /*#__PURE__*/React.createElement("h3", {
      className: "npcSpeed"
    }, " Speed: ", npc.speed, " ")), /*#__PURE__*/React.createElement("img", {
      src: imgURL,
      alt: "",
      "class": "npcCareerImg"
    }), /*#__PURE__*/React.createElement("form", {
      id: "deleteForm",
      onSubmit: handleDelete,
      name: "deleteForm",
      action: "/deleteNpc",
      method: "DELETE",
      className: "deleteForm"
    }, /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_id",
      value: npc._id
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "delete",
      type: "submit",
      value: "Delete"
    })));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "npcList"
  }, npcNodes);
};

var loadNpcsFromServer = function loadNpcsFromServer() {
  sendAjax('GET', '/getNpcs', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(NpcList, {
      npcs: data.npcs,
      csrf: csrfT
    }), document.querySelector("#npcs"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(NpcForm, {
    csrf: csrf
  }), document.querySelector("#makeNpc"));
  ReactDOM.render( /*#__PURE__*/React.createElement(NpcList, {
    npcs: [],
    csrf: csrf
  }), document.querySelector("#npcs"));
  loadNpcsFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    csrfT = result.csrfToken;
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

/* eslint-disable comma-dangle */

/* eslint-disable linebreak-style */

/* eslint-disable indent */
var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#npcMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#npcMesasage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
