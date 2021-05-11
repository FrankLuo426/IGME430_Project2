/* eslint-disable quotes */
/* eslint-disable indent */
let csrfT;

const api = {
  key: "WEqRRNiZ_wRDx4_53JYqGcDa7XpU0c5Ayc40B4LonW4",
  base: "https://api.unsplash.com/search/photos/"
}

function searchPhotos(city) {
  let url = `${api.base}?query=${city}&client_id=${api.key}`;
  return url;
}

const handleNpc = (e) => {
    e.preventDefault();
    $("#npcMessage").animate({
        width: 'hide'
    }, 350);
    sendAjax('POST', $("#npcForm").attr("action"), $("#npcForm").serialize(), function() {
        loadNpcsFromServer();
    });
    return false;
};

const handleDelete = (e) => {
  e.preventDefault();

  sendAjax(
    "DELETE",
    $("#deleteForm").attr("action"),
    $("#deleteForm").serialize(),
    function () {
      loadNpcsFromServer();
    }
  );
  return false;
};

const handleUpdate = (e) => {
  e.preventDefault();

  $("#serverMessage").animate({width:'hide'},350);

  if($("#pass").val() == '' || $("#newPass").val() == '' || $("#newPass2").val() == '') {
      handleError("All fields are required.");
      return false;
  }

  if($("#newPass").val() !== $("#newPass2").val()) {
      handleError("Passwords do not match.");
      return false;
  }

  sendAjax('POST', $("#updateForm").attr("action"), $("#updateForm").serialize(), redirect);

  return false;
}


const NpcForm = (props) => {
    return (
       <form id="npcForm"
             onSubmit={handleNpc}
             name="npcForm"
             action="/maker"
             method="POST"
             className="npcForm"
            >
           
           <label htmlFor="name">Name: </label>
           <input id="npcName" type="text" name="name" placeholder="Npc Name"/>

           <label htmlFor="sex">Sex: </label>
           <input mid="npcSex" type="text" name="sex" placeholder="Npc Sex"/>
           
           <label htmlFor="career">Career: </label>
           <input mid="npcCareer" type="text" name="career" placeholder="Npc Career"/>
           
           <label htmlFor="race">Race: </label>
           <input mid="npcRace" type="text" name="race" placeholder="Npc Race"/>
           
           <label htmlFor="personality">Personality: </label>
           <input mid="npcPersonality" type="text" name="personality" placeholder="Npc Personality"/>
           
           <br></br>
           
           <label htmlFor="blood">blood: </label>
           <input mid="npcBlood" type="number" name="blood" placeholder="Npc Blood"/>
           
           <label htmlFor="mana">Mana: </label>
           <input mid="npcMana" type="number" name="mana" placeholder="Npc Mana"/>
           
           <label htmlFor="strength">Strength: </label>
           <input mid="npcStrength" type="number" name="strength" placeholder="Npc Strength"/>

           <label htmlFor="spellpower">Spellpower: </label>
           <input mid="npcSpellpower" type="number" name="spellpower" placeholder="Npc Spellpower"/>

           <label htmlFor="speed">Speed: </label>
           <input mid="npcSpeed" type="number" name="speed" placeholder="Npc Speed"/>

           <input type="hidden" name="_csrf" value={props.csrf} />
           <input className="makeNpcSubmit" type="submit" value="Make Npc" />
       </form>
    );
};

const NpcList = function(props) {
    if(props.npcs.length === 0) {
    return (
          <div className="npcl_ist">
            <h3 className="emptyNpc">No Npcs yet</h3>
          </div>
        );
      }
      const npcNodes = props.npcs.map(function(npc) {
        let personalityURL = "https://www.16personalities.com/" + npc.personality +"-personality";
        let careerURL = "https://worldofwarcraft.com/en-us/game/classes/" + npc.career;
        let raceURL = "https://wowpedia.fandom.com/wiki/" + npc.race;
        let imgURL = "/assets/img/career/" + npc.career +".png";
        return (
          <div key={npc._id} className="npc">
            <img src="/assets/img/npc.png " alt="npc face" className="npcFace" />
            <h3 className="npcName"> Name: {npc.name} </h3>
            <div class="npcInfo">
            <h3 className="npcSex"> Sex: {npc.sex} </h3>
            <a href={careerURL}><h3 className="npcCareer"> Career: {npc.career} </h3></a>
            <a href={raceURL}><h3 className="npcRace"> Race: {npc.race} </h3></a>
            <a href={personalityURL}><h3 className="npcPersonality"> Personality: {npc.personality} </h3></a>
            </div>
            <div class="npcData">
            <h3 className="npcBlood"> Blood: {npc.blood} </h3>
            <h3 className="npcMana"> Mana: {npc.mana} </h3>
            <h3 className="npcStrength"> Strength: {npc.strength} </h3>
            <h3 className="npcSpellpower"> Spellpower: {npc.spellpower} </h3>
            <h3 className="npcSpeed"> Speed: {npc.speed} </h3>
            </div>
            <img src={imgURL} alt="" class="npcCareerImg"></img>
            <form id="deleteForm" onSubmit={handleDelete} name="deleteForm" action="/deleteNpc" method="DELETE"
              className="deleteForm">
              <input type="hidden" name="_id" value={npc._id} />
              <input type="hidden" name="_csrf" value={props.csrf} />
              <input className="delete" type="submit" value="Delete" />
            </form>
          </div>
        );
      });
      return (
        <div className="npcList">
          {npcNodes}
        </div>
      );
    };

    
const loadNpcsFromServer =()=>{
    sendAjax('GET', '/getNpcs', null, (data) => {
      ReactDOM.render(
        <NpcList npcs={data.npcs} csrf={csrfT}/>, document.querySelector("#npcs")
      );
    });
  };

const setup = function(csrf) {
    ReactDOM.render(
        <NpcForm csrf={csrf} />, document.querySelector("#makeNpc")
    );
    ReactDOM.render(
        <NpcList npcs={[]} csrf={csrf}/>, document.querySelector("#npcs")
    );

    loadNpcsFromServer();
};

const getToken = () =>{
    sendAjax('GET', '/getToken', null, (result) => {
      csrfT = result.csrfToken;
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
  getToken();
});